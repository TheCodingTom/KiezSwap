import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  username: { require: true, type: String },
  email: { require: true, type: String },
  items: [
    {
      name: {
        require: true,
        type: String,
      },
      likes: Number,
    },
  ],
});
