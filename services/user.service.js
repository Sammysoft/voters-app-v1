import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const { JWT_TOKEN } = process.env;

export const UserOnboardService = async (data) => {
  const { name, votersID } = data;
  try {
    let user = await new UserModel();
    user.name = name;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(votersID, salt, (err, hash) => {
        user.votersID = hash;
        user.save();
      });
    });
    return { status: 200, message: "Account Created" };
  } catch (error) {
    return { status: 400, message: "Internal Server Error" };
  }
};

export const UserAuthService = async (data) => {
  const { name, votersID } = data;
  try {
    let user = await UserModel.findOne({ name: name });
    if (user) {
      let isMatch = await bcrypt.compare(votersID, user.votersID);
      if (isMatch) {
        let data = { id: user._id };
        let token = await jwt.sign(data, JWT_TOKEN, { expiresIn: "1h" });
        return { status: 200, message: token };
      } else {
        return { status: 400, message: "Invalid VotersID" };
      }
    } else {
      return { status: 400, message: "Name provided is not registered" };
    }
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Internal Server Error" };
  }
};

export const getUserAccountService = async (id) => {
  let user = await UserModel.findById(id);
  return { name: user.name, id: user._id, isVoted: user.isVoted };
};

export const UserCastVoteService = async (data) => {
  try {
    let user = await UserModel.findByIdAndUpdate(
      data.id,
      { $set: { isVoted: true } },
      { new: true }
    );
    return { status: 200, message: user.isVoted };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Internal Server Error." };
  }
};

export const getUserService = async (req, res) => {
  try {
    let user = req.user;
    return { status: 200, message: user };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Could not get user." };
  }
};
