const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postsSchema = new Schema(
  {
    body: {
      type: String
    },
    postId: { type: Schema.Types.ObjectId },
    likecount: { type: Number },
    isLike: { type: Boolean, default: false },
    likecount: {
      type: Number
    },
    userid: {
      type: String
    },
    userimage: {
      type: String
    },
    status: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Posts", postsSchema);
