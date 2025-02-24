import express from "express";
import { getAllUsers } from "../controller/usersController.js";


const usersRouter = express.Router()

usersRouter.get("/all", getAllUsers)

export default usersRouter;