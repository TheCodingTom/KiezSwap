import express from "express";
import colors from "colors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config(); // Initializes the dotenv package

import usersRouter from "./routes/usersRoutes.js";
import listingsRouter from "./routes/listingsRoute.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
import chatsRouter from "./routes/chatsRoute.js";

const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());

  cloudinaryConfig();

  passport.initialize();
  passport.use(passportStrategy);
};

const loadRoutes = () => {
  app.use("/api/listings", listingsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/chats", chatsRouter);
};

const DBConnection = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URL); // env variable to connect with MongoDB
    if (mongoDBConnection) {
      console.log("Connected with MongoDB".bgGreen);
    }
  } catch (error) {
    console.log("error connecting with MongoDB :>> ".bgRed, error);
  }
};

// local development server setup
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on ${port} port`.bgGreen);
  });
}

// export the serverless function for vercel deployment
export default async (req, res) => {
  await DBConnection();
  addMiddlewares();
  loadRoutes();
  // instead of app.listen(), vercel will automatically handle the HTTP requests for us
  app(req, res); // vercel invokes this function directly
};
