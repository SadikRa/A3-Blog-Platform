import { Request, Response } from 'express';
import { IBlog } from './blog.interface';
import { blogService } from './blog.service';
import { StatusCodes } from 'http-status-codes';

const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;  // Destructure from req.body

    // Basic validation
    if (!title || !content || !author) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Title, content, and author are required',
      });
    }

    const blogData: IBlog = {
      title,
      content,
      author,
      isPublished: true, // Default to published
    };

    const result = await blogService.createBlogIntoDB(blogData);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Blog created successfully',
      data: result,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, isPublished } = req.body;

    if (!title && !content && isPublished === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'At least one of title, content, or isPublished must be provided',
      });
    }

    const updateData: Partial<IBlog> = {
      title,
      content,
      isPublished,
    };

    const updatedBlog = await blogService.updateBlogIntoDB(id, updateData);

    if (!updatedBlog) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedBlog = await blogService.deleteBlogFromDB(id);

    if (!deletedBlog) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getAllBlog = async (req: Request, res: Response) => {
  try {
    const result = await blogService.getAllBlogFromDB(req.query);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blogs fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
};
