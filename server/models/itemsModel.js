import mongoose from "mongoose";

// 1. define schema
const itemsSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  price: { require: false, type: Number },
  location: {
    city: { require: true, type: String },
    district: { require: true, type: String },
  },
  category: {
    require: true,
    type: String,
  },
  likes: {
    require: false,
    type: Number,
  },
  user: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// 2. turn schema into a model

const ItemModel = mongoose.model("Item", itemsSchema); // first we select collection and then we pass the schema

export default ItemModel;
