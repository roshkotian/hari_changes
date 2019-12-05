
const { Login, UserInformation } = require("../models/register.model");

//Extracts user login information from mongodb/login collection based on username
exports.getUserInfo = async (req, res) => {
UserInformation.findOne({ userName: req.body.userName})
    .then(Userinfo => {
    if (!Userinfo) {
      return (
        res
          .json({ Userinfo: "Invalid Username" })
      );
    } else {
            return (
             res.json(Userinfo))
            }
    })
    .catch(error => {
        res.status(400).send({ error: 'Error while getting user login details from login collection by userName' })
    })
};