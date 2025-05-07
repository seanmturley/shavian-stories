"use client";

import AuthorBio from "@components/author-bio";
import Table from "@components/table";
import metadata from "@library/metadata";
import getTableColumns from "@utils/table/get-table-columns";
import getTableData from "@utils/table/get-table-data";
import styles from "./catalogue.module.css";

export default function Catalogue({ authorName }: { authorName?: string }) {
  let heading: string;
  let tableMetadata: Catalogue;
  let tableType: TableType;

  if (authorName) {
    heading = metadata[authorName].name.latin;
    tableMetadata = { [authorName]: metadata[authorName] };
    tableType = "author";
  } else {
    heading = "Library";
    tableMetadata = metadata;
    tableType = "library";
  }

  const { defaultSortColumn, tableColumns } = getTableColumns(tableType);
  const tableData = getTableData(tableMetadata);

  return (
    <section className={styles.catalogue}>
      <header>
        <h1>{heading}</h1>
        {authorName && <AuthorBio authorName={authorName} />}
      </header>
      <Table
        columns={tableColumns}
        data={tableData}
        defaultSortColumn={defaultSortColumn}
      />
    </section>
  );
}
