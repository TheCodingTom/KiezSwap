import ChatsModel from "../models/chatsModel.js";
import ListingModel from "../models/listingsModel.js";

const getAllChats = async (req, res) => {
  console.log("getting all chats works");
};

const createNewChat = async (req, res) => {
  console.log("creating new chat");
  const listingId = req.body.listingId;
  const listing = await ListingModel.findById(listingId);

  if (!listing) {
    res.status(404).json({
      message: "Listing not found",
    });
  }

  // the user is populated by the jwt auth middleware
  const user = req.user;

  // create new chat data

  const chatData = {
    sellerId: listing.seller._id,
    buyerId: user._id,
    listingId: listing._id,
    messages: {
      senderId: user._id,
      text: req.body.text,
    },
  };
  // create chat in the DB

  const chat = await ChatsModel.create(chatData);
  if (chat) {
    res.status(200).json({
      message: "Chat created successfully",
      chat: chat,
    });
  }
  if (!chat) {
    res.status(400).json({
      message: "Error creating the chat",
    });
  }
};

export { getAllChats, createNewChat };
