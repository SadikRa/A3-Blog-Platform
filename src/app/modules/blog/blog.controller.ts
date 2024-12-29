import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

//create blog
const createBlog = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;

  const result = await blogService.createBlogIntoDB(user, payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

//update blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  const payload = req.body;

  if (!userId) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized!');
  }

  const updatedBlog = await blogService.updateBlogIntoDB(userId, id, payload);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog updated successfully',
    data: updatedBlog,
  });
});

//delete blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deletedBlog = await blogService.deleteBlogFromDB(id);

  if (!deletedBlog) {
    return sendResponse(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'Blog not found',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: null,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
