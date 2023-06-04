import dbConnect from "../../db/connection";
import { User } from "../../models";
import validator from "validator";
import * as jose from "jose";
import bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fullname, email, password } = req.body;

    try {
      await dbConnect();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message:
            "The email address that you entered is already exist in the system",
        });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email address is not valid" });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
      });

      const token = await new jose.SignJWT({
        userId: newUser.id,
        email: newUser.email,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("365d")
        .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));
      const oneYear = 60 * 60 * 24 * 365;

      res.setHeader(
        "Set-Cookie",
        `tmsToken=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${oneYear}`
      );

      const savedUser = await newUser.save();
      if (savedUser) {
        return res.status(200).send({ success: true });
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json("System error. please try again later.");
    }
  }
}
