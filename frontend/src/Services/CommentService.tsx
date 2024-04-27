import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
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

export const getCommentAPI = async (symbol: string) => {
  try {
    const res = await axios.get<CommentGet[]>(`${api}?symbol=${symbol}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};
