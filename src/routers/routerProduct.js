import { Router } from "express";
import { Product } from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  let { limit, offset } = req.query;

  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 12;
  }

  if (!offset) {
    offset = 0;
  }

  const count = await Product.countDocuments();
  const product = await Product.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit);

  const page = Math.ceil(Array(count).length / limit);

  return res.status(200).json({ currentItens: product, page });
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id });

  return res.status(200).json(product);
});

router.get("/search", async (req, res) => {
  let { limit, offset, q } = req.query;

  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 12;
  }

  if (!offset) {
    offset = 0;
  }

  if (!q) {
    q = "";
  }

  const count = await Product.countDocuments();
  const product = await Product.find({
    $or: [
      { title: { $regex: q } },
      { description: { $regex: q } },
      { price: q },
    ],
  })
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit);

  const page = Math.ceil(Array(count).length / limit);

  return res.status(200).json({ currentItens: product, page });
});

export default router;
