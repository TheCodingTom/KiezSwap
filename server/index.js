import express from "express";
import colors from "colors";

import cors from "cors";
import testRouter from "./routes/testRoute.js";
import * as dotenv from "dotenv";
dotenv.config(); // this initialise the dotenv package

import mongoose from "mongoose";
import usersRouter from "./routes/usersRoutes.js";
import listingsRouter from "./routes/listingsRoute.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import generator  from "generate-password";

const app = express();

const port = process.env.PORT || 4000; // until deployment the value will be 4000

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig()
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on ${port} port`.bgGreen);
  });
};

const loadRoutes = () => {
  app.use("/api", testRouter);
  app.use("/api/listings", listingsRouter); // we define endpoint of the listingsRouter - if after that comes a "/all", we'll trigger the getAllListings function
  app.use("/api/users", usersRouter);
};

const DBConnection = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URI); // env variable to connect with our mongo server

    if (mongoDBConnection) {
      console.log("Connected with MongoDB".bgGreen);
    }
  } catch (error) {
    console.log("error connecting with MongoDB :>> ".bgRedred, error);
  }
};

// const passcode = generator.generate({
//   length: 15,
//   numbers: true
// });

// console.log(passcode);

// IIFE (Immediately Invoked Function Expressions) - not creating a specific function for this so everytime it restarts it doesn't generate a new instance

(async function () {
  await DBConnection();
  addMiddlewares();
  loadRoutes();
  startServer();
})();
