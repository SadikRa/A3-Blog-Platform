import { StatusCodes } from 'http-status-codes';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errors/AppError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBlogIntoDB = async (user: any, payload: IBlog) => {
  if (user.role !== 'user') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Only users can create blogs');
  }

  payload.author = user.userId; // Attach userId to the author field
  const result = await Blog.create(payload);

  return result.populate('author'); // Populate the author details
};

const updateBlogIntoDB = async (id: string, payload: Partial<IBlog>) => {
  const updateBlogInfo = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }); // 'new: true' returns the updated document

  return updateBlogInfo;
};

// Delete a blog from the database
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

// Get all blogs with optional query parameters for searching, sorting, and filtering

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
