import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req?.body;
    const result = await UserServices.createUserIntoDB(user);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to create user',
      error: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
};

export const userController = {
  createUser,
};
