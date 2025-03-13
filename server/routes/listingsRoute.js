import express from "express";
import {
  addNewListing,
  getAllListings,
  getListingById,
  getListingsByCategory,
  getThem,
} from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const listingsRouter = express.Router();

listingsRouter.get("/all", getAllListings);
listingsRouter.get("/all/categories/:category", getListingsByCategory);
listingsRouter.get("/:listingId", getListingById);
listingsRouter.get("/listings/:userId", getThem);
listingsRouter.post(
  "/newlisting",
  jwtAuth,
  multerUpload.single("image"),
  addNewListing
);

export default listingsRouter;
