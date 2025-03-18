import express from "express";
import {
  createNewMessage,
  getAllChats,
  getChatById,
  getUserChats,
  sendMessage,
} from "../controller/chatsController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const chatsRouter = express.Router();

chatsRouter.get("/all", getAllChats);
chatsRouter.get("/userChats", getUserChats);
chatsRouter.get("/userChats/:chatId", getChatById);

chatsRouter.post("/newChat", jwtAuth, createNewMessage);
chatsRouter.post("/userChats/send/:chatId", jwtAuth, sendMessage);

export default chatsRouter;
