import './index.scss';

interface TableHeaderRowProps {
  headers: string[];
}

const TableHeaderRow = ({ headers }: TableHeaderRowProps) => {
  return (
    <thead className="table-header">
      <tr>
        {headers.map((header, index) => (
          <th key={index}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaderRow;
