import React from "react";

type TableProps<T> = {
  columns: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactElement;
};

function Table<T>({
  columns,
  data,
  renderRow,
}: TableProps<T>): React.ReactElement {
  return (
    <div className="overflow-x-auto rounded-md shadow-sm border-b-4 border-gray-200 mt-4">
      <div className="min-w-[1600px]">
        <table className="w-full border-collapse table-fixed text-base border border-gray-300">
          <colgroup>
            {columns.map((_, i) => (
              <col key={i} style={{ width: `${100 / columns.length}%` }} />
            ))}
          </colgroup>

          <thead>
            <tr
              className="bg-black text-white text-left"
              style={{ height: "60px" }}
            >
              {columns.map((heading, i) => (
                <th
                  key={i}
                  className="px-4 py-4 font-normal text-sm whitespace-normal break-words border border-gray-300"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-transparent text-gray-900">
            {data.length > 0 ? (
              data.map((item, index) =>
                React.cloneElement(renderRow(item, index), {
                  // Add classes to all td inside the rendered row for wrapping
                  className: "break-words whitespace-normal overflow-hidden",
                })
              )
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
