import { Router } from "express";
import { Product } from "../models/Product.js";

const router = Router();

router.get("/", async (req, res) => {
  const product = await Product.find();

  return res.status(200).json(product);
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id });

  return res.status(200).json(product);
});

router.get("/search", async (req, res) => {
  const product = await Product.find();

  if (!req.query.q) {
    return res.status(200).json(product);
  }

  const filterByTitle = product.filter((e) =>
    e.title.toLowerCase().includes(req.query.q.toLowerCase())
  );

  const filterByDescription = product.filter((e) =>
    e.description.toLowerCase().includes(req.query.q.toLowerCase())
  );

  const filterByPrice = product.filter((e) => e.price === req.query.q);

  if (filterByTitle.length > 0) {
    return res.status(200).json(filterByTitle);
  }

  if (filterByDescription.length > 0) {
    return res.status(200).json(filterByDescription);
  }

  return res.status(200).json(filterByPrice);
});

// router.get("/page/:page", async (req, res) => {
//   const product = await Product.find();

//   const itensPerPage = 12;
//   const currentPage = req.params.page;

//   const page = Math.ceil(product.length / itensPerPage);
//   const startIndex = currentPage * itensPerPage;
//   const endIndex = startIndex + itensPerPage;
//   const currentItens = product.slice(startIndex, endIndex);

//   console.log(currentItens);
// });

export default router;
