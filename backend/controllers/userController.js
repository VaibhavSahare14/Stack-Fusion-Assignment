const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    service: 'gmail',
    secure: false,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

// 1. Create new Data 

exports.addUser = async (req, res) => {
    const { name, dateOfBirth, email, phoneNumber } = req.body;
    const newUser = new User({
        name,
        dateOfBirth,
        email,
        phoneNumber
    });

    try {
        // Checking EMAIL
        if (await User.findOne({ email })) {
            return res
                .status(404)
                .json({ message: "Email is already exists" });
        }

        // VALIDATING PHONE NUMBER
        const phoneNumberPattern = /^[6-9]{1}[0-9]{9}$/;

        if (!phoneNumberPattern.test(phoneNumber)) {
            return res.status(400).json({
                message: "Invalid phone number format",
            });
        }

        if (await User.findOne({ phoneNumber })) {
            return res
                .status(404)
                .json({ message: "Phone Number is already exists" });
        }
        const user = await newUser.save();
        res.status(200).json({ user });
        // console.log(user.email);

        // SENDING MAIL
        transporter.sendMail({
            from: '"Shital Sahare" <process.env.EMAIL_ADDRESS>',
            to: user.email,
            subject: `Confirmation Mail ✔`,
            text: `Hello ${user.name}, You have successfully submitted the form`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. List all data 

exports.getData = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({
            message: "No Data Found", error: err.message
        })
    };
}