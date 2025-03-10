"use client";

import Link from "next/link";
import StoryLink from "@components/story-link";
import { ColumnDef, createColumnHelper, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    columnType?: "facetted" | "sortable";
  }
}

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
            ),
            meta: { columnType: "sortable" }
          })
        ]
      : []),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (cellData) => (
        <StoryLink href={cellData.row.original.storyPath}>
          {cellData.getValue()}
        </StoryLink>
      ),
      meta: { columnType: "sortable" }
    }),
    columnHelper.accessor("genre", {
      header: "Genre",
      cell: (cellData) => (
        <button
          onClick={() => {
            const cellValue = cellData.getValue();

            cellData.column.setFilterValue(
              cellData.column.getFilterValue() === cellValue
                ? undefined
                : cellValue
            );
          }}
        >
          {cellData.getValue()}
        </button>
      ),
      meta: { columnType: "facetted" }
    }),
    columnHelper.accessor("year", {
      header: "Year",
      meta: { columnType: "sortable" }
    })
  ];

  return { defaultSortColumn, tableColumns };
}
