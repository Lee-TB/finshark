import { toast } from "react-toastify";
import { getCommentAPI, postCommentAPI } from "../../Services/CommentService";
import StockCommentForm, {
  CommentFormInputs,
} from "./StockCommentForm/StockCommentForm";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { CommentGet } from "../../Models/Comment";
import StockCommentList from "../StockCommentList/StockCommentList";
import Spinner from "../Spinner/Spinner";

type Props = {
  stockSymbol: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComments] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    getComments();
  }, [stockSymbol]);

  const handleComment: SubmitHandler<CommentFormInputs> = (formData) => {
    postCommentAPI(formData.title, formData.content, stockSymbol)
      .then((res) => {
        if (res) {
          toast.success("Comment was created");
          getComments();
        }
      })
      .catch((error) => {
        toast.warning(error);
      });
  };

  const getComments = () => {
    setLoading(true);
    getCommentAPI(stockSymbol).then((res) => {
      setComments(res?.data!);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold ml-4">Comments from users</h2>
      {loading ? (
        <Spinner />
      ) : (
        comments && <StockCommentList comments={comments} />
      )}
      <h2 className="text-lg font-bold ml-4">Post a new comment</h2>

      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
