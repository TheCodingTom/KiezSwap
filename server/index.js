import express from "express";
// var colors = require('colors');
import colors from "colors";

import cors from "cors";
import testRouter from "./routes/testRoute.js";
import * as dotenv from "dotenv";
dotenv.config(); // this initialise the dotenv package
import mongoose from "mongoose";
import itemsRouter from "./routes/itemsRoute.js";

const app = express();

const port = process.env.PORT || 4000; // until deployment the value will be 5000

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on ${port} port`.bgGreen);
});

app.use("/api", testRouter);
app.use("/api/items", itemsRouter) // we define endpoint of the itemsRouter - if after that comes a "/all", we'll trigger the getAllItems function

async function main() {

  try {

    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URI); // env variable to connect with our mongo server

  if (mongoDBConnection) {
    console.log("Connected with MongoDB".bgGreen);
  }
    
  } catch (error) {
    console.log('error connecting with MongoDB :>> '.bgRedred, error);
    
  }
  
}
main();
