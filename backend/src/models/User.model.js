import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config({
    path: "./.env"  
});

const userschema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullname: {
        type: String,
        unique: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true });


userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    try {
     
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (err) {
      next(err);
    }
  });

userschema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};


userschema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Use your desired expiry time
        }
    );
};


userschema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Use your desired expiry time
        }
    );
};

export const User = mongoose.model("User", userschema);
