"use client";

import Table from "@components/table";
import metadata from "@library/metadata";
import getTableColumns from "@utils/table/get-table-columns";
import getTableData from "@utils/table/get-table-data";

export default function AuthorCatalogue({ author }: { author: string }) {
  const authorMetadata = metadata[author];

  const [authorDefaultSortColumn, authorTableColumns] =
    getTableColumns("author");
  const authorTableData = getTableData({ [author]: authorMetadata });

  return (
    <section>
      <header>
        <h1>{authorMetadata.name.latin}</h1>
      </header>
      <Table
        columns={authorTableColumns}
        data={authorTableData}
        defaultSortColumn={authorDefaultSortColumn}
      />
    </section>
  );
}
