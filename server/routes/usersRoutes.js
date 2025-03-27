import express from "express";
import {
  getAllUsers,
  getProfile,
  getUserFavourites,
  imageUpload,
  login,
  registerNewUser,
  updateFavourites,
} from "../controller/usersController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const usersRouter = express.Router();

usersRouter.get("/all", getAllUsers);

// post route because we send infos
usersRouter.post("/uploadImage", multerUpload.single("image"), imageUpload); // multer works inbetween these 2 processes: receiving req via client and processesing it and sending the res

usersRouter.post("/register", registerNewUser);
usersRouter.post("/login", login);

// jwtAuth takes the token, decodes it, extracts the user ID, looks for the user in DB. if user exists -> sends info to the request

usersRouter.get("/profile", jwtAuth, getProfile); // middleware here cause to get profile user needs a token
//REVIEW check http methods to see if POST is the best one to update a source
usersRouter.post("/updateFavourites/:listingId", jwtAuth, updateFavourites);
usersRouter.get("/profile/favourites", jwtAuth, getUserFavourites);

export default usersRouter;
