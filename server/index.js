import express from "express";
import colors from "colors";
import { createServer } from "node:http";
import { Server } from "socket.io";

import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config(); // this initialise the dotenv package

import usersRouter from "./routes/usersRoutes.js";
import listingsRouter from "./routes/listingsRoute.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import generator from "generate-password";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
import MessageModel from "./models/messagesModel.js";

const app = express();

const port = process.env.PORT || 4000; // until deployment the value will be 4000

const server = createServer(app);
const io = new Server(server, {
  cors: "http://localhost:5173",
  // the property makes the server "store" the information for some time - 2 min by default (can't test the feature until deployment)
  connectionStateRecovery: {},
});

// by default our client emits an event with a tag called "connection" and if our socket detects it it's gonna trigger the callback
io.on("connection", (socket) => {
  // the socket represents the individual client that is connecting/disconnecting
  console.log("socket.id :>> ", socket.id);
  console.log("a user connected");
  // Handle disconnection
  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected: ${reason}`);

    // Detect if it's a temporary disconnection
    if (reason === "transport close" || reason === "ping timeout") {
      console.log("The user might reconnect soon...");
    }
  });

  // socket.recovered is a boolean = true means connection recovered after disconnection
  if (socket.recovered) {
    console.log(
      `User ${socket.id} reconnected and recovered their session`.bgMagenta
    );
  }
  // new user or connection not recovered
  if (!socket.recovered) {
    console.log(`New user ${socket.id} connected`.bgGreen);
  }

  socket.on("chat message", async (message) => {
    // when we use socket we're communicating with one client
    // console.log("msg>>> ".bgBlue, message);
    let createdMsg;
    try {
      createdMsg = await MessageModel.create({
        text: message,
        authorId: socket.id,
        postingDate: new Date().getTime(), // ideally a field that autoIncrement itself to use it as a reference
      });
    } catch (error) {
      console.error(error.message);
      return;
    }
    // if we use io we communicate with all clients connected to the channel, so we use emit method here
    io.emit("chat message", message);
  });
});

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  app.use(morgan("dev"));
  cloudinaryConfig();

  passport.initialize();
  passport.use(passportStrategy);
};

const startServer = () => {
  // this to initiate server as a simple express application
  // app.listen(port, () => {
  //   console.log(`Server is running on ${port} port`.bgGreen);
  // });

  // this to initiate server as an http server
  server.listen(port, () => {
    console.log(`Server is running on ${port} port`.bgGreen);
  });
};

const loadRoutes = () => {
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
