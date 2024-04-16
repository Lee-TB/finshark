import { SyntheticEvent } from "react";
import { CompanySearch } from "../../company";
import Card from "../Card/Card";

interface Props {
  searchData?: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

export default function CardList({ searchData, onPortfolioCreate }: Props) {
  return (
    <div>
      {searchData && searchData.length > 0 ? (
        searchData.map((row) => (
          <Card
            key={row.symbol}
            onPortfolioCreate={onPortfolioCreate}
            companyResult={row}
          />
        ))
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No content
        </p>
      )}
    </div>
  );
}
