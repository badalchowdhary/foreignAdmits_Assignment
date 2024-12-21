const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

const User = require("../models/User");
const { createToken } = require('../utils/jwtService');


const registerUser = async (data) => {
    try {
        const { name, email, password } = data;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            throw new Error("Email already exists");
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: CryptoJS.AES.encrypt(password, process.env.PASS_SECRETKEY).toString(),
        });

        return { message: 'User registered successfully. Login to continue.'};
    } catch (error) {
        console.error(`Error in registerUser service: ${error.message}`);
        throw new Error(`Failed to registerUser: ${error.message}`);
    }
};

const loginUser = async (data) => {
    try {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error("Wrong Credentials");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRETKEY);
        const ogPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (ogPassword !== data.password) {
            throw new Error("Wrong Credentials");
        }

        const accessToken = createToken(user);

        const { password, ...others } = user._doc;

        const userDetails = {
            name: others.name,
            email: others.email,
            token: accessToken,
        }

        return userDetails;

    } catch (error) {
        console.error(`Error in loginUser service: ${error.message}`);
        throw new Error(`Failed to loginUser: ${error.message}`);
    }
}

module.exports = {
    registerUser,
    loginUser
}