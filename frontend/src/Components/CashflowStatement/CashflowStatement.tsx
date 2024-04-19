import { useOutletContext } from "react-router";
import { CompanyCashFlow } from "../../company";
import { useEffect, useState } from "react";
import { getCashflowStatement } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedForInvestingActivites,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedProvidedByFinancingActivities,
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) => company.cashAtEndOfPeriod,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) => company.commonStockIssued,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
  },
];

type Props = {};

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashflowData, setCashflowData] = useState<CompanyCashFlow[]>();

  useEffect(() => {
    const getData = async () => {
      const result = await getCashflowStatement(ticker);
      setCashflowData(result?.data);
    };
    getData();
  }, []);

  return (
    <div>
      {cashflowData ? (
        <Table config={config} data={cashflowData} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CashflowStatement;
