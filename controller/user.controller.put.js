import { UserCastVoteService } from "../services/user.service.js";

export const UserCastVoteController = async (req, res) => {
  let response = await UserCastVoteService(req.user);
  if (response)
    return res
      .status(response.status)
      .json({ status: response.status, message: response.message });
};
