const login = require("../models/loginInformation.model");
const bcrypt = require("bcrypt");

exports.authenticate = async (req, res) => {
  let { userName, password } = req.body;

  login
    .findOne({ userName })
    .then(user => {
      if (!user) {
        return res.json({ user: "Invalid Username/Password" });
      } else {
        bcrypt.compare(req.body.password, user.password).then(passwordMatch => {
          if (passwordMatch) {
            res.json({
              user: "User exists"
            });
          } else {
            return res.json({ user: "Invalid Username/Password" });
          }
        });
      }
    })
    .catch(err => {
      res.sendStatus(204);
    });
};
