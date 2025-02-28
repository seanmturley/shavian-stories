import { Column } from "@tanstack/react-table";

export const getSortTitle = (column: Column<TableRow, unknown>) => {
  if (column.getCanSort()) {
    return column.getNextSortingOrder() === "asc"
      ? "Sort ascending"
      : "Sort descending";
  }

  return undefined;
};

export const getSortIcon = (column: Column<TableRow, unknown>) => {
  const sorting = column.getIsSorted();

  if (!sorting) return;

  if (sorting === "asc") return " 🔼";
  if (sorting === "desc") return " 🔽";
};
