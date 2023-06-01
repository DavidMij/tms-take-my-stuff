import dbConnect from "../../db/connection";
import { Rental } from "../../models";
import { extractUserIdFromCookies } from "../../libs/functions";

export default async function getCustomerRentals(req, res) {
  const { method } = req;
  await dbConnect();
  const userId = await extractUserIdFromCookies(req.headers.cookie);

  if (method === "GET") {
    try {
      const customerRentals = await Rental.find({ userId });

      return res.status(200).json({ customerRentals });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
