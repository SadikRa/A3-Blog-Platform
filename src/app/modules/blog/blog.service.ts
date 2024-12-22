import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

// Create a new blog in the database
const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload); // Add 'await' for async operation
  return result;
};

// Update an existing blog in the database
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
const getAllBlogFromDB = async () => {
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

// Delete a blog as an admin
const deleteBlogAdminFromDB = async (id: string) => {
  const deleteBlog = await Blog.findByIdAndDelete(id);
  if (!deleteBlog) {
    throw new Error('Blog not found');
  }
  return deleteBlog;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogFromDB,
  deleteBlogAdminFromDB,
};
