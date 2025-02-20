"use client";

import { RefObject, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styles from "./bookmark.module.css";

const maxOffset = 150 + 25; // --bookmark-width + --mobile-story-margin
const addBookmarkThreshold = 0.8 * maxOffset;

export default function Bookmark({
  children,
  bookmark,
  bookmarkRef,
  updateBookmark,
  sectionNumber,
  lineNumber
}: Readonly<{
  bookmark: string;
  bookmarkRef: RefObject<BookmarkRef>;
  updateBookmark: (isBookmarked: boolean, bookmarkId: string) => void;
  sectionNumber: number;
  lineNumber: number;
  children: React.ReactNode;
}>) {
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
        updateBookmark(isBookmarked, bookmarkId);
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
    updateBookmark(isBookmarked, bookmarkId);
  };

  return (
    <div className={styles.line} style={offset} {...handleBookmarkSwipe}>
      <button
        className={`${styles.bookmark} ${styles[action]} ${isBookmarked && styles.isBookmarked}`}
        onClick={handleBookmarkClick}
      >
        B
      </button>
      <div
        className={styles.text}
        id={bookmarkId}
        ref={(el) => {
          bookmarkRef.current[bookmarkId] = el;
        }}
      >
        {children}
      </div>
    </div>
  );
}
