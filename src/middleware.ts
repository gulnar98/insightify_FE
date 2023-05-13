import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { NextApiRequest } from "next";

async function loginMiddleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");

  if (!accessToken?.value) {
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(
      accessToken.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (Date.now() > payload.exp * 1000) {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.next();
  }
}

async function recordMiddleware(request: NextRequest) {

  try {
    const accessToken = request.cookies.get("accessToken");
    const { payload } = await jwtVerify(accessToken.value, new TextEncoder().encode(process.env.JWT_SECRET));
    if (!payload) {
      throw 'Token is invalid';
    } else {
      return NextResponse.next();
    }
  } catch (error) {
    return new Response(JSON.stringify({}), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    return await loginMiddleware(request);
  } else if (request.nextUrl.pathname.startsWith("/api/record/play")) {
    return await recordMiddleware(request);
  } else if (request.nextUrl.pathname.startsWith("/api/record/heatmap")) {
    return await recordMiddleware(request);
  }

  const accessToken = request.cookies.get("accessToken");

  if (!accessToken?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      accessToken.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (Date.now() >= payload.exp * 1000) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/record/play",
    "/api/record/heatmap",
    "/((?!api|_next/static|_next/image|favicon.ico|record|test).*)"
  ]
};
