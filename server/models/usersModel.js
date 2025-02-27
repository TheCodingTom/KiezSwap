import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    image: { type: String, require: false },
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
  },
  { timestamps: { createdAt: "created_at", modifiedAt: "modified_at" } }
);

const UserModel = mongoose.model("User", usersSchema);

export default UserModel;
