const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Login model
let loginSchema = new Schema(
  {
    userName: { type: String, required: true, minlength: 5, maxlength: 15 },
    password: { type: String, required: true },
    activeInd: { type: String, default: "Y" },
    securityQuesDesc: { type: String, required: false },
    securityAnswer: { type: String, required: true, minlength: 5, maxlength: 15 }},
  { timestamps: true },
  { _id: false}
);


module.exports = mongoose.model("Login", loginSchema);