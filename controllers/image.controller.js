const Image = require('../models/image.model');

//upload image
exports.insertImage = async (req, res) => {
  const path = require('path');
  const userName = req.body.userName;
  const userId = req.body.userId;
  const imageName = req.body.imageName;
  const image = req.file.path;
  const newimage = new Image({
    userName,
    userId,
    imageName,
    image
  });
  newimage.save()
    .then(image => {
      res.status(200).json({ image: "Image uploaded successfully" });
    })
    .catch(err => {
      res.status(400).send("Image upload failed");
    });
};

// update image
exports.updateImage = async (req, res) => {
  let userName = req.body.userName;
  let imageName = req.body.imageName;
  let image = req.file.path;
  Image.findOneAndUpdate({ userName: userName }, { $set: { imageName: imageName, image: image } }, { upsert: true }, function (err, doc) {
    if (err) { throw err; }
    else {
      res.status(200).json({ image: "Image updated successfully" });
    }
  });
};

//get image  
exports.fetchImage = (req, res) => {
  Image.findOne({ userName: req.body.userName })
    .select('imageName userName image')
    .exec()
    .then(docs => res.json({
      imageName: docs.imageName,
      userName: docs.userName,
      image: docs.image
    }
    )).catch(err => {
      res.status(400).send("Error while getting image");
    });
};

