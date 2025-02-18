"use client";

import { useState } from "react";
import styles from "./bookmark.module.css";
import { useSwipeable } from "react-swipeable";

const maxOffset = 150 + 25; // --bookmark-width + --mobile-story-margin
const addBookmarkThreshold = 0.8 * maxOffset;

export default function Bookmark({
  children,
  sectionNumber,
  lineNumber
}: Readonly<{
  children: React.ReactNode;
  sectionNumber: number;
  lineNumber: number;
}>) {
  const [offset, setOffset] = useState({});
  const [action, setAction] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkSwipe = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.deltaX >= addBookmarkThreshold) {
        setIsBookmarked((prev) => !prev);
        setAction("");
      }
      setOffset({});
    },
    onSwiping: (eventData) => {
      const newOffset = Math.max(
        Math.min(0, eventData.deltaX - maxOffset),
        -maxOffset
      );
      setOffset({ left: `${newOffset}px` });

      if (eventData.deltaX >= addBookmarkThreshold) {
        setAction(isBookmarked ? "remove" : "add");
      } else {
        setAction("");
      }
    },
    delta: { up: 99999, down: 99999 }, // Disable detection of up/down swipes
    preventScrollOnSwipe: true
  });

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  const bookmarkId = `${sectionNumber + 1}-${lineNumber + 1}`;

  return (
    <div
      className={styles.line}
      id={bookmarkId}
      style={offset}
      {...handleBookmarkSwipe}
    >
      <a
        className={`${styles.bookmark} ${styles[action]} ${isBookmarked && styles.isBookmarked}`}
        href={`#${bookmarkId}`}
        onClick={handleBookmarkClick}
      >
        B
      </a>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
