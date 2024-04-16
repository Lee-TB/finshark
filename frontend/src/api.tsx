import axios from "axios";
import { CompanyProfile, CompanySearch } from "./company";

export interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const result = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&apikey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    return result;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error message: ", error.message);
      return error.message;
    } else {
      console.log("Unexpected error: ", error.message);
      return error.message;
    }
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};
