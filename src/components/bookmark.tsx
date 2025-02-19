"use client";

import { useEffect, useState } from "react";
import styles from "./bookmark.module.css";
import { useSwipeable } from "react-swipeable";
import useLocalStorage from "use-local-storage";

const maxOffset = 150 + 25; // --bookmark-width + --mobile-story-margin
const addBookmarkThreshold = 0.8 * maxOffset;

export default function Bookmark({
  children,
  author,
  story,
  sectionNumber,
  lineNumber
}: Readonly<{
  children: React.ReactNode;
  author: string;
  story: string;
  sectionNumber: number;
  lineNumber: number;
}>) {
  const [bookmark, setBookmark] = useLocalStorage(`${author}/${story}`, "");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [offset, setOffset] = useState({});
  const [action, setAction] = useState("");

  const bookmarkId = `${sectionNumber + 1}-${lineNumber + 1}`;

  useEffect(() => {
    setIsBookmarked(bookmarkId === bookmark);
  }, [bookmark, bookmarkId]);

  const handleBookmarkSwipe = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.deltaX >= addBookmarkThreshold) {
        setAction("");
        setBookmark(isBookmarked ? undefined : bookmarkId);
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
    setAction(isBookmarked ? "remove" : "add");
    setBookmark(isBookmarked ? undefined : bookmarkId);
  };

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
