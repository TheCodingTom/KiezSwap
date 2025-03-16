import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
    unique: false,
  },
  author: {
    type: String,
    // require: true,
    unique: false,
  },
  authorId: {
    type: String,
  },
  postingDate: {
    type: Number,
    // require: true,
    unique: false,
  },
});

const MessageModel = mongoose.model("Message", messagesSchema);

export default MessageModel;
