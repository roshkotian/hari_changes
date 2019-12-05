const Post = require("../models/posts.model");
const Image = require("../models/image.model");
const mongoose = require("mongoose");
const _ = require("lodash");

//get all posts from mongodb
exports.getallposts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(error => {
      res.status(400).send({ error: "Error while getting posts" });
    });
};
//save posts in mongodb
exports.save = function(req, res) {
  const body = req.body.body;
  const likecount = Number(req.body.likecount);
  const commentcount = Number(req.body.commentcount);
  const userid = req.body.userid;
  const status = true;

  Image.findOne({ userName: userid })
    .exec()
    .then(async function(imageinfo) {
      if (imageinfo !== null) {
        const userimage = imageinfo.image;
        const newpost = new Post({
          body,
          likecount,
          commentcount,
          userid,
          userimage,
          status
        });
        const posts = await newpost.save();
        return [imageinfo, posts];
      } else {
        res.status(400).send({
          err:
            "No profile image exists for the user.Please update the profile image and try again."
        });
      }
    })
    .then(function(result) {
      if (result[1] !== null) res.status(200).json(result[1]);
    })
    .catch(err => {
      res.status(400).send({ err: "Error while adding posts" });
    });
};

// Getting posts of the logged in user
exports.getMyPosts = (req, res) => {
  let userName = req.body.username;
  Post.find({ userid: req.body.username })
    .sort({ createdAt: -1 })
    .then(posts => res.json(posts))
    .catch(error => {
      console.log(error);
      res.status(400).send({ error: "Error while getting personal posts" });
    });
};

// Deleting the post selected by logged in user
exports.deleteSelectedPost = (req, res) => {
  let id = mongoose.Types.ObjectId(req.query.postId);

  Post.findByIdAndDelete({ _id: id })
    .then(availablePosts => {
      Post.find({ userid: availablePosts.userid })
        .sort({ createdAt: -1 })
        .then(posts => {
          res.json(posts);
        });
    })
    .catch(error => {
      res.status(400).send({ error: "Error in deleting post" });
    });
};

exports.likePostsData = async (req, res) => {
    let likes, isLike = true;
       
       Post.findById( {_id : req.body.postId}).then(postExist => {
        likes = Post.findByIdAndUpdate(
          { _id: req.body.postId },
          { isLike, $inc: { likecount: 1 } }
        ).then(afterLike => {
          res.status(200).send({
            message: "Liked successfully",
            likecount: likes.likecount,
            isLike: likes.isLike
          })
        }) 

      })
    };
      /* likes = await Post.findByIdAndUpdate(
        { _id: req.body.postId },
        { isLike, $inc: { likecount: 1 } }
      ).then() */
     /*  if (_.isEmpty(likes)) {
        res.status(400).send({ error: "Error while like" });
      } else {
        res.status(200).send({
          message: "Liked successfully",
          likecount: likes.likecount,
          isLike: likes.isLike
        });
      }); */
    /* } else {
      likes = await Post.findByIdAndUpdate(
        { _id: req.body.postId },
        { isLike, $inc: { likecount: -1 } }
      );
      if (_.isEmpty(likes)) {
        res.status(400).send({ error: "Error while dislike" });
      } else {
        res.status(200).send({
          message: "disLiked successfully",
          likecount: likes.likecount,
          isLike: likes.isLike
        });
      }
    }
  } catch (error) {
    console.log("error ::: ", error);
    res.status(400).send({ error: "Error" });
  } */




/* exports.likePostsData = async (req, res) => {
  try {
    let likes,
      isLike = req.body.isLike;
    if (req.body.isLike == true) {
      likes = await Post.findByIdAndUpdate(
        { _id: req.body.postId },
        { isLike, $inc: { likecount: 1 } }
      );
      if (_.isEmpty(likes)) {
        res.status(400).send({ error: "Error while like" });
      } else {
        res.status(200).send({
          message: "Liked successfully",
          likecount: likes.likecount,
          isLike: likes.isLike
        });
      }
    } else {
      likes = await Post.findByIdAndUpdate(
        { _id: req.body.postId },
        { isLike, $inc: { likecount: -1 } }
      );
      if (_.isEmpty(likes)) {
        res.status(400).send({ error: "Error while dislike" });
      } else {
        res.status(200).send({
          message: "disLiked successfully",
          likecount: likes.likecount,
          isLike: likes.isLike
        });
      }
    }
  } catch (error) {
    console.log("error ::: ", error);
    res.status(400).send({ error: "Error" });
  }
}; */
