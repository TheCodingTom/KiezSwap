import ChatsModel from "../models/chatsModel.js";
import ListingModel from "../models/listingsModel.js";

const getAllChats = async (req, res) => {
  console.log("getting all chats works");

  try {
    const allChats = await ChatsModel.find();
    if (allChats.length === 0) {
      // try to cover as much responses as possible to build a proper UI
      return res.status(400).json({
        message: "No chats in the database",
      });
    }

    res.status(200).json({
      message: "All chats from our database", // consistency is key: if there's a field called message always include it
      amount: allChats.length,
      allChats,
    });
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      error: "Something went wrong trying to send the allchats response",
    });
  }
};

const getChats = async (req, res) => {
  try {
    // const {sellerId, buyerId} = req.query
    const sellerId = req.query.sellerId;
    const buyerId = req.query.buyerId;

    // Build query to match chats for the sellerID or buyerID
    const query = {
      // $or returns documents that match at least one of the conditions inside the array
      $or: [],
    };
    if (sellerId) query.$or.push({ sellerId });
    if (buyerId) query.$or.push({ buyerId });
    // if we don't have seller or buyerId, $or is removed avoiding an unnecessary query
    if (query.$or.length === 0) delete query.$or;

    const userChats = await ChatsModel.find(query);

    if (!userChats) {
      res.status(404).json({
        message: "no chats in the database",
      });
    }

    if (userChats) {
      res.status(200).json({
        message: "user chats retrieved successfully",
        amount: userChats.length,
        userChats,
      });
    }
  } catch (error) {
    console.error("Error fetching user's chat:", error);
    res.status(404).json({ message: "Error fetching the user's chat", error });
  }
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

export { getAllChats, getChats, createNewChat };
