import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  username: { require: true, type: String },
  email: { require: true, type: String },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const UserModel = mongoose.model("User", usersSchema);

export default UserModel;
