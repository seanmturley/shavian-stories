import parse from "html-react-parser";
import Bookmark from "@components/bookmark";
import generateStoryHtml from "@utils/format-story/generate-story-html";

export default async function StoryText({
  author,
  story
}: {
  author: string;
  story: string;
}) {
  const { latin } = await import(`@library/${author}/${story}/latin`);
  const { shavian } = await import(`@library/${author}/${story}/shavian`);

  const storyHtml = generateStoryHtml(latin, shavian);

  return (
    <>
      {storyHtml.map((section, sectionNumber) => {
        return (
          <section key={sectionNumber}>
            {section.map((line, lineNumber) => {
              return (
                <Bookmark
                  key={lineNumber}
                  author={author}
                  story={story}
                  sectionNumber={sectionNumber}
                  lineNumber={lineNumber}
                >
                  {parse(line)}
                </Bookmark>
              );
            })}
          </section>
        );
      })}
    </>
  );
}
