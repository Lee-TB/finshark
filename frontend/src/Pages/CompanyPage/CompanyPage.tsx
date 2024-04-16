import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { useEffect, useState } from "react";
import { getCompanyProfile } from "../../api";

interface Props {}

const CompanyPage = (props: Props) => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      if (typeof ticker !== "string") return;
      const result = await getCompanyProfile(ticker);
      if (result !== undefined) {
        console.log(result.data[0]);

        setCompany(result.data[0]);
      }
    };
    getProfileInit();
  }, []);

  return (
    <div>
      {company ? (
        <div>{company.companyName}</div>
      ) : (
        <div>Company not found!</div>
      )}
    </div>
  );
};

export default CompanyPage;
