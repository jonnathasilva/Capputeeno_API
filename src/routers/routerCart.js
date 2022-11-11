import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { Router } from "express";

const router = Router();

router.get("/cartall", async (req, res) => {
  const cart = await Cart.find().populate("product").sort({ _id: -1 });

  return res.status(200).json(cart);
});

router.post("/new", async (req, res) => {
  const { id } = req.body;

  if (!id || id === " ") {
    return res.status(422).json({ message: "ID não foi encontrado" });
  }

  const existProduct = await Product.findOne({ _id: id });

  if (!existProduct) {
    return res
      .status(422)
      .json({ message: "Produto não foi encontrado no nosso banco de dados" });
  }

  const existProductByCart = await Cart.findOne({ product: id });

  if (existProductByCart) {
    return res
      .status(422)
      .json({ message: "Produto já esta no nosso banco de dados" });
  }

  const cart = await Cart.create({ product: id });

  return res.status(200).json(cart);
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;

  console.log(req.body);

  const cart = await Cart.findOne({ product: id });

  if (!cart) {
    return res
      .status(422)
      .json({ message: "Produto não foi encontrado no nosso banco de dados" });
  }

  const deleteCart = await Cart.findByIdAndRemove(cart._id);

  return res.status(200).json(deleteCart);
});

export default router;
