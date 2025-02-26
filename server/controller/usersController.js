import { request } from "express";
import UserModel from "../models/usersModel.js";
import cloudinaryUpload from "../utilities/cloudinaryUpload.js";

const getAllUsers = async (req, res) => {
  //   console.log("all users working");
  try {
    const allUsers = await UserModel.find().populate({
      path: "listings",
      select: ["name", "location", "likes"],
    });
    console.log(allUsers);
    if (allUsers.length === 0) {
      // try to cover as much responses as possible to build a proper UI
      res.status(400).json({
        message: "No records in the database",
      });
      return;
    }

    res.status(200).json({
      message: "All users from our database", // consistency is key: if there's a field called message always include it
      amount: allUsers.length,
      allUsers,
    }); // sending the response as a json
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "Something went wrong trying to send the response",
    });
  }
};

const imageUpload = async (req, res) => {
  console.log("image upload working");
  console.log("req.file :>> ", req.file);

  if (!req.file) {
    return res.status(500).json({ error: "file not supported" });
  }

  if (req.file) {
    // check file size here or do it in multer.js with fileSize
    // if we have a req.file we upload it to Cloudinary

    const uploadedImage = await cloudinaryUpload(req.file);

    if (!uploadedImage) {
      return res.status(400).json({
        error:"Image couldn't be uploaded"
      })
    }
    if (uploadedImage) {
      return res.status(200).json({
        message: "Image uploaded successfully",
        imageURL: uploadedImage.secure_url,
      });
    }
    console.log("image uploaded", uploadedImage);
  }
};

export { getAllUsers, imageUpload };
