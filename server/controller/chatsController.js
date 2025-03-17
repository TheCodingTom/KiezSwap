import ChatsModel from "../models/chatsModel.js";
import ListingModel from "../models/listingsModel.js";

const getAllChats = async (req, res) => {
  console.log("getting all chats works");
};

const createNewChat = async (req, res) => {
  try {
    console.log("creating new chat");

    // the user is populated by the jwt auth middleware
    const user = req.user;

    // 1. find the listing
    const listingId = req.body.listingId;

    const listing = await ListingModel.findById(listingId);
    if (!listing) {
      res.status(404).json({
        message: "Listing not found",
      });
    }
    // 2. check if a chat already exists between buyer and seller for this listing
    let chat = await ChatsModel.findOne({
      sellerId: listing.seller._id,
      buyerId: user._id,
      listingId: listing._id,
    });

    // 3. chat doesn't exist? create it

    if (!chat) {
      const chatData = {
        sellerId: listing.seller._id,
        buyerId: user._id,
        listingId: listing._id,
        messages: [
          {
            senderId: user._id,
            text: req.body.text,
          },
        ],
      };
      chat = await ChatsModel.create(chatData);
    } else {
      // 4. chat already exists, so we add a new message

      chat.messages.push({
        senderId: user._id,
        text: req.body.text,
      });
      await chat.save();
      res.status(200).json({
        message: "Chat created successfully",
        chat: chat,
      });
    }
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(400).json({ message: "Error creating the chat", error });
  }
};

export { getAllChats, createNewChat };
