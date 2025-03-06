import express from "express";
import {addNewListing, getAllListings, getListingsByCategory } from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";

const listingsRouter = express.Router()

listingsRouter.get("/all", getAllListings)
listingsRouter.get("/all/categories/:category", getListingsByCategory)
listingsRouter.post("/newlisting",multerUpload.single("image"), addNewListing)
// listingsRouter.post("/uploadImage", multerUpload.single("image"), listingImageUpload) 

// listingsRouter.post("/newlisting",multerUpload.single("image"), async (req,res) => {
//     console.log('req.file :>> ', req.file);
//     console.log('req.body :>> ', req.body);
// })

export default listingsRouter;