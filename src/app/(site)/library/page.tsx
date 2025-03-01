"use client";

import Table from "@components/table";
import metadata from "@library/metadata";
import getTableData from "@utils/table/get-table-data";
import getTableColumns from "@utils/table/get-table-columns";

export default function Library() {
  const [libraryDefaultSortColumn, libraryTableColumns] =
    getTableColumns("library");
  const libraryTableData = getTableData(metadata);

  return (
    <section>
      <header>
        <h1>Library</h1>
      </header>
      <Table
        columns={libraryTableColumns}
        data={libraryTableData}
        defaultSortColumn={libraryDefaultSortColumn}
      />
    </section>
  );
}
