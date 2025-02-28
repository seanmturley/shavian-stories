import metadata from "@library/metadata";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<TableRow>();

export const libraryTableColumns = [
  columnHelper.accessor("author", {
    header: "Author"
  }),
  columnHelper.accessor("title", {
    header: "Title"
  }),
  columnHelper.accessor("year", {
    header: "Year"
  })
];

const getLibraryTableData = () => {
  let libraryTableData = [];

  for (const authorKey in metadata) {
    const author = metadata[authorKey];

    for (const storyKey in author.stories) {
      const story = author.stories[storyKey];

      const libraryTableRow: TableRow = {
        author: author.name.latin,
        title: story.title.latin,
        year: story.year
      };

      libraryTableData.push(libraryTableRow);
    }
  }

  return libraryTableData;
};

export const libraryTableData = getLibraryTableData();

export const libraryDefaultSortColumn: TableColumn = "author";
