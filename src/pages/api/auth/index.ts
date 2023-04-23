import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {ObjectId} from 'mongodb';
import { recoverPersonalSignature, normalize } from 'eth-sig-util';
import { setCookies } from "./utils/cookie.utils";
import { getDatabase } from "../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret_here";
const BLACKLIST_TOKENS_COLLECTION = process.env.BLACKLIST_TOKENS_COLLECTION || "blacklist_tokens";
const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION_TIME) : 3600;

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      if (req.body.action === "signup") {
        await handleSignup(req, res);
      } else if (req.body.action === "login") {
        await handleLogin(req, res);
      } else if (req.body.action === "refresh") {
        await handleRefreshToken(req, res);
      } else if (req.body.action === "forgot_password") {
        await handleForgotPassword(req, res);
      } else if (req.body.action === "reset_password") {
        await handleResetPassword(req, res);
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

async function handleSignup(req, res) {
  const db = getDatabase();
  const { address, sign, message } = req.body;
  const existingUser = await db.collection("users").findOne({ address });
  if (existingUser) {
    res.status(400).json({ message: "address is already taken." });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await db.collection("users").insertOne({
    address
  });
  const user = { _id: result.insertedId };
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {expiresIn: Math.round(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION_TIME});
  await db.collection("refresh_tokens").insertOne({ token: refreshToken });

  // Set access & refresh tokens as cookie
  setCookies(res, [
    {
      name: 'accessToken',
      value: accessToken,
      Secure: process.env.NODE_ENV === 'production',
      HttpOnly: true
    },
    {
      name: 'refreshToken',
      value: refreshToken,
      Secure: process.env.NODE_ENV === 'production',
      HttpOnly: true
    }
  ]);

  res.status(201).json({ accessToken, refreshToken });
}

async function handleLogin(req, res) {
  const db = getDatabase();
  const { address, sign } = req.body;

  if (!checkSignature(sign, address)) {
    return res.status(401).json({
      message: 'Invalid signature'
    });
  }

  const user = await db.collection("users").findOne({ address }) || {_id: null};
  if (!user._id) {
    const result = await db.collection('users').insertOne({
      address
    });

    user._id = result.insertedId;
  }
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) {
  //   res.status(401).json({ message: "Invalid email or password." });
  //   return;
  // }
  const accessToken = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ _id: user._id }, REFRESH_TOKEN_SECRET, {expiresIn: Math.round(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION_TIME});
  await db.collection("refresh_tokens").insertOne({ token: refreshToken });

  // Set access & refresh tokens as cookie
  setCookies(res, [
    {
      name: 'accessToken',
      value: accessToken,
      Secure: process.env.NODE_ENV === 'production',
      HttpOnly: true
    },
    {
      name: 'refreshToken',
      value: refreshToken,
      Secure: process.env.NODE_ENV === 'production',
      HttpOnly: true
    }
  ]);

  res.status(200).json({ accessToken, refreshToken });
}

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
      name: 'accessToken',
      value: accessToken,
      Secure: process.env.NODE_ENV === 'production',
      HttpOnly: true
    });

    // Return a success response
    res.status(200).json({ message: "Access token has been refreshed" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
}

async function updateUserPassword (_id, password) {
  const db = getDatabase();
  const collection = db.collection('users');
  const hashedPassword = await bcrypt.hash(password, 12);
  await collection.updateOne({
    _id: new ObjectId(_id)
  }, {
    $set: {
      password: hashedPassword
    }
  }, {
    upsert: true
  });
}

async function getUserById(_id) {
  const db = getDatabase();
  const collection = db.collection('users');
  const user = await collection.findOne({ _id: new ObjectId(_id) });
  return user;
}

async function getUserByWalletAddress(address) {
  const db = getDatabase();
  const collection = db.collection('users');
  const user = await collection.findOne({ address });
  return user;
}

function checkSignature (sig, walletAddress) {
  const publicKey = recoverPersonalSignature({
    sig,
    data: process.env.NEXT_PUBLIC_WEB3_SIGN_MESSAGE
  });

  return publicKey.toLowerCase() === walletAddress.toLowerCase();
}

// handle forgot password request
async function handleForgotPassword(req, res) {
  try {
    const { address } = req.body;
    const user = await getUserByWalletAddress(address);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate password reset token
    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // send password reset link to user's wallet address
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
    // send email using nodemailer or any other email service
    console.log(`Password reset link: ${resetLink}`);

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function handleResetPassword(req, res) {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update the user's password in the database
    await updateUserPassword(user._id, password);

    // send email confirmation to the user
    // ...

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// handle token verification request
async function handleVerifyToken(req, res) {
  try {
    const { token } = req.body;

    jwt.verify(token, process.env.JWT_SECRET);

    res.json({ message: "Token is valid" });
  } catch (error) {
    console.log(error);
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
    expiresIn: "15m",
  });
  return accessToken;
}


