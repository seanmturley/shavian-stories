"use client";

import Link from "next/link";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type GetTableColumns = {
  defaultSortColumn: TableColumn;
  tableColumns: ColumnDef<TableRow, any>[];
};

export default function getTableColumns(tableType: TableType): GetTableColumns {
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
    columnHelper.accessor("genre", {
      header: "Genre"
    }),
    columnHelper.accessor("year", {
      header: "Year"
    })
  ];

  return { defaultSortColumn, tableColumns };
}
