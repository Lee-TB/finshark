import { testIncomeStatementData } from "./testData";

const data = testIncomeStatementData;

type Company = (typeof data)[0];

const configs = [
  {
    label: "Year",
    render: (company: Company) => company.acceptedDate,
  },
  {
    label: "Code of Revenue",
    render: (company: Company) => company.costOfRevenue,
  },
];

type Props = {};

const Table = (props: Props) => {
  const renderedRows = data.map((company) => {
    return (
      <tr key={company.cik}>
        {configs.map((config: any) => {
          return (
            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
              {config.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  const renderedHeader = configs.map((config: any) => (
    <th
      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      key={config.label}
    >
      {config.label}
    </th>
  ));

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide-gray-500 m-5">
          {renderedHeader}
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
