"use client";

import parse from "html-react-parser";
import { useRef } from "react";
import useLocalStorage from "use-local-storage";
import Bookmark from "@components/bookmark";
import ScrollToBookmark from "@components/scroll-to-bookmark";
import generateStoryHtml from "@utils/format-story/generate-story-html";

export default function StoryBody({
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

  const storyHtml = generateStoryHtml(latin, shavian);

  return (
    <>
      <ScrollToBookmark {...{ bookmark, bookmarkRef }} />
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
