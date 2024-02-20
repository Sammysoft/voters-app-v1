import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserAccountService } from "./user.service.js";
dotenv.config();
const { JWT_TOKEN } = process.env;

export const UserVerifyMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return { status: 401, message: "Unauthorized" };
    }
    try {
      const decoded = await jwt.verify(token, JWT_TOKEN);
      req.user = await getUserAccountService(decoded.id);
      next();
    } catch (error) {
      return res.status(400).json({ status: 400, message: "Invalid Token" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: 400, message: "Internal Server Error" });
  }
};

export const UserIsVotedMiddleware = async (req, res, next) => {
  if (req.user.isVoted === true) {
    return res.status(400).json({ message: "You have already Voted!." });
  } else {
    return next();
  }
};
