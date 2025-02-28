import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { User } from "../models/User.model.js";
import uploadonCloudinary from "../cloudinary.js";
import jwt from 'jsonwebtoken'; // Fix missing jwt import

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password, username } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    if (!password) {
        throw new ApiError(400, "Password is required");
    }
    if (!fullname) {
        throw new ApiError(400, "FullName is required");
    }
    if (!username) {
        throw new ApiError(400, "Username is required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (existedUser) {
        throw new ApiError(400, "User with username or email already exists");
    }

    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing. Please upload an image.");
    }

    // Optional: Validate file type (e.g., checking for image files)
    const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = avatarLocalPath.split('.').pop()?.toLowerCase();

    if (!validImageExtensions.includes(`.${fileExtension}`)) {
        throw new ApiError(400, "Invalid file type. Only image files are allowed.");
    }

    
        const avatar = await uploadonCloudinary(avatarLocalPath);

        if (!avatar) {
            throw new ApiError(500, "There was a problem while uploading the avatar to Cloudinary.");
        }

        const user = await User.create({
            fullname,
            avatar: avatar.secure_url, // Corrected field for secure_url
            email,
            password,
            username: username.toLowerCase(),
        });

        const Createduser = await User.findById(user._id).select("-password -refreshToken");

        if (!Createduser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        return res.status(201).json(new ApiResponse(200, user, "User Registered successfully"));
    
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "Username, Email, and Password are required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        throw new ApiError(402, "User does not exist");
    }

    
    
    const isPasswordCorrect = await user.isPasswordCorrect(password.trim());
    
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect");
    }
    

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Check for production environment
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged In Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Check for production environment
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user || incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Invalid or expired refresh token");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Check for production environment
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid refresh token");
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
};
