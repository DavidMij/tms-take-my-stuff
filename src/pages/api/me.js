import * as jose from "jose";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { cookies } = req;

      if (cookies.tmsToken) {
        const isVerified = await jose.jwtVerify(
          cookies.tmsToken,
          new TextEncoder().encode(process.env.TOKEN_SECRET)
        );

        return res.status(200).json({ success: !!isVerified });
      }

      return res.status(400).json({ success: false, message: `no authenticated user` });
    } catch (error) {
      return res.status(400).json({ success: false, message: error});
    }
  }
}
