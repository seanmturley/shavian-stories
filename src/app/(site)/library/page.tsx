import Table from "@components/table";
import { libraryTableData } from "@utils/table/library-table-data";
import {
  libraryDefaultSortColumn,
  libraryTableColumns
} from "@utils/table/library-table-columns";

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
