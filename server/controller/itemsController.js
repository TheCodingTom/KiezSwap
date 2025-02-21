// these functions control the operations that we wanna do with items in our database

import ItemModel from "../models/itemsModel.js";

const getAllItems = async (req, res) => {
  //   console.log("get all items running");
  try {
    const allItems = await ItemModel.find(); // here we're requesting items from database
    console.log(allItems);

    if (allItems.length === 0) {
      // try to cover as much responses as possible to build a proper UI
      res.status(400).json({
        message: "No records in the database",
      });
    }

    res.status(200).json({
      message: "All items in our database",
      amount: allItems.length,
      allItems,
    }); // sending the response as a json
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "Something went wrong trying to send the response",
    });
  }
};

export { getAllItems };
