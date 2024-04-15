import { ChangeEvent, SyntheticEvent, useState } from "react";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./company";
import { searchCompanies, type SearchResponse } from "./api";

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<CompanySearch[]>();
  const [serverError, setServerError] = useState<string>();

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

  const handleCreatePortfolio = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("create pofol");
  };

  return (
    <>
      <Search
        onSubmit={handleSearchClick}
        onChange={handleSearchChange}
        search={search}
      />
      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchData={searchData}
        onPortfolioCreate={handleCreatePortfolio}
      />
    </>
  );
}

export default App;
