import { SyntheticEvent } from "react";

type Props = {
  onDeletePortfolio: (e: SyntheticEvent) => void;
  portfolioValue: string;
};

const DeletePortfolio = ({ onDeletePortfolio, portfolioValue }: Props) => {
  return (
    <form onSubmit={onDeletePortfolio}>
      <input type="text" value={portfolioValue} readOnly hidden />
      <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
        Delete
      </button>
    </form>
  );
};

export default DeletePortfolio;
