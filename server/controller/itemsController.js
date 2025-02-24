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
      message: "All records from our database",
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

const getItemsByCategory = async (req, res) => {
  console.log("running");
  console.log(req);
  const category = req.params.category;

  try {
    const itemsByCategory = await ItemModel.find({
      category: req.params.category,
    });

    if (itemsByCategory.length === 0) {
      // try to cover as much responses as possible to build a proper UI
      res.status(400).json({
        message: `No items in the ${req.params.category} category in the database`,
        amount: itemsByCategory.length,
        itemsByCategory,
      });
      return; // always add a return to avoid sending 2 responses (not possible)
    }

    res.status(200).json({
      message: "All records from our database",
      amount: itemsByCategory.length,
      itemsByCategory,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "Something went wrong trying to send the response",
    });
  }
};

export { getAllItems, getItemsByCategory };
