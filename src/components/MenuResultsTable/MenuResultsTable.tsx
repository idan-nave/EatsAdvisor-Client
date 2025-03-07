import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import './menu-results-table.css';

type MenuCategory = {
  green: string[];
  orange: string[];
  red: string[];
};

type RowData = {
  green: string;
  orange: string;
  red: string;
};

export default function MenuResultsTable() {
  // Expecting the data to be passed via location state
  const location = useLocation();
  const data: Record<string, MenuCategory> | null = location.state?.data;

  if (!data) {
    return <div>No results available</div>;
  }

  // Define the columns with pastel backgrounds
  const columns: ColumnDef<RowData>[] = [
    {
      accessorKey: 'green',
      header: 'Green',
      cell: info => (
        <div style={{ backgroundColor: 'palegreen', padding: '8px' }}>
          {info.getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: 'orange',
      header: 'Orange',
      cell: info => (
        <div style={{ backgroundColor: 'peachpuff', padding: '8px' }}>
          {info.getValue() as string}
        </div>
      ),
    },
    {
      accessorKey: 'red',
      header: 'Red',
      cell: info => (
        <div style={{ backgroundColor: 'mistyrose', padding: '8px' }}>
          {info.getValue() as string}
        </div>
      ),
    },
  ];

  // Helper function to transform a MenuCategory object into rows.
  // Creates one row per index up to the maximum length of the three arrays.
  const createRows = (obj: MenuCategory): RowData[] => {
    const maxRows = Math.max(obj.green.length, obj.orange.length, obj.red.length);
    const rows: RowData[] = [];
    for (let i = 0; i < maxRows; i++) {
      rows.push({
        green: obj.green[i] || '',
        orange: obj.orange[i] || '',
        red: obj.red[i] || '',
      });
    }
    return rows;
  };

  return (
    <div className="menu-results-table">
      {Object.entries(data).map(([name, categoryItems], idx) => {
        // Create rows for the current menu category
        const rows = createRows(categoryItems);
        const table = useReactTable({
          data: rows,
          columns,
          getCoreRowModel: getCoreRowModel(),
        });

        return (
          <div key={idx} className="menu-table-section">
            <h2>{name}</h2>
            <div className="table-responsive">
              <table>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
