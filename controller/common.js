const express = require('express');
const app = express();
require("dotenv").config();

const Company = require('../models/company')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT;

exports.user = async (req, res) => {
    console.log("req.body:", req.body);
    const body = req.body;
    // console.log(req.body.CompanyName);
    try {
        const { CompanyName, PanNo, City, State, Country } = req.body;

        if (!CompanyName || !PanNo || !City || !State || !Country) {
            return res.status(400).json({ error: "parameters are missing" });
        }

        const collection = {
            CompanyName,
            PanNo,
            City,
            State,
            Country
        };

        const user = await new Company(collection);
        const data = await user.save();
        console.log(data);
        res.status(200).json({ message: "User added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};


exports.remove_user = async (req, res) => {
    const userId = req.params.id;
    try {

        const deletedUser = await Company.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.modify = async (req, res) => {
    const {userId, updates} = req.body;
    const { CompanyName, PanNo, City, State, Country } = req.body;
    try {
        const updates = { CompanyName, PanNo, City, State, Country }
        const updatedUser = await Company.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getuser = async (req, res) => {
    try {
        if (req.params.id) {
            const userId = req.params.id;
            const user = await Company.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.status(200).json({ user });
        } else {
            const users = await Company.find({});
            // const users = await Company.countDocuments();
            if (!users || users.length === 0) {
                return res.status(404).json({ error: "No users found" });
            }
            return res.status(200).json({ users, counts: users.length });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

app.get('/', (req, res) => {
    res.send('Welcome to my page!');
});
