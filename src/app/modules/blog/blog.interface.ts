import { ObjectId } from "mongoose";

export interface IBlog {
  title: string; 
  content: string; 
  author: ObjectId;
  isPublished: boolean; 
}
