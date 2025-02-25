import express from "express";
import {getAllListings, getListingsByCategory } from "../controller/listingsController.js";

const listingsRouter = express.Router()

listingsRouter.get("/all", getAllListings)
listingsRouter.get("/all/categories/:category", getListingsByCategory)

export default listingsRouter;