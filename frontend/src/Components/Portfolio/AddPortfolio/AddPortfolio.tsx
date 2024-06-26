import { SyntheticEvent } from "react";

interface Props {
  onPortfolioCreate: (e: SyntheticEvent) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioCreate, symbol }: Props) => {
  return (
    <form onSubmit={onPortfolioCreate}>
      <input value={symbol} hidden readOnly />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddPortfolio;
