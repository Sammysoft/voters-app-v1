import { getUserService } from "../services/user.service.js";

export const GetUserController = async (req, res) => {
  let response = await getUserService(req, res);
  if (response)
    return res
      .status(response.status)
      .json({ status: response.status, message: response.message });
};
