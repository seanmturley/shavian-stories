import metadata from "@library/metadata";
import getLibraryTableData from "@utils/library-table/get-library-table-data";

const libraryTableData = getLibraryTableData();

export default function Library() {
  console.log(libraryTableData);

  return (
    <section>
      <h1>Library</h1>

      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(metadata).map((authorKey, authorIndex) => {
            const author = metadata[authorKey];

            return Object.keys(author.stories).map((storyKey, storyIndex) => {
              const story = author.stories[storyKey];

              return (
                <tr key={`${authorIndex}${storyIndex}`}>
                  <td>{author.name.latin}</td>
                  <td>{story.title.latin}</td>
                  <td>{story.year}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </section>
  );
}
