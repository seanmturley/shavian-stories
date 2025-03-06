"use client";

import { type Header } from "@tanstack/react-table";

export default function ColumnHeaderSortable({
  columnHeading,
  header
}: {
  columnHeading: React.ReactElement;
  header: Header<TableRow, unknown>;
}) {
  const sortTitle =
    header.column.getNextSortingOrder() === "asc"
      ? "Sort ascending"
      : "Sort descending";

  let sortIcon: string | undefined;
  const sorting = header.column.getIsSorted();
  if (sorting === "asc") {
    sortIcon = "↑";
  } else if (sorting === "desc") {
    sortIcon = "↓";
  } else {
    // sortIcon = "↕";
    sortIcon = "";
  }

  return (
    <button onClick={header.column.getToggleSortingHandler()} title={sortTitle}>
      {columnHeading}
      <span>{sortIcon}</span>
    </button>
  );
}
