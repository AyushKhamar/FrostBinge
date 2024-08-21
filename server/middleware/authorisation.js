import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const authorisation = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorised, no token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({
        success: false,
        message: "Unauthorised, invalid token provided",
      });
    const user = await User.findById(decoded.userId).select("-password");
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Unauthorised, user not found",
      });
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error in authorisation function",
    });
  }
};
