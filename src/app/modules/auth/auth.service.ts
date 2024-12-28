import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import config from '../../config';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';
import { ILoginUser } from './auth.interface';
import { User } from '../user/user.model';

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked!');
  }

  const isMatch = await bcrypt.compare(payload?.password, user.password);
  if (!isMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials!');
  }

  const jwtPayload = {
    userId: user._id.toString(), 
    role: user?.role ?? 'user',
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
};
