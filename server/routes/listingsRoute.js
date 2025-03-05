import express from "express";
import {addNewListing, getAllListings, getListingsByCategory } from "../controller/listingsController.js";

const listingsRouter = express.Router()

listingsRouter.get("/all", getAllListings)
listingsRouter.get("/all/categories/:category", getListingsByCategory)
listingsRouter.post("/newlisting", addNewListing)

export default listingsRouter;