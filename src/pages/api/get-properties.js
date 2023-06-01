import dbConnect from "../../db/connection";
import { Property } from "../../models";

export default async function getProperties(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    const { price, location, maxPrice } = req.body;

    const filters = {};
    if (price && maxPrice) {
      filters.price = { $gte: Number(price), $lt: Number(maxPrice) };
    } else if (price) {
      filters.price = { $gte: Number(price) };
    } else if (maxPrice) {
      filters.price = { $lt: Number(maxPrice) };
    }

    if (location) {
      filters.propertyAddress = { $regex: location, $options: "i" };
    }

    try {
      const filteredProperties = await Property.find(filters);
      return res.status(200).json(filteredProperties);
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
