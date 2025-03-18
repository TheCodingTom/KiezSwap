import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      require: true,
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
        text: { type: String, require: true },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", modifiedAt: "modified_at" } }
);

const ChatsModel = mongoose.model("Chat", chatsSchema);

export default ChatsModel;
