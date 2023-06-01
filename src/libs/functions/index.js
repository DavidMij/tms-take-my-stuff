import { parse } from "cookie";
import * as jose from "jose";

export const extractUserIdFromCookies = async (cookie) => {
  const { tmsToken } = parse(cookie || "");
  const { payload } = await jose.jwtVerify(
    tmsToken,
    new TextEncoder().encode(process.env.TOKEN_SECRET)
  );

  return payload.userId;
};
