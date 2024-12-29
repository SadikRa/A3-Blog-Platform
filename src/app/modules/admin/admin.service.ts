import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';

///block user
const blockUser = async (id: string) => {
    const result = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true },
    );
  
    return result;
  };


//delete blog
const deleteBlog = async (blogId: string) => {
  const blog = await Blog.findByIdAndDelete(blogId);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  return blog;
};

export const adminService = {
  blockUser,
  deleteBlog,
};
