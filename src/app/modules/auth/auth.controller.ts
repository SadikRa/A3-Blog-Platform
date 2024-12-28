import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { accessToken } = result;

  res.cookie('accessToken', accessToken, {
    secure: config.NODE_ENV !== 'development', 
    httpOnly: true, 
    sameSite: 'strict', 
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});

export const AuthControllers = {
  loginUser,
};
