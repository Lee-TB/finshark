import { SyntheticEvent } from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";

interface Props {
  portfolioValue: string;
  onDeletePortfolio: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({ portfolioValue, onDeletePortfolio }: Props) => {
  return (
    <div>
      <h4>{portfolioValue}</h4>
      <DeletePortfolio
        onDeletePortfolio={onDeletePortfolio}
        portfolioValue={portfolioValue}
      />
    </div>
  );
};

export default CardPortfolio;
