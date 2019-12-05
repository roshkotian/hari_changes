const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

let loginSchema = new Schema(
  {
    _id: { type: Number },

    userName: { type: String, required: true, minlength: 5, maxlength: 15 },

    password: { type: String, required: true },

    activeInd: { type: String, default: "Y" },

    securityQuesDesc: { type: String },

    securityAnswer: {
      type: String,
      minlength: 5,
      maxlength: 15
    }
  },
  {
    timestamps: true
  }
);
loginSchema.plugin(AutoIncrement);

module.exports = mongoose.model("Login", loginSchema);
