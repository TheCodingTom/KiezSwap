import express from "express";
import {
  createNewChat,
  getAllChats,
  getChatById,
  getUserChats,
} from "../controller/chatsController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const chatsRouter = express.Router();

chatsRouter.get("/all", getAllChats);
chatsRouter.get("/userChats", getUserChats);
chatsRouter.get("/userChats/:listingId", getChatById);

chatsRouter.post("/newChat", jwtAuth, createNewChat);

export default chatsRouter;
