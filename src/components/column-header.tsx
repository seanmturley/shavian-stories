"use client";

import FacettedColumnHeader from "@components/column-header-facetted";
import SortableColumnHeader from "@components/column-header-sortable";
import { flexRender, type Header } from "@tanstack/react-table";
import styles from "./column-header.module.css";

export default function ColumnHeader({
  header
}: {
  header: Header<TableRow, unknown>;
}) {
  const columnHeading = (
    <span className={styles.columnHeading}>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </span>
  );

  const columnType = header.column.columnDef.meta?.columnType;

  if (columnType === "sortable") {
    return <SortableColumnHeader {...{ columnHeading, header }} />;
  }

  if (columnType === "facetted") {
    return <FacettedColumnHeader {...{ columnHeading, header }} />;
  }
}
