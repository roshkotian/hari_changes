const { Login, UserInformation } = require("../models/register.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

require("dotenv").config();

const User = process.env.MAIL_User;
const Password = process.env.MAIL_Password;
const From = process.env.MAIL_From;

exports.save = async (req, res) => {
  let {
    email,
    userName,
    password,
    role,
    firstName,
    lastName,
    securityAnswer,
    securityQuestion,
    department,
    userId,
    image,
    imageName,
    confirmPassword
  } = req.body;

  var status = false;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch {
    res.status(500).send();
  }

  userId = Date.now().toString();
  const dataForInformation = {
    userName,
    firstName,
    lastName,
    role,
    department,
    email,
    image,
    imageName,
    userId
  };
  const dataForLogin = {
    userName,
    password: hashedPassword,
    securityAnswer,
    securityQuestion,
    userId,
    confirmPassword
  };

  const saveInformation = new UserInformation(dataForInformation);

  Login.findOne({ userName: req.body.userName }).then(user => {
    if (user) {
      return res.json({ result: "Username already exists" });
    } else {
      const saveLogin = new Login(dataForLogin);
      saveLogin
        .save()
        .then(
          saveInformation
            .save()
            .then(data =>
              res.json({ result: "New User Registered successfully" })
            )
        )
        .catch(err => {
          res.status(400).send("Registration Failed");
        });
    }
  });

  if (res.statusCode === 200) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: User,
        pass: Password
      }
    });

    var mailOptions = {
      from: From,
      to: req.body.email,
      subject: "DonsApp Registration",
      text: "You have registered successfully to DonsApp"
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};

exports.upsertImage = async (req, res) => {
  let userName = req.body.userName;
  let imageName = req.body.imageName;
  let image = req.file.path;
  UserInformation.findOneAndUpdate({ userName: userName }, { $set: { imageName: imageName, image: image } }, { upsert: true }, function (err, doc) {
    if (err) { throw err; }
    else { res.status(200).json({ image: "Image updated successfully" }); 
  }
  });
};