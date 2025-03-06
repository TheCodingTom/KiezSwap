import express from "express";
import {addNewListing, getAllListings, getListingsByCategory, listingImageUpload } from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";

const listingsRouter = express.Router()

listingsRouter.get("/all", getAllListings)
listingsRouter.get("/all/categories/:category", getListingsByCategory)
listingsRouter.post("/newlisting", addNewListing)
listingsRouter.post("/uploadImage", multerUpload.single("image"), listingImageUpload) 

export default listingsRouter;