"use client";

import Table from "@components/table";
import metadata from "@library/metadata";
import getTableColumns from "@utils/table/get-table-columns";
import getTableData from "@utils/table/get-table-data";

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
    <section>
      <header>
        <h1>{heading}</h1>
      </header>
      <p></p>
      <Table
        columns={tableColumns}
        data={tableData}
        defaultSortColumn={defaultSortColumn}
      />
    </section>
  );
}
