import { useEffect, useState } from "react";
import { CompanyTenK } from "../../company";
import { getTenK } from "../../api";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";

type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[]>();

  useEffect(() => {
    const getTenKData = async () => {
      const result = await getTenK(ticker);
      setCompanyData(result?.data);
    };
    getTenKData();
  }, []);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4 gap-2">
      {companyData ? (
        companyData
          ?.slice(0, 5)
          .map((tenK) => <TenKFinderItem key={tenK.fillingDate} tenK={tenK} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;
