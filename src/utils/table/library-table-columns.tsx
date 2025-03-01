"use client";

import TableCell from "@components/table-cell";
import { createColumnHelper } from "@tanstack/react-table";

export const libraryDefaultSortColumn: TableColumn = "author";

const columnHelper = createColumnHelper<TableRow>();

export const libraryTableColumns = [
  columnHelper.accessor("author", {
    header: "Author",
    cell: (cellData) => <TableCell cellData={cellData} />
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (cellData) => <TableCell cellData={cellData} />
  }),
  columnHelper.accessor("year", {
    header: "Year",
    cell: (cellData) => <TableCell cellData={cellData} />
  })
];
