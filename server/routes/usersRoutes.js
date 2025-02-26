import express from "express";
import { getAllUsers, imageUpload } from "../controller/usersController.js";


const usersRouter = express.Router()

usersRouter.get("/all", getAllUsers)

// post route because we send infos
usersRouter.post("/uploadImage", imageUpload)

export default usersRouter;