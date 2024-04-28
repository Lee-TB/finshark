import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { CompanySearch } from "../../company";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { PortfolioGet } from "../../Models/Portfolio";
import { toast } from "react-toastify";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioGet[]>([]);

  useEffect(() => {
    getPortfolio();
  }, []);

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
    const symbol = e.target[0].value;
    console.log(symbol);

    portfolioAddAPI(symbol)
      .then((res) => {
        if (res?.status === 204) {
          toast.success("Stock is added to portfolio");
          getPortfolio();
        }
      })
      .catch((error) => {
        toast.warning("Add failed!");
      });
  };

  const handleDeletePortfolio = (e: any) => {
    e.preventDefault();
    const symbol = e.target[0].value;
    portfolioDeleteAPI(symbol)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Stock was deleted from portfolio");
          getPortfolio();
        }
      })
      .catch((error) => {
        toast.warning("Delete failed!");
      });
  };

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioItems(res?.data);
        }
      })
      .catch((error) => {
        toast.warning("Couldn't get portfolios");
      });
  };

  return (
    <div>
      <Search
        onSubmit={handleSearchClick}
        onChange={handleSearchChange}
        search={search}
      />
      <ListPortfolio
        portfolioItems={portfolioItems}
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
