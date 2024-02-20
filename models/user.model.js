export const Users = [
  {
    name: "Samuel Dare-Owonibi",
    votersID: "VN34HYINJUSKOHASGHBUGW",
  },
  {
    name: "Adeyeye Omokorede",
    votersID: "VNJHSIJHAY78YEJIKSL3",
  },
  {
    name: "Adegbadesori Ajobiewe",
    votersID: "VNBHSJKSLU78JD21OAKJ",
  },
  {
    name: "Amaka Lucas",
    votersID: "VNBJGSHALKOQIE35UFHD",
  },
  {
    name: "Beatrice Ndoka",
    votersID: "VNBSHDIROALPUEHFWQ12",
  },
  {
    name: "Jane Doe",
    votersID: "VNHSJE89RGHSWUILOQP0",
  },
];

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    votersID: { type: String, required: true },
    isVoted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("UserModel", userSchema);
