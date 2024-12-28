import mongoose, { Schema, Model } from "mongoose";
import { ILoginUser } from "./auth.interface";

const LoginUserSchema = new Schema<ILoginUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LoginUserModel: Model<ILoginUser> = mongoose.model<ILoginUser>(
  "LoginUser",
  LoginUserSchema
);

export default LoginUserModel;
