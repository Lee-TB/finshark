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

  const handleSearchClick = async () => {
    const result = await searchCompanies(search);
    console.log(result.data);

    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchData(result.data);
    }
  };

  return (
    <>
      <Search
        onClick={handleSearchClick}
        onChange={handleSearchChange}
        search={search}
      />
      <CardList />
    </>
  );
}

export default App;
