import { Router } from "express";
import { Product } from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  const product = await Product.find();

  return res.status(200).json(product);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id });

  return res.status(200).json(product);
});

export default router;
