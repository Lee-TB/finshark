import axios from "axios";
import { CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5001/api/comment";

export const postCommentAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const res = await axios.post<CommentPost>(`${api}/${symbol}`, {
      title,
      content,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};
