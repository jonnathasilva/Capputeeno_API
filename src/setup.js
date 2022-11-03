import express from "express";
import cors from "cors";

import db from "./db.js";
import Product from "./routers/routerProduct.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(Product);
