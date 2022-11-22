import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { Router } from "express";

const router = Router();

router.get("/cartall", async (req, res) => {
  const cart = await Cart.findOne({ userId: "1" })
    .populate("product")
    .sort({ _id: -1 });

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
    return res.status(422).json({ message: "Produto já esta no carrinho" });
  }

  const getcart = await Cart.findOne({ userId: "1" });

  if (getcart) {
    getcart.product.push(id);
    getcart.save();

    return res.status(200).json(getcart);
  }

  const cart = await Cart.create({ product: id, userId: "1" });

  return res.status(200).json(cart);
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;

  const cart = await Cart.findOne({ userId: "1" });

  if (!cart) {
    return res.status(422).json({ message: "Carrinho não foi encontrado!" });
  }

  if (!id || id === " ") {
    return res.status(422).json({ message: "Id não foi encontrado!" });
  }

  const product = cart.product.find((e) => e._id == id);

  if (!product) {
    return res.status(422).json({ message: "Produto não foi encontrado!" });
  }

  const update = cart.product.filter((e) => e._id != id);

  cart.product = [];

  update.map((item) => {
    cart.product.push(item);
  });

  cart.save();

  return res.status(200).json(cart);
});

export default router;
