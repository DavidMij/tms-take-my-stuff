import dbConnect from "../../db/connection";
import { Property } from "../../models";

export default async function getProperties(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    const { price, location, maxPrice,startDate, endDate, category, space, maxSpace } = req.body;

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

    if (startDate && endDate){
      filters.startDate = { $gte: new Date(startDate), $lt: new Date(endDate) };
    }else if (startDate && !endDate){
      filters.startDate = { $gte: new Date(startDate)}
    }else if (!startDate && endDate){
      filters.endDate = { $lte: new Date(endDate) }
    }

    if (category){
      filters.category = { $regex: category, $options: "i" }
    }

    if (space && maxSpace) {
      filters.space = { $gte: Number(space), $lt: Number(maxSpace) };
    } else if (space) {
      filters.space = { $gte: Number(space) };
    } else if (maxSpace) {
      filters.space = { $lt: Number(maxSpace) };
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
