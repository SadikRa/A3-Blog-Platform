import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';
import { adminService } from './admin.service';
import sendResponse from '../../utils/sendResponse';
import { User } from '../user/user.model';

//block user
const blockUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Invalid user ID');
  }
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (user.isBlocked) {
    throw new AppError(StatusCodes.CONFLICT, 'User is already blocked');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await adminService.blockUser(id as any);
  res.status(200).json({
    success: true,
    message: 'User blocked successfully',
  });
});

//delete blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id: blogId } = req.params;

  if (req.user?.role !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Access denied! Only admins can delete blogs',
    );
  }

  const result = await adminService.deleteBlog(blogId);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
