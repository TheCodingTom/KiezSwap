import express from "express";
import {
  addNewListing,
  deleteListing,
  getAllListings,
  getListingById,
  getListingsByCategory,
} from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const listingsRouter = express.Router();

listingsRouter.get("/all", getAllListings);
listingsRouter.get("/all/categories/:category", getListingsByCategory);
listingsRouter.get("/:listingId", getListingById);

listingsRouter.post(
  "/newlisting",
  jwtAuth,
  multerUpload.single("image"),
  addNewListing
);

listingsRouter.delete("/userListings/:listingId", jwtAuth, deleteListing);

export default listingsRouter;
