import metadata from "@library/metadata";

export default function getLibraryTableData(): LibraryTableRow[] {
  let libraryTableData = [];

  for (const authorKey in metadata) {
    const author = metadata[authorKey];

    for (const storyKey in author.stories) {
      const story = author.stories[storyKey];

      const libraryTableRow: LibraryTableRow = {
        author: author.name.latin,
        title: story.title.latin,
        year: story.year
      };

      libraryTableData.push(libraryTableRow);
    }
  }

  return libraryTableData;
}
