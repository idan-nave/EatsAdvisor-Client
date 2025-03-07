import React, { useState, useMemo } from 'react';
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

type MealRow = {
  meal: string;
  green: boolean;
  orange: boolean;
  red: boolean;
};

export default function MenuResultsTable() {
  const location = useLocation();
  const data: Record<string, MenuCategory> | null = location.state?.data;

  if (!data) {
    return <div>No results available</div>;
  }

  // Get all category names and set the initial active tab to the first one.
  const categoryNames = Object.keys(data);
  const [activeTab, setActiveTab] = useState<string>(categoryNames[0]);

  // Helper function to transform a MenuCategory object into meal rows.
  const createMealRows = (obj: MenuCategory): MealRow[] => {
    const mealMap = new Map<string, MealRow>();

    // Process green meals
    obj.green.forEach(meal => {
      mealMap.set(meal, { meal, green: true, orange: false, red: false });
    });

    // Process orange meals
    obj.orange.forEach(meal => {
      if (mealMap.has(meal)) {
        const existing = mealMap.get(meal)!;
        existing.orange = true;
      } else {
        mealMap.set(meal, { meal, green: false, orange: true, red: false });
      }
    });

    // Process red meals
    obj.red.forEach(meal => {
      if (mealMap.has(meal)) {
        const existing = mealMap.get(meal)!;
        existing.red = true;
      } else {
        mealMap.set(meal, { meal, green: false, orange: false, red: true });
      }
    });

    return Array.from(mealMap.values());
  };

  // Memoize the meal rows so that they are re-computed only when activeTab changes.
  const rows = useMemo(() => {
    const activeCategory = data[activeTab];
    return activeCategory ? createMealRows(activeCategory) : [];
  }, [activeTab, data]);

  // Define the table columns.
  const columns: ColumnDef<MealRow>[] = [
    {
      accessorKey: 'meal',
      header: 'Meal',
      cell: info => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'green',
      header: 'Green',
      cell: info =>
        info.getValue() ? (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#a5d46a',
              margin: '0 auto',
            }}
          />
        ) : null,
    },
    {
      accessorKey: 'orange',
      header: 'Orange',
      cell: info =>
        info.getValue() ? (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffc080',
              margin: '0 auto',
            }}
          />
        ) : null,
    },
    {
      accessorKey: 'red',
      header: 'Red',
      cell: info =>
        info.getValue() ? (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffa080',
              margin: '0 auto',
            }}
          />
        ) : null,
    },
  ];

  // Create the table using the meal rows and columns.
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="menu-results-container">
      {/* Tabs Navigation */}
      <div className="tabs-navigation">
        {categoryNames.map((name) => (
          <button
            key={name}
            className={`tab-button ${activeTab === name ? 'active' : ''}`}
            onClick={() => setActiveTab(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <div className="menu-table-section">
          <h2>{activeTab}</h2>
          <div className="table-responsive">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
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
      </div>
    </div>
  );
}
