"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<LibraryTableRow>();

const columns = [
  columnHelper.accessor("author", {
    header: "Author",
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor("year", {
    header: "Year",
    cell: (info) => info.getValue()
  })
];

export default function Table({ data }: { data: LibraryTableRow[] }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
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
