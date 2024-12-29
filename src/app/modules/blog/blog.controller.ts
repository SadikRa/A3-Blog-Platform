import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
// import AppError from '../../errors/AppError';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../../config';
// import { User } from '../user/user.model';


const createBlog = catchAsync(async (req, res) => {
  const user = req.user; // Extract user data from `authorize` middleware
  const payload = req.body;

  const result = await blogService.createBlogIntoDB(user, payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, content, isPublished } = req.body;

  if (!title && !content && isPublished === undefined) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'At least one of title, content, or isPublished must be provided',
      data: null,
    });
  }

  const updateData = { title, content, isPublished };
  const updatedBlog = await blogService.updateBlogIntoDB(id, updateData);

  if (!updatedBlog) {
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
    message: 'Blog updated successfully',
    data: updatedBlog,
  });
});

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
