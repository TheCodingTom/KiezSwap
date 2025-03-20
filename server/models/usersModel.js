import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      validate: {
        validator: function (v) {
          // the value is always taken from the field (username in this case) - after that you can use regex etc
          return v.length > 2; // function will run validation only if the length is more than 2 - here you can put any criteria you want
        },
        message: "username {VALUE} is too short",
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      minLength: [4, "email too short"],
    },
    password: { type: String, require: true },
    image: { type: String, require: false },
    listings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: false,
      },
    ],
  },

  { timestamps: { createdAt: "created_at", modifiedAt: "modified_at" } }
);

const UserModel = mongoose.model("User", usersSchema);

export default UserModel;
