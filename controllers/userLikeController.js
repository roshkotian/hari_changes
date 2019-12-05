const UserLike = require("../models/userLike.model");
const mongoose = require("mongoose");

//save posts in mongodb
exports.save = function(req, res) {
    const userid = req.body.userid;
    const postId = mongoose.Types.ObjectId(req.query.postId);
    const likecount = Number(req.body.likecount);
    const commentcount = Number(req.body.commentcount);

    const userLike = new UserLike(dataForInformation);
  
    //UserLike.save()
  };