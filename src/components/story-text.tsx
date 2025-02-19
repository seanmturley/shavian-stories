"use client";

import parse from "html-react-parser";
import { useRef } from "react";
import useLocalStorage from "use-local-storage";
import Bookmark from "@components/bookmark";
import generateStoryHtml from "@utils/format-story/generate-story-html";

export default function StoryText({
  latin,
  shavian,
  author,
  story
}: {
  latin: string;
  shavian: string;
  author: string;
  story: string;
}) {
  const [bookmark, setBookmark] = useLocalStorage(`${author}/${story}`, "");
  const bookmarkRef = useRef<BookmarkRef>({});

  const handleScrollToClick = () => {
    if (bookmarkRef.current?.[bookmark]) {
      bookmarkRef.current[bookmark].scrollIntoView({
        behavior: "smooth",
        block: "center" // Doesn't work if the paragraph is taller than the screen
      });
    }
  };

  const storyHtml = generateStoryHtml(latin, shavian);

  return (
    <>
      <button onClick={handleScrollToClick}>Go to bookmark</button>
      {storyHtml.map((section, sectionNumber) => {
        return (
          <section key={sectionNumber}>
            {section.map((line, lineNumber) => {
              return (
                <Bookmark
                  key={lineNumber}
                  {...{
                    bookmark,
                    setBookmark,
                    bookmarkRef,
                    sectionNumber,
                    lineNumber
                  }}
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
