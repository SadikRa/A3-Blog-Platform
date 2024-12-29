import { StatusCodes } from 'http-status-codes';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

//create blog
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBlogIntoDB = async (user: any, payload: IBlog) => {
  if (user.role !== 'user') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Only users can create blogs');
  }

  payload.author = user.userId;
  const result = await Blog.create(payload);

  return result.populate('author');
};

//update blog
const updateBlogIntoDB = async (
  userID: string,
  blogID: string,
  data: Partial<IBlog>,
) => {

  const user = await User.findById(userID).select('-password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const blog = await Blog.findById(blogID);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  if (blog.author.toString() !== userID.toString()) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogID, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update the blog',
    );
  }

  return updatedBlog;
};

// Delete a blog from the database
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

// const getAllBlogFromDB = async (query: Record<string, unknown>) => {
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const getAllBlogFromDB = async (query: unknown) => {
  // const { search, sortBy = 'createdAt', sortOrder = 'asc', filter } = query;

  // const filterQuery: Record<string, unknown> = {};

  // if (search) {
  //   filterQuery.$or = [
  //     { title: { $regex: search, $options: 'i' } },  // Case-insensitive search for title
  //     { content: { $regex: search, $options: 'i' } }  // Case-insensitive search for content
  //   ];
  // }

  // if (filter) {
  //   filterQuery.author = filter;  // Filter by author
  // }

  // const sortQuery: Record<string, unknown> = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };  // Sort by specified field

  // const blogs = await Blog.find(filterQuery).sort(sortQuery);
  const blogs = await Blog.find();
  return blogs;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogFromDB,
};
