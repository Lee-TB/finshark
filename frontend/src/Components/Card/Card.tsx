import { SyntheticEvent } from "react";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import "./Card.css";

interface Props {
  companyResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card = ({ companyResult, onPortfolioCreate }: Props) => {
  return (
    <div className="card">
      <img src="https://placehold.co/200x200" alt={companyResult.symbol} />
      <div className="details">
        <h3 className="title">
          {companyResult.name} ({companyResult.symbol.toLowerCase()})
        </h3>
      </div>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={companyResult.symbol}
      />
    </div>
  );
};

export default Card;
