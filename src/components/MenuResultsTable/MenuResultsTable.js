import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactTable, getCoreRowModel, flexRender, } from '@tanstack/react-table';
import './menu-results-table.css';
export default function MenuResultsTable() {
    var _a;
    var location = useLocation();
    var data = (_a = location.state) === null || _a === void 0 ? void 0 : _a.data;
    if (!data) {
        return _jsx("div", { children: "No results available" });
    }
    var formatLabel = function (label) { return label.replace(/_/g, ' '); };
    var categoryNames = Object.keys(data);
    var _b = useState(categoryNames[0]), activeTab = _b[0], setActiveTab = _b[1];
    var createMealRows = function (obj) {
        var mealMap = new Map();
        obj.green.forEach(function (meal) {
            mealMap.set(meal, { meal: meal, green: true, orange: false, red: false });
        });
        obj.orange.forEach(function (meal) {
            if (mealMap.has(meal)) {
                var existing = mealMap.get(meal);
                existing.orange = true;
            }
            else {
                mealMap.set(meal, { meal: meal, green: false, orange: true, red: false });
            }
        });
        obj.red.forEach(function (meal) {
            if (mealMap.has(meal)) {
                var existing = mealMap.get(meal);
                existing.red = true;
            }
            else {
                mealMap.set(meal, { meal: meal, green: false, orange: false, red: true });
            }
        });
        return Array.from(mealMap.values());
    };
    var rows = useMemo(function () {
        var activeCategory = data[activeTab];
        return activeCategory ? createMealRows(activeCategory) : [];
    }, [activeTab, data]);
    var columns = [
        {
            accessorKey: 'meal',
            header: 'Meal',
            cell: function (info) { return _jsx("span", { children: formatLabel(info.getValue()) }); },
        },
        {
            accessorKey: 'green',
            header: ' Green',
            cell: function (info) {
                return info.getValue() ? (_jsx("div", { style: {
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#a5d46a',
                        margin: '0 auto',
                        border: '2px solid black',
                    } })) : null;
            },
        },
        {
            accessorKey: 'orange',
            header: 'Orange',
            cell: function (info) {
                return info.getValue() ? (_jsx("div", { style: {
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#ffc080',
                        margin: '0 auto',
                        border: '2px solid black',
                    } })) : null;
            },
        },
        {
            accessorKey: 'red',
            header: 'Red',
            cell: function (info) {
                return info.getValue() ? (_jsx("div", { style: {
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#ffa080',
                        margin: '0 auto',
                        border: '2px solid black',
                    } })) : null;
            },
        },
    ];
    var table = useReactTable({
        data: rows,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (_jsxs("div", { className: "menu-results-container", children: [_jsx("div", { className: "tabs-navigation", children: categoryNames.map(function (name) { return (_jsx("button", { className: "tab-button ".concat(activeTab === name ? 'active' : ''), onClick: function () { return setActiveTab(name); }, children: formatLabel(name) }, name)); }) }), _jsx("div", { className: "tab-content", children: _jsx("div", { className: "menu-table-section", children: _jsx("div", { className: "table-responsive", children: _jsxs("table", { children: [_jsx("thead", { children: table.getHeaderGroups().map(function (headerGroup) { return (_jsx("tr", { children: headerGroup.headers.map(function (header) { return (_jsx("th", { children: header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext()) }, header.id)); }) }, headerGroup.id)); }) }), _jsx("tbody", { children: table.getRowModel().rows.map(function (row) { return (_jsx("tr", { children: row.getVisibleCells().map(function (cell) { return (_jsx("td", { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)); }) }, row.id)); }) })] }) }) }) })] }));
}
