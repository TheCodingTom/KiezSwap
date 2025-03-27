// these functions control the operations that we wanna do with listings in our database

import { request } from "express";
import ListingModel from "../models/listingsModel.js";
import cloudinaryUpload from "../utilities/cloudinaryUpload.js";
import deleteTempFile from "../utilities/deleteTempFile.js";
import UserModel from "../models/usersModel.js";
import ChatsModel from "../models/chatsModel.js";

const getAllListings = async (req, res) => {
  if (!req.query.userId) {
    try {
      const allListings = await ListingModel.find().populate({
        path: "seller",
        select: ["username", "email"],
      }); // here we're requesting listings from database

      if (allListings.length === 0) {
        // try to cover as much responses as possible to build a proper UI
        res.status(400).json({
          message: "No records in the database",
        });
        return;
      }

      return res.status(200).json({
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
  } else {
    try {
      // getting all listings of a specific user
      const userListings = await ListingModel.find({
        // need to query by seller and not by userId, cause "seller" is the reference in the listing collection
        seller: req.query.userId,
      }).populate({ path: "seller", select: ["_id", "listings"] });

      if (userListings.length === 0) {
        return res.status(200).json({
          message: `No listings with user ID ${req.query.userId} in the database`,
          amount: 0,
          userListings: [],
        });
      }

      if (userListings.length > 0) {
        return res.status(200).json({
          message: `Listings from user ${req.query.userId} from our database`,
          amount: userListings.length,
          userListings,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
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

const getListingById = async (req, res) => {
  console.log("params:", req.params);

  const listingId = req.params.listingId;

  if (!listingId) {
    return res.status(400).json({
      message: `No listing with the ID ${listingId} in the database`,
    });
  }

  const listing = await ListingModel.findById(listingId).populate({
    path: "seller",
    select: ["username", "email"],
  });

  if (!listing) {
    return res.status(400).json({
      message: "Couldn't retrieve listing from the DB",
    });
  }

  if (listing) {
    return res.status(200).json({
      message: "Listing retrieved successfully",
      listing,
    });
  }
};

const addNewListing = async (req, res) => {
  // console.log("req.body>>>>", req.body);
  const { name, description, district, category } = req.body;

  if (!name || !description || !district || !category) {
    return res
      .status(400)
      .json({ error: "All fields except image are required" });
  }

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

  // creating a new document and saving it into DB - .save() is async so need to await it

  const newListingObject = new ListingModel({
    name: name,
    description: description,
    district: district,
    image: imageUrl,
    category: category,
    // the user is populated by the jwt auth middleware
    seller: req.user._id,
  });

  const newListing = await newListingObject.save();
  console.log("newListing :>> ", newListing);

  if (!newListing) {
    return res.status(400).json({
      error: "Error while adding new listing",
    });
  }

  if (newListing) {
    try {
      console.log("req.user :>> ", req.user);
      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { listings: newListing._id } },
        { new: true }
      );

      if (updatedUser) {
        return res.status(201).json({
          message: "listing added , and user updated succesfully",
          listing: {
            id: newListing._id,
            name: newListing.name,
            description: newListing.description,
            district: newListing.district,
            image: newListing.image,
            category: newListing.category,
            seller: newListing.seller,
          },
        });
      }
    } catch (error) {
      console.log("error.message :>> ", error.message);
      console.log("error saving reference to the user");
    }
  }
};

const deleteListing = async (req, res) => {
  console.log("deleting listing");

  // the user is populated by the jwt auth middleware
  const userId = req.user;
  const listingId = req.params.listingId;
  console.log(userId);

  const listing = await ListingModel.findByIdAndDelete(listingId);

  if (!listing) {
    res.status(404).json({
      message: "Listing not found",
    });
  }

  try {
    // Remove the listing reference from the user's listings array
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { listings: listingId },
    });

    await UserModel.updateMany(
      { favourites: listingId },
      { $pull: { favourites: listingId } }
    );

    // Delete all chats related to the listing
    await ChatsModel.deleteMany({ listing: listingId });
    console.log(`Chats related to listing ${listingId} deleted.`);

    return res.status(201).json({
      message: "Listing deleted",
      info: listing,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getAllListings,
  getListingsByCategory,
  getListingById,
  addNewListing,
  deleteListing,
};
