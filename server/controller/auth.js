import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
export const signUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username)
      return res
        .status(400)
        .json({ success: false, message: "ALl fields are required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return res.status(400).json({ success: false, message: "invalid email" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ success: false, message: "Password is too short" });
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail)
      return res.status(400).json({
        success: false,
        message: "user with that email already exists",
      });
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername)
      return res.status(400).json({
        success: false,
        message: "user with that username already exists",
      });

    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);

    const images = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image: images[Math.floor(Math.random() * images.length)],
    });
    generateToken(newUser._id, res);
    await newUser.save();
    res.status(200).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
      message: "Congratulations. you are in",
    });
  } catch (error) {
    console.log("error in signup controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password)
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    const user = await User.findOne({ email });
    if (!user)
      res.status(400).json({ success: false, message: "No such user exists" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      res.status(400).json({ success: false, message: "Invalid credentials" });
    const token = generateToken(user._id, res);
    if (!token)
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
      message: "Congratulations. you are in",
    });
  } catch (error) {
    console.log("error in login controller", error);
    res.status(400).json({ success: false, message: "Invalid credentials" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authCheck = async (req, res) => {
  try {
    console.log("This is auth check function", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Some error in authCheck function" });
  }
};
