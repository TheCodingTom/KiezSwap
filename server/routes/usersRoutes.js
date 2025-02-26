import express from "express";
import { getAllUsers, imageUpload } from "../controller/usersController.js";
import multerUpload from "../middlewares/multer.js";


const usersRouter = express.Router()

usersRouter.get("/all", getAllUsers)

// post route because we send infos
usersRouter.post("/uploadImage",multerUpload.single("image"), imageUpload) // multer works inbetween these 2 processes: receiving req via client and processesing it and sending the res

export default usersRouter;