import mongoose, { Schema } from "mongoose";

export const Cart = mongoose.model(
  "Cart",
  new Schema(
    {
      product: [{ type: Schema.Types.ObjectId, ref: "products" }],
    },
    {
      timestamps: true,
    }
  )
);
