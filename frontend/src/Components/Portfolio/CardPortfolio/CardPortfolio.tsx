import { SyntheticEvent } from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Link } from "react-router-dom";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioItem: PortfolioGet;
  onDeletePortfolio: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({ portfolioItem, onDeletePortfolio }: Props) => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <Link
        to={`/company/${portfolioItem.symbol}/company-profile`}
        className="pt-6 text-xl font-bold"
      >
        {portfolioItem.symbol}
      </Link>
      <DeletePortfolio
        symbol={portfolioItem.symbol}
        onDeletePortfolio={onDeletePortfolio}
      />
    </div>
  );
};

export default CardPortfolio;
