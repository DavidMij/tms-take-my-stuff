import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
  propertyOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Rental = mongoose.models.Rental || mongoose.model("Rental", rentalSchema);

export { Rental };
