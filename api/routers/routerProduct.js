import { Router } from "express";
import { Product } from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 12;
  const offset = parseInt(req.query.offset) || 0;

  const count = await Product.countDocuments();
  const product = await Product.find()
    .sort({ _id: -1 })
    .limit(12)
    .skip(offset * limit);

  const page = Math.ceil(Array(count).length / limit);

  return res.status(200).json({ currentItens: product, page });
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id });

  return res.status(200).json(product);
});

router.get("/search", async (req, res) => {
  const limit = Number(req.query.limit || 12);
  const offset = Number(req.query.offset || 0);
  const q = req.query.q;

  const count = await Product.countDocuments({
    $or: [
      { title: { $regex: q } },
      { description: { $regex: q } },
      { category: { $regex: q } },
      { price: q },
    ],
  });

  const product = await Product.find({
    $or: [
      { title: { $regex: q } },
      { description: { $regex: q } },
      { category: { $regex: q } },
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
