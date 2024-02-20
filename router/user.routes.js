import express from "express";
import {
  AuthUserController,
  OnboardUserController,
} from "../controller/user.controller.post.js";
import { UserCastVoteController } from "../controller/user.controller.put.js";
import {
  UserIsVotedMiddleware,
  UserVerifyMiddleware,
} from "../services/middleware.service.js";
import { GetUserController } from "../controller/user.controller.get.js";
const UserRouter = express.Router();

UserRouter.post("/onboard", OnboardUserController);
UserRouter.post("/auth", AuthUserController);
UserRouter.put(
  "/vote",
  UserVerifyMiddleware,
  UserIsVotedMiddleware,
  UserCastVoteController
);
UserRouter.get("/get", UserVerifyMiddleware, GetUserController);

export default UserRouter;
