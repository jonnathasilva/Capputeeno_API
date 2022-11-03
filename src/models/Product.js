import mongoose, { Schema } from "mongoose";

export const Product = mongoose.model(
  "products",
  new Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
  })
);
