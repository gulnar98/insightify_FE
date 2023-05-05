import jwt from "jsonwebtoken";
import { recoverPersonalSignature, normalize } from "eth-sig-util";
import { setCookies } from "./utils/cookie.utils";
import { getDatabase } from "../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret_here";
const BLACKLIST_TOKENS_COLLECTION =
  process.env.BLACKLIST_TOKENS_COLLECTION || "blacklist_tokens";
const REFRESH_TOKENS_COLLECTION =
  process.env.REFRESH_TOKENS_COLLECTION || "refresh_tokens";
const USERS_COLLECTION = process.env.USERS_COLLECTION || "users";
const USERS_APPS_COLLECTION = process.env.USERS_APPS_COLLECTION || "users_apps";
const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME
  ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION_TIME)
  : 3600;

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      if (req.body.action === "login") {
        await handleLogin(req, res);
      } else if (req.body.action === "refresh") {
        await handleRefreshToken(req, res);
      } else if (req.body.action === "logout") {
        await handleLogOut(req, res);
      } else if (req.body.action === "signup") {
        await handleSignup(req, res);
      } else {
        res.status(400).end();
      }
      break;
    case "GET":
      if (req.query.action === "verify_token") {
        await handleVerifyToken(req, res);
      } else {
        res.status(400).end();
      }
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleLogin(req, res) {
  const db = getDatabase();
  const { address, sign } = req.body;
  let isNewUser = false;

  if (!checkSignature(sign, address)) {
    return res.status(401).json({
      message: "Invalid signature",
    });
  }

  const user = (await db.collection(USERS_COLLECTION).findOne({ address })) || {
    _id: null,
  };
  if (!user._id) {
    const result = await db.collection(USERS_COLLECTION).insertOne({
      address,
    });

    user._id = result.insertedId;
    isNewUser = true;
  }
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   res.status(401).json({ message: "Invalid email or password." });
  //   return;
  // }
  const accessToken = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ _id: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: Math.round(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION_TIME,
  });
  await db
    .collection(REFRESH_TOKENS_COLLECTION)
    .insertOne({ token: refreshToken });

  // Set access & refresh tokens as cookie
  setCookies(res, [
    {
      name: "accessToken",
      value: accessToken,
      Secure: process.env.NODE_ENV === "production",
      HttpOnly: true,
    },
    {
      name: "refreshToken",
      value: refreshToken,
      Secure: process.env.NODE_ENV === "production",
      HttpOnly: true,
    },
  ]);

  res.status(200).json({
    accessToken,
    refreshToken,
    isNewUser,
  });
}

const handleLogOut = async (req, res) => {
  setCookies(res, [
    {
      name: "accessToken",
      value: "",
      MaxAge: -1000000,
      HttpOnly: true,
      Secure: process.env.NODE_ENV === "production",
    },
    {
      name: "refreshToken",
      value: "",
      MaxAge: -1000000,
      HttpOnly: true,
      Secure: process.env.NODE_ENV === "production",
    },
  ]);

  res.status(200).json({});
};

const handleSignup = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const { _id } = jwt.verify(accessToken, JWT_SECRET);

    const { dao_name, role, url } = req.body;

    const db = getDatabase();
    db.collection(USERS_APPS_COLLECTION).updateOne(
      {
        user_id: _id,
      },
      {
        $set: {
          dao_name,
          role,
          url
        },
      },
      {
        upsert: true,
      }
    );

    res.json({ message: "Token is valid" });
  } catch (error) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};

const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  // Check if the refresh token has been blacklisted
  const isBlacklisted = await checkRefreshTokenBlacklist(refreshToken);
  if (isBlacklisted) {
    return res.status(401).json({ message: "Refresh token is invalid" });
  }

  try {
    // Verify the refresh token and extract the payload
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // Check if the refresh token is expired
    if (Date.now() >= decoded.exp * 1000) {
      await addRefreshTokenToBlacklist(refreshToken);
      return res.status(401).json({ message: "Refresh token has expired" });
    }

    // Retrieve the user's details from the refresh token payload
    const { _id } = decoded;

    // Generate a new access token
    const accessToken = generateAccessToken(_id);

    // Send the new access token in the response
    setCookies(res, {
      name: "accessToken",
      value: accessToken,
      Secure: process.env.NODE_ENV === "production",
      HttpOnly: true,
    });

    const db = getDatabase();

    const isNewUser = (await db
      .collection(USERS_APPS_COLLECTION)
      .findOne({ user_id: _id }))
      ? false
      : true;

    res.status(200).json({
      accessToken,
      refreshToken,
      isNewUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

function checkSignature(sig, walletAddress) {
  const publicKey = recoverPersonalSignature({
    sig,
    data: process.env.NEXT_PUBLIC_WEB3_SIGN_MESSAGE,
  });

  return publicKey.toLowerCase() === walletAddress.toLowerCase();
}

// handle token verification request
async function handleVerifyToken(req, res) {
  try {
    const { accessToken } = req.cookies;
    jwt.verify(accessToken, JWT_SECRET);

    res.json({ message: "Token is valid" });
  } catch (error) {
    setCookies(res, [
      {
        name: "accessToken",
        value: "",
        MaxAge: -1000000,
        HttpOnly: true,
        Secure: process.env.NODE_ENV === "production",
      },
      {
        name: "refreshToken",
        value: "",
        MaxAge: -1000000,
        HttpOnly: true,
        Secure: process.env.NODE_ENV === "production",
      },
    ]);

    res.status(401).json({ message: "Token is invalid or expired" });
  }
}

// check if refresh token is blacklisted
async function checkRefreshTokenBlacklist(refreshToken) {
  const db = getDatabase();
  const collection = db.collection(BLACKLIST_TOKENS_COLLECTION);
  const result = await collection.findOne({ token: refreshToken });
  return result !== null;
}

// add refresh token to blacklist
async function addRefreshTokenToBlacklist(refreshToken) {
  const db = getDatabase();
  const collection = db.collection(BLACKLIST_TOKENS_COLLECTION);
  const result = await collection.insertOne({ token: refreshToken });
}

// generate access token
function generateAccessToken(_id) {
  const accessToken = jwt.sign({ _id }, JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME || "15m",
  });
  return accessToken;
}
