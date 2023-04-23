import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

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
    if (Date.now() <= payload.exp * 1000) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.next();
  }
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    return await loginMiddleware(request);
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
};
