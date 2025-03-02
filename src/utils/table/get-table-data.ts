export default function getTableData(metadata: Catalogue) {
  let tableData = [];

  for (const authorKey in metadata) {
    const author = metadata[authorKey];

    for (const storyKey in author.stories) {
      const story = author.stories[storyKey];

      const authorPath = `/library/${authorKey}`;
      const storyPath = authorPath + `/${storyKey}`;

      const tableRow: TableRow = {
        author: author.name.latin,
        authorPath,
        storyPath,
        title: story.title.latin,
        year: story.year
      };

      tableData.push(tableRow);
    }
  }

  return tableData;
}
