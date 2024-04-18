type Props = {
  config: any;
  data: any;
};

const Table = ({ config, data }: Props) => {
  const renderedHeader = config.map((config: any) => (
    <th
      key={config.label}
      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {config.label}
    </th>
  ));

  const renderedRows = data.map((company: any) => {
    return (
      <tr key={company.cik}>
        {config.map((val: any) => {
          return (
            <td
              key={val.render(company)}
              className="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
            >
              {val.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

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
