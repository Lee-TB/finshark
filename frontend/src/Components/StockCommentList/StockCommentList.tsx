import { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <>
      {comments &&
        comments.map((comment) => {
          return <StockCommentListItem key={comment.id} comment={comment} />;
        })}
    </>
  );
};

export default StockCommentList;
