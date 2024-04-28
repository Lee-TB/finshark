import { SyntheticEvent } from "react";
import CardPortfolio from "../CardPortfolio/CardPortfolio";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioItems: PortfolioGet[];
  onDeletePortfolio: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioItems, onDeletePortfolio }: Props) => {
  return (
    <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My Portfolio
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {portfolioItems.length > 0 ? (
            portfolioItems.map((portfolioItem) => {
              return (
                <CardPortfolio
                  key={portfolioItem.symbol}
                  portfolioItem={portfolioItem}
                  onDeletePortfolio={onDeletePortfolio}
                />
              );
            })
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              Your portfolio is empty.
            </h3>
          )}
        </>
      </div>
    </section>
  );
};

export default ListPortfolio;
