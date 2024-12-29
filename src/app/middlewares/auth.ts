import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const authorize = (...allowedRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Access denied. Token is missing.');
    }

    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    const { userId, role } = decoded;

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found in the system.');
    }

    if (user.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Your account has been blocked.');
    }

    if (allowedRoles.length && !allowedRoles.includes(role as TUserRole)) {
      throw new AppError(StatusCodes.FORBIDDEN, 'You do not have permission to perform this action.');
    }

    req.user = { userId, role };
    next();
  });
};

export default authorize;
