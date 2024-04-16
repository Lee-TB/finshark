import { SyntheticEvent } from "react";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import "./Card.css";
import { Link } from "react-router-dom";

interface Props {
  companyResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card = ({ companyResult, onPortfolioCreate }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={companyResult.symbol}
    >
      <Link
        to={`/company/${companyResult.symbol}`}
        className="font-bold text-center text-black md:text-left"
      >
        {companyResult.name} ({companyResult.symbol})
      </Link>
      <p className="text-black">{companyResult.currency}</p>
      <p className="font-bold text-black">
        {companyResult.exchangeShortName} - {companyResult.stockExchange}
      </p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={companyResult.symbol}
      />
    </div>
  );
};

export default Card;
