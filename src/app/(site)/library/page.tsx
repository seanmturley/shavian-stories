import Table from "@components/table";
import getLibraryTableData from "@utils/library-table/get-library-table-data";

const libraryTableData = getLibraryTableData();

export default function Library() {
  return (
    <section>
      <header>
        <h1>Library</h1>
      </header>
      <Table data={libraryTableData} />
    </section>
  );
}
