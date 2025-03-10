// these functions control the operations that we wanna do with listings in our database

import { request } from "express";
import ListingModel from "../models/listingsModel.js";
import cloudinaryUpload from "../utilities/cloudinaryUpload.js";
import deleteTempFile from "../utilities/deleteTempFile.js";
import UserModel from "../models/usersModel.js";

const getAllListings = async (req, res) => {
  //   console.log("get all listings running");
  try {
    const allListings = await ListingModel.find().populate({
      path: "user",
      select: ["username", "email"],
    }); // here we're requesting listings from database
    console.log(allListings);

    if (allListings.length === 0) {
      // try to cover as much responses as possible to build a proper UI
      res.status(400).json({
        message: "No records in the database",
      });
      return;
    }

    res.status(200).json({
      message: "All records from our database",
      amount: allListings.length,
      allListings,
    }); // sending the response as a json
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "Something went wrong trying to send the response",
    });
  }
};

const getListingsByCategory = async (req, res) => {
  console.log("params:", req.params);
  console.log("query:", req.query);

  const category = req.params.category;
  // const {category} = req.params

  if (req.query.likes) {
    console.log("req with likes incoming");

    const listingsByCategoryAndLikes = await ListingModel.find({
      category: req.params.category,
      likes: { $gte: req.query.likes },
    });

    if (listingsByCategoryAndLikes.length === 0) {
      res.status(400).json({
        message: `No listings in the ${req.params.category} category and/or ${req.query.likes} likes in the database`,
        amount: listingsByCategoryAndLikes.length,
        listingsByCategoryAndLikes,
      });
      return; // always add a return to avoid sending 2 responses (not possible)
    }

    res.status(200).json({
      message: `Listings from ${req.params.category} category with at least ${req.query.likes} likes from our database`,
      amount: listingsByCategoryAndLikes.length,
      listingsByCategoryAndLikes,
    });

    return;
  }

  if (!req.query.likes) {
    try {
      const listingsByCategory = await ListingModel.find({
        category: req.params.category,
      });

      if (listingsByCategory.length === 0) {
        // try to cover as much responses as possible to build a proper UI
        res.status(400).json({
          message: `No listings in the ${req.params.category} category in the database`,
          amount: listingsByCategory.length,
          listingsByCategory,
        });
        return; // always add a return to avoid sending 2 responses (not possible)
      }

      res.status(200).json({
        message: `All listings in the ${req.params.category} category from our database`,
        amount: listingsByCategory.length,
        listingsByCategory,
      });
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        error: "Something went wrong trying to send the response",
      });
    }
  }
};

const addNewListing = async (req, res) => {
  // This is to ensure that data from form fields is available

  console.log(req.body);
  const { name, description, city, district, user } = req.body;

  if (!name || !description || !district || !user) {
    return res.status(400).json({ error: "All fields except image are required" });
  }

  try {
   

    let imageUrl = null;
    // The image is not in req.body but in req.file
    if (req.file) {
      // Upload image to Cloudinary

      const uploadedImage = await cloudinaryUpload(req.file); 

      if (!uploadedImage) {
        deleteTempFile(req.file);
        return res.status(400).json({
          error: "Image couldn't be uploaded",
        });
      }
      if (uploadedImage) {
         // no return here otherwise the function stops working and the data won't reach MongoDB
        deleteTempFile(req.file);
        imageUrl = uploadedImage.secure_url;
      }
    }

    const newListingObject = new ListingModel({
      name: name,
      description: description,
      city: city,
      district: district,
      image: imageUrl,
      // category: category,
      user: user
    });

    // .save() is async so need to await it
    const newListing = await newListingObject.save();

    if (!newListing) {
      return res.status(400).json({
        error: "Error while adding new listing",
      });
    }

    if (newListing) {
      return res.status(201).json({
        message: "Listing added successfully",
        listing: {
          id: newListing._id,
          name: newListing.name,
          description: newListing.description,
          city: newListing.city,
          district: newListing.district,
          image: newListing.image,
          user: newListing.user,
          // category: newListing.category,
        },
      });
    }

      // Update user data once the listing has been created
      
     


  } catch (error) {
    console.log("error posting new listing :>> ", error);
    return res.status(500).json({
      error: "Error creating the listing",
    });
  }

};

export { getAllListings, getListingsByCategory, addNewListing };
