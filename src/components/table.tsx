"use client";

import { useState } from "react";
import ColumnHeader from "@components/column-header";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState
} from "@tanstack/react-table";
import styles from "./table.module.css";

type TableProps = {
  columns: ColumnDef<TableRow, any>[];
  data: TableRow[];
  defaultSortColumn: TableColumn;
};

export default function Table({
  columns,
  data,
  defaultSortColumn
}: TableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: defaultSortColumn, desc: false }
  ]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: { columnFilters, globalFilter, sorting }
  });

  return (
    <div className={styles.tableContainer}>
      <input
        className={styles.search}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        value={globalFilter}
      />
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles[header.column.id]}>
                  <ColumnHeader header={header} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tableBody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tableRow}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles[cell.column.id]}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
