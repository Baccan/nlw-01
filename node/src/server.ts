import express from "express";
import cors from "cors";
import path from "path";

import routes from "./routes";

import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json(), routes);
app.use(
  "/images",
  express.static(path.resolve(__dirname, "..", "uploads", "images"))
);
app.use(errors());

app.listen(3333);
