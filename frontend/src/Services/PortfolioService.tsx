import axios from "axios";
import {
  PortfolioDelete,
  PortfolioGet,
  PortfolioPost,
} from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5001/api/portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const res = await axios.post<PortfolioPost>(api + `?symbol=${symbol}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const res = await axios.delete<PortfolioDelete>(api + `?symbol=${symbol}`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  try {
    const res = await axios.get<PortfolioGet[]>(api);
    return res;
  } catch (error) {
    handleError(error);
  }
};
