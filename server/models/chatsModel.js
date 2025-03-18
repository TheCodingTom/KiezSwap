import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      require: true,
    },
    messages: [
      {
        senderId: {
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
