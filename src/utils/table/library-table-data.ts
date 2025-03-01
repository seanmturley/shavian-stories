import metadata from "@library/metadata";

const getLibraryTableData = () => {
  let libraryTableData = [];

  for (const authorKey in metadata) {
    const author = metadata[authorKey];

    for (const storyKey in author.stories) {
      const story = author.stories[storyKey];

      const libraryTableRow: TableRow = {
        author: author.name.latin,
        path: `/${authorKey}/${storyKey}`,
        title: story.title.latin,
        year: story.year
      };

      libraryTableData.push(libraryTableRow);
    }
  }

  return libraryTableData;
};

export const libraryTableData = getLibraryTableData();
