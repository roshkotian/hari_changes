const Post = require("../models/posts.model");
const Comments = require('../models/comments.model');
//get comments by post
exports.getCommentsByPostId = (req, res) => {
  const postid = req.params._id;
  Post.findOne({ _id: postid }).exec()
    .then(function (postinfo) {
      if (postinfo !== null) {
        var result = [];
        postdata = postinfo;
        return [postinfo];
      }
      else {
        res.status(400).send({ err: 'No posts found.' });
      }
    })
    .then(async function (result) {
      if (result !== null) {
        var postinfo = result[0];
        return Comments.find({ postid: postinfo._id }).sort({ createdAt: -1 }).exec()
          .then(function (comments) {
            result.push(comments);
            return result;
          })
      }
      else {
        res.status(400).send({ err: 'No comments found for that post.' });
      }
    })
    .then(function (result) {
      if (result !== null)
        res.status(200).json({ post: result[0], comments: result[1] });
    })
    .catch(err => {
      res.status(400).send({ err: "Error while retrieving comments" });
    });
}
//save comments
exports.saveComment = async (req, res) => {
  const body = req.body.body;
  const userId = req.body.userId;
  const postid = req.body.postid;
  const userimage = req.body.userimage;
  const status = true;
  const newComment = new Comments({
    body,
    userId,
    postid,
    status,
    userimage
  });
  newComment.save()
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      res.status(400).send("Error  failed");
    });
};
