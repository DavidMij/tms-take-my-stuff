import dbConnect from "../../db/connection";
import { User } from "../../models";

export default async function getUser(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const user = await User.findOne({ _id: req.query.id });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
