import Table from "@components/table";
import {
  libraryTableColumns,
  libraryTableData,
  libraryDefaultSortColumn
} from "@utils/table/library-table";

export default function Library() {
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
