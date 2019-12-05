const express = require("express");
const bcrypt = require('bcrypt');
const login = require('../models/loginInformation.model');

//Extracts user login information from mongodb/login collection based on username and security answer
exports.getUserDetails = async (req, res) => {

  login.findOne({ userName: req.body.userName, securityAnswer: req.body.securityAnswer })
    .then(Login => {
    if (!Login) {
      return (
        res
          .json({ Login: "Invalid Username/SecurityAnswer" })
      );
    } else {
            return (
             res.json(Login))
            }
    })
    .catch(error => {
        res.status(400).send({ error: 'Error while getting user login details from login collection by userName' })
    })
};

//update password by userName
exports.resetPassword = async (req, res) => {
  let { userName, password } = req.body;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch {
    res.status(500).send();
  }
  const encryptPassword = { userName, password: hashedPassword };
  const updatepassword = new login(encryptPassword);
   login.findOneAndUpdate({ userName: req.body.userName }, { $set: { password: hashedPassword } }, { upsert: true }, function (err, doc) {
    if (err) { throw err; }
    else { res.status(200).send();}
  });
};





