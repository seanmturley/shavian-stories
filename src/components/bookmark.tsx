"use client";

import { useState } from "react";
import styles from "./bookmark.module.css";
import { useSwipeable } from "react-swipeable";

const margin = 25; // --mobile-story-margin
const defaultOffset = 150 + margin; // .bookmark width + --mobile-story-margin
const bookmark = 3;
const defaultBookmarkColour = "darkgoldenrod";
const addBookmarkThreshold = 0.8 * defaultOffset;

export default function Bookmark({
  children,
  sectionNumber,
  lineNumber
}: Readonly<{
  children: React.ReactNode;
  sectionNumber: number;
  lineNumber: number;
}>) {
  const [offset, setOffset] = useState(-defaultOffset);
  const [bookmarkColour, setBookmarkColour] = useState(defaultBookmarkColour);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.deltaX >= addBookmarkThreshold) {
        setIsBookmarked((prev) => !prev);
        setBookmarkColour(defaultBookmarkColour);
      }
      setOffset(-defaultOffset);
    },
    onSwiping: (eventData) => {
      const newOffset = Math.max(
        Math.min(0, eventData.deltaX - defaultOffset),
        -defaultOffset
      );
      setOffset(newOffset);

      if (eventData.deltaX >= addBookmarkThreshold) {
        setBookmarkColour(isBookmarked ? "darkred" : "darkgreen");
      } else {
        setBookmarkColour(defaultBookmarkColour);
      }
    },
    delta: { up: 99999, down: 99999 }, // Disable detection of up/down swipes
    preventScrollOnSwipe: true
  });

  const bookmarkId = `s${sectionNumber + 1}-l${lineNumber + 1}`;

  return (
    <div
      className={styles.line}
      id={bookmarkId}
      style={{ left: `${offset}px` }}
    >
      <div className={styles.slider} {...handlers}></div>
      <a
        className={styles.bookmark}
        href={`#${bookmarkId}`}
        style={{
          backgroundColor: bookmarkColour,
          marginRight: `${isBookmarked ? 0.5 * margin - bookmark : 0.5 * margin}px`,
          borderRight: `${isBookmarked ? `${bookmark}px solid ${bookmarkColour}` : "none"}`
        }}
      >
        B
      </a>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
