"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState
} from "@tanstack/react-table";
import { getSortIcon, getSortTitle } from "@utils/table/sort";

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
  const [sorting, setSorting] = useState<SortingState>([
    { id: defaultSortColumn, desc: false }
  ]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    state: { sorting }
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                <button
                  onClick={header.column.getToggleSortingHandler()}
                  title={getSortTitle(header.column)}
                >
                  <span>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </span>
                  <span>{getSortIcon(header.column)}</span>
                </button>
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
  );
}
