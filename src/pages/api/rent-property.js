import dbConnect from "../../db/connection";
import { Property, Rental } from "../../models";
import { extractUserIdFromCookies } from "../../libs/functions";

export default async function rentProperty(req, res) {
  const { method } = req;
  const { _id, propertyOwner, propertyName } = req.body;
  await dbConnect();
  const userId = await extractUserIdFromCookies(req.headers.cookie);

  if (method === "POST") {
    try {
      const newRental = new Rental({
        propertyId: _id,
        propertyOwner,
        userId,
        propertyName,
      });

      const savedRental = await newRental.save();
      const updatedProperty = await Property.findOneAndUpdate(
        { _id },
        { isRented: true }
      );

      if (updatedProperty && savedRental) {
        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ success: false });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
