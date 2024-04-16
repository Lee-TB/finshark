import { SyntheticEvent } from "react";
import CardPortfolio from "../CardPortfolio/CardPortfolio";

interface Props {
  portfolioValues: string[];
  onDeletePortfolio: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioValues, onDeletePortfolio }: Props) => {
  return (
    <div>
      <h2>My Portfolio</h2>
      <ul>
        {portfolioValues &&
          portfolioValues.map((portfolioValue) => (
            <CardPortfolio
              portfolioValue={portfolioValue}
              onDeletePortfolio={onDeletePortfolio}
            />
          ))}
      </ul>
    </div>
  );
};

export default ListPortfolio;
