import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { useEffect, useState } from "react";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";

interface Props {}

const CompanyPage = (props: Props) => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      if (typeof ticker !== "string") return;
      const result = await getCompanyProfile(ticker);
      if (result !== undefined) {
        setCompany(result.data[0]);
      }
    };
    getProfileInit();
  }, []);

  return (
    <div>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subtitle={company.companyName} />
          </CompanyDashboard>
        </div>
      ) : (
        <div>Company not found!</div>
      )}
    </div>
  );
};

export default CompanyPage;
