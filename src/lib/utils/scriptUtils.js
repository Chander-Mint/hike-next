// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import User from "@/src/lib/models/userModel";
// import connectDB from "../db/connectDB";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const connectDB = require("../db/connectDB");


async function createAdminUser() {
    try {

        await connectDB();

        const existing = await User.findOne({ email: userDetails.email });
        if (existing) {
            console.log("User already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(userDetails.password, 10);

        const user = new User({
            email: userDetails.email,
            password: hashedPassword,
            role: userDetails.role
        });

        await user.save();

        console.log("Admin user created successfully");

    } catch (err) {
        console.error("Error creating admin user:", err);
    }
}

createAdminUser();
