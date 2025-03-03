"use client";

import { useMemo } from "react";
import { type Header } from "@tanstack/react-table";

export default function ColumnHeaderFacetted({
  columnHeading,
  header
}: {
  columnHeading: React.ReactElement;
  header: Header<TableRow, unknown>;
}) {
  const columnFilterValue = header.column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () => Array.from(header.column.getFacetedUniqueValues().keys()).sort(),
    [header.column.getFacetedUniqueValues()]
  );

  return (
    <>
      {columnHeading}
      <select
        onChange={(e) => header.column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        <option value="">all</option>
        {sortedUniqueValues.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
