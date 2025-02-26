"use client";

import { RefObject, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Setter } from "use-local-storage/types";
import styles from "./bookmark.module.css";

const maxOffset = 125 + 25; // --bookmark-width + --mobile-story-margin
const addBookmarkThreshold = (2 / 3) * maxOffset;

export default function Bookmark({
  children,
  bookmark,
  setBookmark,
  bookmarkRef,
  sectionNumber,
  lineNumber
}: {
  bookmark: string;
  setBookmark: Setter<string>;
  bookmarkRef: RefObject<BookmarkRef>;
  sectionNumber: number;
  lineNumber: number;
  children: React.ReactNode;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [offset, setOffset] = useState({});
  const [action, setAction] = useState("");

  const bookmarkId = `${sectionNumber + 1}-${lineNumber + 1}`;

  useEffect(() => {
    setIsBookmarked(bookmarkId === bookmark);
  }, [bookmark, bookmarkId]);

  useEffect(() => {
    if (Object.keys(offset).length === 0) {
      setAction("");
    }
  }, [offset]);

  const handleBookmarkSwipe = useSwipeable({
    onSwiped: () => {
      setOffset({});
    },
    onSwipedRight: (swipeEventData) => {
      if (swipeEventData.deltaX >= addBookmarkThreshold) {
        setBookmark(isBookmarked ? undefined : bookmarkId);
      }
    },
    onSwiping: (swipeEventData) => {
      const newOffset = Math.max(
        Math.min(0, swipeEventData.deltaX - maxOffset),
        -maxOffset
      );
      setOffset({ left: `${newOffset}px` });

      if (swipeEventData.deltaX >= addBookmarkThreshold) {
        setAction(isBookmarked ? "remove" : "add");
      } else {
        setAction("");
      }
    },
    delta: { up: 999999, down: 999999 }, // Reduce detection of up/down swipes
    preventScrollOnSwipe: true
  });

  const handleBookmarkClick = () => {
    setAction(isBookmarked ? "remove" : "add");
    setBookmark(isBookmarked ? undefined : bookmarkId);
  };

  return (
    <div
      className={styles.bookmarkSwipeWrapper}
      style={offset}
      {...handleBookmarkSwipe}
    >
      <button
        className={`${styles.bookmark} ${styles[action]} ${isBookmarked && styles.isBookmarked}`}
        id={bookmarkId}
        onClick={handleBookmarkClick}
        ref={(el) => {
          bookmarkRef.current[bookmarkId] = el;
        }}
      >
        <span className={styles.iconContainer}>
          <span className={styles.icon}>B</span>
        </span>
      </button>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
