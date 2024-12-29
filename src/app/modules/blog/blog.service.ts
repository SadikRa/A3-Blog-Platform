import { StatusCodes } from 'http-status-codes';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogSearchableFields, filterableFields } from './blog.constant';

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
const updateBlogIntoDB = async (blogID: string, data: Partial<IBlog>) => {
  const blog = await Blog.findById(blogID);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
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
const deleteBlogFromDB = async (blogId: string) => {
  const blog = await Blog.findById(blogId).populate('author');

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  await Blog.findByIdAndDelete(blogId);

  return { success: true };
};

///get all blog
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(blogSearchableFields)
    .sort()
    .filter(filterableFields);

  const result = await blogQuery.queryResult;
  return result;
};

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogFromDB,
};
