import {
  UserOnboardService,
  UserAuthService,
} from "../services/user.service.js";

export const OnboardUserController = async (req, res) => {
  let response = await UserOnboardService(req.body);
  if (response)
    return res
      .status(response.status)
      .json({ status: response.status, message: response.message });
};

export const AuthUserController = async (req, res) => {
  let response = await UserAuthService(req.body);
  if (response)
    return res
      .status(response.status)
      .json({ status: response.status, message: response.message });
};
