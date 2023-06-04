import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true,
        trim: true,
    },
    propertyAddress: {
        type: String,
        required: true,
        trim: true,
    },
    isRented: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: true,
    },
    propertyDescription: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: String,
        default: new Date(),
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    image: {
        type: String,
        required: true,
    }
});

const Property =
    mongoose.models.Property || mongoose.model("Property", propertySchema);

export {Property};
