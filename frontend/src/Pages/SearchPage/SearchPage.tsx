import { ChangeEvent, SyntheticEvent, useState } from "react";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { CompanySearch } from "../../company";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);

    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchData(result.data);
    }
  };

  const handleCreatePortfolio = async (e: any) => {
    e.preventDefault();
    const isExists = portfolioValues.find(
      (value) => value === e.target[0].value
    );
    if (isExists) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };

  const handleDeletePortfolio = (e: any) => {
    e.preventDefault();
    const portfolioAfterRemove = portfolioValues.filter(
      (portfolioValue) => portfolioValue !== e.target[0].value
    );
    setPortfolioValues(portfolioAfterRemove);
  };
  return (
    <div>
      <Search
        onSubmit={handleSearchClick}
        onChange={handleSearchChange}
        search={search}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onDeletePortfolio={handleDeletePortfolio}
      />
      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchData={searchData}
        onPortfolioCreate={handleCreatePortfolio}
      />
    </div>
  );
};

export default SearchPage;
