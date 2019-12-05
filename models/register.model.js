const { Schema, model } = require('mongoose');

const UserInformationSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String,
    role: String,
    department: String,
    userId: String,
    email: String,
    imageName: {type: String, require: false, default: "none"},
    image: {type: Buffer, require:false} ,
}, { timestamps: true, });

const LoginsSchema = new Schema({
    userId: String,
    userName: String,
    password: String,
    activeInd: {
        type: String,
        default: "Y"
    },
    securityQuestion: String,
    securityAnswer: String
}, { timestamps: true, });

const UserInformation = model('userinformations', UserInformationSchema);
const Login = model('logins', LoginsSchema);

module.exports = { Login, UserInformation };
