import generateToken from '../config/generatetoken.js';

import nodemailer from 'nodemailer';
import crypto from 'crypto';
import userModel from '../models/Usermode.js';






const registerUser = async (req, res) => {
    try {
        console.log("check2")
        const { name, email, password } = req.body;
        console.log(req.body)

        if (!name || !email || !password) {
            return res.status(400).json({ err: "Please Enter all the Fields" });
        }

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ err: "User already exists" });
        }

        const user = await userModel.create({
            name,
            email,
            password,


        });

        if (user) {
            let token = generateToken(user._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, 
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                sameSite: "none", 
            });

            req.user = user;
            return res.status(200).json({
                user: user,
                token: token,
            });
        } else {
            return res.status(400).json({ err: "User not found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error.message });
    }
};

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            let token = generateToken(user._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                sameSite: "none",
            });

            req.user = user;
            res.json({
                user: user,
                token: token,
            });
        } else {
            res.status(401).json({ err: "Invalid Email or Password" });
        }
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

const allUsers = async (req, res) => {
    try {
        const keyword = req.query.search ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        } : {};


        
        const users = await userModel.find(keyword);
        res.send(users);
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ err: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/passwordreset/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
            user: 'example@gmail.com',
            pass: 'examplepassword',
            },
        });

        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset Request',
            html: message,
        });

        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ err: "Invalid Token" });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ success: true, data: 'Password Reset Success' });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

const getUser = (req, res) => {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(404).json({ err: "User not found" });
    }
};

export { registerUser, authUser, allUsers,forgotPassword, resetPassword,getUser };
