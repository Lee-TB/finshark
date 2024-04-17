import { CompanyKeyMetrics } from "../../company";
import RatioList from "../../Components/RatioList/RatioList";
import Table from "../../Components/Table/Table";
import { testIncomeStatementData } from "../../Components/Table/testData";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
];

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark design page</h1>
      <h2>
        This is FindShark's design page. This is where we well house various
        design aspects of the app
      </h2>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <Table />
    </>
  );
};

export default DesignPage;
