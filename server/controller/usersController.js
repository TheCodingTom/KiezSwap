import { request } from "express";
import UserModel from "../models/usersModel.js";
import cloudinaryUpload from "../utilities/cloudinaryUpload.js";
import { hashPassword, verifyPassword } from "../utilities/passwordServices.js";
import deleteTempFile from "../utilities/deleteTempFile.js";
import { generateToken } from "../utilities/tokenServices.js";

const getAllUsers = async (req, res) => {
  //   console.log("all users working");
  try {
    const allUsers = await UserModel.find().populate({
      path: "listing",
      select: ["name", "category", "district"],
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
    return res.status(500).json({
      error: "Something went wrong trying to send the response",
    });
  }
};

const imageUpload = async (req, res) => {
  console.log("req.file :>> ", req.file);

  if (!req.file) {
    return res.status(500).json({ error: "file not supported" });
  }

  if (req.file) {
    // check file size here or do it in multer.js with fileSize
    // if we have a req.file we upload it to Cloudinary

    const uploadedImage = await cloudinaryUpload(req.file);

    if (!uploadedImage) {
      deleteTempFile(req.file);
      return res.status(400).json({
        error: "Image couldn't be uploaded",
      });
    }
    if (uploadedImage) {
      deleteTempFile(req.file);

      const userToUpdate = await UserModel.findByIdAndUpdate({_id:req.body.userId}, {image:uploadedImage.secure_url},{new:true})
      return res.status(200).json({
        message: "Image uploaded successfully",
        imageURL: uploadedImage.secure_url,
      });
    }

    console.log("image uploaded", uploadedImage);
  }
};

const registerNewUser = async (req, res) => {
  const { username, password, email, image } = req.body; // we send this data in the empty req.body

  // I can do input validation here, or in model.js using mongoose

  // check if user exists in database

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    if (!existingUser) {
      // hash the password
      const hashedPassword = await hashPassword(password);

      if (!hashedPassword) {
        return res.status(500).json({
          error: "Something went wrong while hashing password",
        });
      }

      if (hashedPassword) {
        const newUserObject = new UserModel({
          username: username,
          email: email,
          password: hashedPassword,
          image: image
            ? image
            : "https://cdn-icons-png.flaticon.com/512/4123/4123763.png",
        });

        const newUser = await newUserObject.save();

        if (newUser) {
          return res.status(201).json({
            message: "User registered successfully",
            user: {
              id: newUser._id,
              username: newUser.username,
              email: newUser.email,
              image: newUser.image,
            },
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during the registration",
      errorStack: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. find user in DB

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(401).json({
        message:
          "Email doesn't exist in our database, you have to register first",
      });
    }

    if (existingUser) {
      // 2. verify the password

      const isPasswordCorrect = await verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      if (isPasswordCorrect) {
        // 3. generate token
        const token = generateToken(existingUser._id);
        if (!token) {
          return res.status(500).json({
            error: "Something went wrong, try again later",
          });
        }

        if (token) {
          return res.status(200).json({
            message: "Login successful",
            user: {
              username: existingUser.username,
              email: existingUser.email,
              id: existingUser._id,
              image: existingUser.image, // double check this
              // listings: existingUser.listings
            },
            token,
          });
        }
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      error: "Something went wrong during login",
      errorMessage: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  console.log("req.user>>>>>>",req.user);

  if (!req.user) {
    return res.status(404).json({
      error: "User needs to login again",
    });
  }
  if (req.user) {
    return res.status(200).json({
      message: "User profile",
      // id: userProfile._id,
      // username: userProfile.username,
      // email: userProfile.email,
      // image: userProfile.image,
      // listings: userProfile.listings,
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      image: req.user.image,
      listings: req.user.listings,
    });
  }
  // try {
  //   const userProfile = await UserModel.findOne({
  //     email: req.user.email,
  //   }).populate({
  //     path: "listings",
  //     select: ["name", "district"],
  //   });
  //   console.log(userProfile);

  //   if (!userProfile) {
  //     return res.status(404).json({
  //       error: "User needs to login again",
  //     });
  //   }

  //   if (userProfile) {
  //     return res.status(200).json({
  //       message: "User profile",
  //       id: userProfile._id,
  //       username: userProfile.username,
  //       email: userProfile.email,
  //       image: userProfile.image,
  //       listings: userProfile.listings,
  //     });
  //   }
  // } catch (error) {
  //   console.log("error :>> ", error);
  //   res.status(500).json({
  //     error: "Something went wrong trying to send the response",
  //   });
  // }
};

export { getAllUsers, imageUpload, registerNewUser, login, getProfile };
