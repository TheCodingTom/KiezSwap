import express from "express";
import { getAllItems, getItemsByCategory } from "../controller/itemsController.js";

const itemsRouter = express.Router()

itemsRouter.get("/all", getAllItems)
itemsRouter.get("/all/categories/:category", getItemsByCategory)

export default itemsRouter;