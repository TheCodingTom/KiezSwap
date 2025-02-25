import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  username: { require: true, type: String },
  email: { require: true, type: String },
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
});

const UserModel = mongoose.model("User", usersSchema);

export default UserModel;
