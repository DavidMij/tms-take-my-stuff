import { NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(request) {
  const { cookies } = request;
  const jwt = cookies.get("tmsToken");

  try {
    const { payload } = await jose.jwtVerify(
      jwt?.value || "",
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );
    console.log(process.env.TOKEN_SECRET)
    if (payload) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (e) {
    console.log(e)
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin-dashboard"],
};
