import ChatsModel from "../models/chatsModel.js";
import ListingModel from "../models/listingsModel.js";

const getAllChats = async (req, res) => {
  console.log("getting all chats works");

  try {
    const allChats = await ChatsModel.find()
      .populate({
        path: "listing",
        select: "name",
      })
      .populate({ path: "buyer", select: "username" })
      .populate({ path: "seller", select: "username" })
      .populate({ path: "messages.sender", select: "username" });
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

const getUserChats = async (req, res) => {
  try {
    // const {sellerId, buyerId} = req.query
    const seller = req.query.seller;
    const buyer = req.query.buyer;

    // Build query to match chats for the sellerID or buyerID
    const query = {
      // $or returns documents that match at least one of the conditions inside the array
      $or: [],
    };
    if (seller) query.$or.push({ seller });
    if (buyer) query.$or.push({ buyer });
    // if we don't have seller or buyerId, $or is removed avoiding an unnecessary query
    if (query.$or.length === 0) delete query.$or;

    const userChats = await ChatsModel.find(query)
      .populate({
        path: "listing",
        select: "name",
      })
      .populate({ path: "buyer", select: "username" })
      .populate({ path: "seller", select: "username" })
      .populate({ path: "messages.sender", select: "username" });

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

const getChatById = async (req, res) => {
  try {
    console.log("params:", req.params);

    const chatId = req.params.chatId;

    if (!chatId) {
      return res.status(400).json({
        message: `No chat with the ID ${chatId} in the database`,
      });
    }

    const chat = await ChatsModel.findById(chatId)
      .populate({
        path: "listing",
        select: "name",
      })
      .populate({ path: "buyer", select: "username" })
      .populate({ path: "seller", select: "username" })
      .populate({ path: "messages.sender", select: "username" });

    if (!chat) {
      return res.status(400).json({
        message: "Couldn't retrieve chat from the DB",
      });
    }

    if (chat) {
      return res.status(200).json({
        message: "Chat retrieved successfully",
        chat,
      });
    }
  } catch (error) {
    console.log("error :>> ", error.message);
  }
};

const createNewMessage = async (req, res) => {
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
      seller: listing.seller._id,
      buyer: user._id,
      listing: listing._id,
    });

    // 3. chat doesn't exist? create it

    if (!chat) {
      const chatData = {
        seller: listing.seller._id,
        buyer: user._id,
        listing: listing._id,
        messages: [
          {
            sender: user._id,
            text: req.body.text,
          },
        ],
      };
      chat = (await ChatsModel.create(chatData)).populate({
        path: "listing",
        select: ["name", "district"],
      });
    } else {
      // 4. chat already exists, so we add a new message
      chat.messages.push({
        sender: user._id,
        text: req.body.text,
      });
      await chat.save();
      res.status(200).json({
        message: "Message added successfully",
        chat: chat,
      });
    }
  } catch (error) {
    console.error("Error processing chat:", error);
    res.status(400).json({ message: "Error creating the chat", error });
  }
};

const sendMessage = () => {
  console.log("Send message route working");
};

export {
  getAllChats,
  getUserChats,
  getChatById,
  createNewMessage,
  sendMessage,
};
