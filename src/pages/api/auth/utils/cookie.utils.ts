import { Cookie } from "../interfaces/cookie.interface";

export function setCookies(res, cookies: Cookie | Cookie[]): void {
  const cookieBody: String[] = [];

  if (Array.isArray(cookies)) {
    cookies.forEach((cookie) => {
      const body = `${cookie.name}=${cookie.value}; Path=/; ${
        cookie.HttpOnly ? "HttpOnly;" : ""
      } ${cookie.Secure ? "Secure;" : ""}`;
      cookieBody.push(body);
    });
  } else {
    const body = `${cookies.name}=${cookies.value}; Path=/; ${
      cookies.HttpOnly ? "HttpOnly;" : ""
    } ${cookies.Secure ? "Secure;" : ""}`;
    cookieBody.push(body);
  }

  res.setHeader("Set-Cookie", cookieBody);
}
