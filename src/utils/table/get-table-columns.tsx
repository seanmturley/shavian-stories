"use client";

import Link from "next/link";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export default function getTableColumns(
  tableType: "library" | "author"
): [TableColumn, ColumnDef<TableRow, any>[]] {
  const defaultSortColumn = tableType === "library" ? "author" : "title";

  const columnHelper = createColumnHelper<TableRow>();

  const tableColumns = [
    ...(tableType === "library"
      ? [
          columnHelper.accessor("author", {
            header: "Author",
            cell: (cellData) => (
              <Link href={cellData.row.original.authorPath}>
                {cellData.getValue()}
              </Link>
            )
          })
        ]
      : []),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (cellData) => (
        <Link href={cellData.row.original.storyPath}>
          {cellData.getValue()}
        </Link>
      )
    }),
    columnHelper.accessor("year", {
      header: "Year"
    })
  ];

  return [defaultSortColumn, tableColumns];
}
