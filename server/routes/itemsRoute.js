import express from "express";
import { getAllItems } from "../controller/itemsController.js";

const itemsRouter = express.Router()

itemsRouter.get("/all", getAllItems)

export default itemsRouter;