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
      <h2>List</h2>
      {searchData && searchData.length > 0 ? (
        searchData.map((row) => (
          <Card
            key={row.symbol}
            onPortfolioCreate={onPortfolioCreate}
            companyResult={row}
          />
        ))
      ) : (
        <h2>No content</h2>
      )}
    </div>
  );
}
