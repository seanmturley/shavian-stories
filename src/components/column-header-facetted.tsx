"use client";

import { useMemo } from "react";
import { type Header } from "@tanstack/react-table";
import styles from "./column-header-facetted.module.css";

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
        className={styles.dropDown}
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
