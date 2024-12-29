import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

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
  const payload = req.body;

  const updatedBlog = await blogService.updateBlogIntoDB(id, payload);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog updated successfully',
    data: updatedBlog,
  });
});

//delete blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id: blogId } = req.params;

  await blogService.deleteBlogFromDB(blogId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: null,
  });
});

//get all data blog
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogFromDB(req.query);

  res.status(200).json({
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
