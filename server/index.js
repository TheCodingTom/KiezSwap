import express from "express";
import colors from "colors";
// import { createServer } from "node:http";
// import { Server } from "socket.io";
import cors from "cors";
// import morgan from "morgan";
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
  console.log("adding middlewares::::");
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  // Using CORS options to secure the origin of the requests
  const allowedOrigins = [
    "http://localhost:5173",
    "https://kiezswapclient.vercel.app",
    "http://kiezswapclient.vercel.app",
  ];
  const corsOptions = {
    origin: function (origin, callback) {
      //! origin will allow to accept direct calls to the api , with no heading, e.g. http://localhost:5001/api/cities/all
      // origin will allow requests with no header (origin===undefined), the direct ones (using directly the server url). This solution will now accept only request from those 2 origins, or with no header.
      //Accepting requests with no header might pose a security threat ...research how convinient the solution is.
      console.log("origin :>> ", origin);
      if (allowedOrigins.indexOf(origin) !== -1) {
        // if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  // app.use(cors(corsOptions));

  cloudinaryConfig();

  passport.initialize();
  passport.use(passportStrategy);
};

const loadRoutes = () => {
  console.log("loading routes:::");
  app.use("/api/listings", listingsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/chats", chatsRouter);
};

const DBConnection = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URL); // env variable to connect with MongoDB
    if (mongoDBConnection) {
      console.log(
        "moongDBConnection :>> ",
        mongoDBConnection.connections.length
      );
      console.log("Connected with MongoDB".bgGreen);
    }
  } catch (error) {
    console.log("error connecting with MongoDB :>> ".bgRed, error);
  }
};

// local development server setup
const startServer = () => {
  console.log("starting server function run:::");
  if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on ${port} port`.bgGreen);
    });
  }
};

// export the serverless function for vercel deployment
export default async function controller(req, res) {
  await DBConnection();
  addMiddlewares();
  loadRoutes();
  // instead of app.listen(), vercel will automatically handle the HTTP requests for us
  startServer();
  // app(req, res); // vercel invokes this function directly
}
controller();
// (async function () {
//   addMiddlewares();
//   loadRoutes();
//   startServer();
//   await DBConnection();
//   // instead of app.listen(), vercel will automatically handle the HTTP requests for us
//   // app(req, res); // vercel invokes this function directly
// })();
// await DBConnection();
// addMiddlewares();
// loadRoutes();
// startServer();
