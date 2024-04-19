import axios from "axios";
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
} from "./company";

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

export const getKeyMetrics = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=5&apikey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getIncomeStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=5&apikey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=5&apikey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getCashflowStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=5&apikey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};

export const getTenK = async (query: string) => {
  try {
    const data = await axios.get<CompanyTenK[]>(
      `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-k&page=0&apikey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    return data;
  } catch (error: any) {
    console.log("error message from API: ", error.message);
  }
};
