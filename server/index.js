import express from "express";
// var colors = require('colors');
import colors from "colors";

import cors from "cors";
import testRouter from "./routes/testRoute.js";
import * as dotenv from "dotenv";
dotenv.config(); // this initialise the dotenv package
import mongoose from "mongoose";

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

async function main() {

  try {

    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URI); // env variable to connect with our mongo server

  if (mongoDBConnection) {
    console.log("Connected with MongoDB".green);
  }
    
  } catch (error) {
    console.log('error connecting with MongoDB :>> '.red, error);
    
  }
  
}
main();
