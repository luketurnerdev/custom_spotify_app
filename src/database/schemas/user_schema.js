const { Schema } = require("mongoose");

//These are the attributes a user will have
//A lot of these will be pulled from the user's Meetup.com profile
const userSchema = new Schema(
  {
    spotify_uid: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: false,
      trim: true
    },
    access_token: String,
    refresh_token: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

module.exports = userSchema;
