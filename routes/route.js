const router = require("express").Router();
const multer = require("multer");
const postController = require("../controllers/posts.controller");
const loginController = require("../controllers/loginController");
const passwordController = require("../controllers/password.controller");
const registerController = require("../controllers/register.controller");
const imageController = require("../controllers/image.controller");
const userInfoController = require("../controllers/userInfo.controller");
const commentsController = require("../controllers/comments.controller");
const likePostsData = require("../controllers/posts.controller");

//getall posts from mongodb
router.get("/", postController.getallposts);
router.post("/save", postController.save);

// get posts based on logged in user
router.post("/getMyPosts", postController.getMyPosts);

// like or dislike the posts
router.post("/likePost", postController.likePostsData);

// delete user selected post
router.delete("/deleteMyPost", postController.deleteSelectedPost);

// Saving Login Information
router.post("/getLoginInfo", loginController.authenticate);

//Update password
router.post("/getUserInfo", passwordController.getUserDetails);
router.put("/updatePassword", passwordController.resetPassword);

//register
router.post("/register", registerController.save);

// get comments based on post id
router.get("/getCommentsByPostId/:_id", commentsController.getCommentsByPostId);

// save comments for that post
router.post("/saveComment", commentsController.saveComment);

//profile image
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

router.post(
  "/uploadImage",
  upload.single("image"),
  imageController.insertImage
);
router.put("/changeImage", upload.single("image"), imageController.updateImage);
router.post("/getImage", imageController.fetchImage);
router.put(
  "/updateImage",
  upload.single("image"),
  registerController.upsertImage
);

// user Information
router.post("/getUser", userInfoController.getUserInfo);
router.post("/addLike", likePostsData.likePostsData);



module.exports = router;
