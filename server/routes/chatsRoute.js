import express from "express";
import { getAllChats } from "../controller/chatsController.js";

const chatsRouter = express.Router();

chatsRouter.get("/all", getAllChats);

export default chatsRouter;
