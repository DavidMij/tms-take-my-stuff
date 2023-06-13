import dbConnect from "../../db/connection";
import {Property} from "../../models";
import {extractUserIdFromCookies} from "../../libs/functions";

export default async function addNewProperty(req, res) {
    const {method} = req;
    await dbConnect();

    if (method === "POST") {
        try {
            const {propertyName, propertyAddress, propertyDescription, price, image, startDate, endDate, category, space} =
                req.body;
            const userId = await extractUserIdFromCookies(req.headers.cookie);

            const newProperty = new Property({
                propertyName,
                propertyAddress,
                propertyDescription,
                price,
                userId,
                startDate,
                endDate,
                image,
                category,
                space
            });

            const savedProperty = await newProperty.save();
            if (savedProperty) {
                return res.status(200).json({success: true});
            }

            return res.status(400).json({success: false});
        } catch (error) {
            return res.status(400).json({success: false});
        }
    } else {
        return res.status(405).json({message: "Method not allowed"});
    }
}
