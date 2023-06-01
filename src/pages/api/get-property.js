import dbConnect from "../../db/connection";
import { Property } from "../../models";

export default async function getAllProperties(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const property = await Property.findOne({ _id: req.query.id });
      return res.status(200).json({ property });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
