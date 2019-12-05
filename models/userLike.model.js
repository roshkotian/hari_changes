const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Like model
let userLikeSchema = new Schema(
  {
    userid: { type: String },
    postId : {type: mongoose.Types.ObjectId},
    likeCount: {type: Number, default: 0},
    commentcount: {type: Number, default: 0}
  },{ timestamps: true },
  { _id: false}
);


module.exports = mongoose.model("UserLike", userLikeSchema);