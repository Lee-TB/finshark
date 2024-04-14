import { ChangeEvent, SyntheticEvent, useState } from "react";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";

function App() {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchClick = (e: SyntheticEvent) => {
    console.log(e);
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
