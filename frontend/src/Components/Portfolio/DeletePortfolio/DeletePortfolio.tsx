import { SyntheticEvent } from "react";

type Props = {
  onDeletePortfolio: (e: SyntheticEvent) => void;
  symbol: string;
};

const DeletePortfolio = ({ onDeletePortfolio, symbol }: Props) => {
  return (
    <form onSubmit={onDeletePortfolio}>
      <input type="text" value={symbol} readOnly hidden />
      <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
        Delete
      </button>
    </form>
  );
};

export default DeletePortfolio;
