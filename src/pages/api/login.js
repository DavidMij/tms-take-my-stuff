import dbConnect from "../../db/connection";
import { User } from "../../models";
import bcrypt from "bcrypt";
import validator from "validator";
import * as jose from "jose";

export default async function loginUser(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    try {
      const { email, password } = req.body;

      if (!validator.isEmail(req.body.email)) {
        return res.status(400).json("Email address is not valid.");
      }
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "email or password are not valid. please try again.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Email address or password are not valid" });
      }

      const token = await new jose.SignJWT({
        userId: user.id,
        email: user.email,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("365d")
        .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));
      const oneYear = 60 * 60 * 24 * 365;
      console.log(token)
      res.setHeader(
        "Set-Cookie",
        `tmsToken=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${oneYear}`
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error has occurred please try again later." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
