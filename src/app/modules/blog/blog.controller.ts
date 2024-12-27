import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createBlog = catchAsync(async (req, res) => {
  const { title, content, author } = req.body;

  // Basic validation
  if (!title || !content || !author) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Title, content, and author are required',
      data: null,
    });
  }

  const blogData = { title, content, author, isPublished: true };
  const result = await blogService.createBlogIntoDB(blogData);

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
