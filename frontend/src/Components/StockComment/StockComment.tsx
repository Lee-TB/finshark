import { toast } from "react-toastify";
import { postCommentAPI } from "../../Services/CommentService";
import StockCommentForm, {
  CommentFormInputs,
} from "./StockCommentForm/StockCommentForm";
import { SubmitHandler } from "react-hook-form";

type Props = {
  stockSymbol: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const handleComment: SubmitHandler<CommentFormInputs> = (formData) => {
    postCommentAPI(formData.title, formData.content, stockSymbol)
      .then((res) => {
        if (res) {
          toast.success("Comment was created");
        }
      })
      .catch((error) => {
        toast.warning(error);
      });
  };

  return (
    <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
  );
};

export default StockComment;
