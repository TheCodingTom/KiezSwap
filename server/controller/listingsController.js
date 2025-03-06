// these functions control the operations that we wanna do with listings in our database

import ListingModel from "../models/listingsModel.js";

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
  // const listingData = {
  //   name: req.body.name,
  //   description: req.body.description,
  //   price: req.body.price,
  //   location: req.body.location,
  //   category: req.body.category,
  //   likes: req.body.likes,
  //   user: req.body.user,
  // };

  const { name, description, location, category } = req.body;

  try {
    const newListingObject = new ListingModel({
      name: name,
      description: description,
      location: location,
      category: category,
    });
    const newListing = newListingObject.save();

    if (newListing) {
      return res.status(201).json({
        message: "Listing added successfully",
        listing: {
          id: newListing._id,
          name: newListing.name,
          description: newListing.description,
          location: newListing.location,
          category: newListing.category,
        },
      });
    }
  } catch (error) {
    console.log("error posting new listing :>> ", error);
    return res.status(500).json({
      error: "Error creating the listing",
    });
  }
};

// post new listing
// const postNewListing = async (request, response) => {
//   try {
//     console.log("Request User:", request.user);
//     const userId = request.user._id;

//     // upload picture in cloudinary

//     const uploadedImages = await Promise.all(
//       request.files.map(async (file) => {
//         return pictureUpload(file.path);
//       })
//     );

//     //creating variable to save the data in
//     const listingData = {
//       condition: request.body.condition,
//       images: uploadedImages,
//       delivery: request.body.delivery,
//       description: request.body.description,
//       light: request.body.light,
//       location: request.body.location,
//       price: parseInt(request.body.price),
//       soil: request.body.soil,
//       species: request.body.species,
//       water: request.body.water,
//       seller: userId,
//       deal: request.body.deal,
//       swapfor: request.body.swapfor,
//     };

//     // After listing is created, update user data
//     try {
//       const user = await UserModel.findById(request.user.id);
//       user.postedListings.push(listing._id);
//       await user.save();
//       console.log("USER :>> ", user);
//     } catch (error) {
//       console.log("Error saving reference to the user", error);
//       return response.status(500).json({
//         error: "Error updating user data",
//       });
//     }

//     // Use populate here to include full seller info in the listing response
//     const populatedListing = await ListingsModel.findById(listing._id).populate(
//       "seller",
//       "username avatar postedListings _id createdAt"
//     );

//     return response.status(201).json({
//       message: "Listing successfully created!",
//       listing: populatedListing,
//     });
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({
//       error: "Internal server error",
//     });
//   }
// };

export { getAllListings, getListingsByCategory, addNewListing };
