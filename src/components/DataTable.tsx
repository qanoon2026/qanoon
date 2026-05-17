'use client';

interface DataTableProps {
  headers: string[];
  rows: any[];
  renderRow: (row: any, index: number) => React.ReactNode;
}

export function DataTable({ headers, rows, renderRow }: DataTableProps) {
  return (
    <div className="card-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="table-head">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-right text-sm font-semibold text-slate-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, idx) => (
                <tr key={idx} className="table-row">
                  {renderRow(row, idx)}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center">
                  <div className="text-slate-500">
                    <p className="font-medium">لا توجد بيانات</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
