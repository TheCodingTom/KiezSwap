import UserModel from "../models/usersModel.js";

const getAllUsers = async (req, res) => {
  //   console.log("all users working");
  try {
    const allUsers = await UserModel.find().populate("items");
    console.log(allUsers);
    if (allUsers.length === 0) {
      // try to cover as much responses as possible to build a proper UI
      res.status(400).json({
        message: "No records in the database",
      });
      return;
    }

    res.status(200).json({
      message: "All users from our database", // consistency is key: if there's a field called message always include it
      amount: allUsers.length,
      allUsers,
    }); // sending the response as a json
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "Something went wrong trying to send the response",
    });
  }
};

export { getAllUsers };
