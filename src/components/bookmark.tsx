"use client";

import { useState } from "react";
import styles from "./bookmark.module.css";
import { useSwipeable } from "react-swipeable";

const bookmarkWidth = 150;
const addBookmarkThreshold = 0.8 * bookmarkWidth;
const defaultBookmarkColour = "darkgoldenrod";

const config = {
  preventScrollOnSwipe: true
};

export default function Bookmark() {
  const [offset, setOffset] = useState(-bookmarkWidth);
  const [bookmarkColour, setBookmarkColour] = useState(defaultBookmarkColour);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.deltaX >= addBookmarkThreshold) {
        console.log("Bookmark added!");
        setBookmarkColour(defaultBookmarkColour);
      }
      setOffset(-bookmarkWidth);
    },
    onSwiping: (eventData) => {
      const newOffset = Math.max(
        Math.min(0, eventData.deltaX - bookmarkWidth),
        -bookmarkWidth
      );
      setOffset(newOffset);

      if (eventData.deltaX >= addBookmarkThreshold) {
        setBookmarkColour("darkgreen");
      } else {
        setBookmarkColour(defaultBookmarkColour);
      }
    },
    ...config
  });

  return (
    <section className={styles.storyContainer}>
      <div className={styles.line} style={{ left: `${offset}px` }}>
        <a className={styles.icon} style={{ backgroundColor: bookmarkColour }}>
          B
        </a>
        <p className={styles.paragraph} {...handlers}>
          The change happened whilst I slept. Its details I shall never know;
          for my slumber, though troubled and dream-infested, was continuous.
          When at last I awaked, it was to discover myself half sucked into a
          slimy expanse of hellish black mire which extended about me in
          monotonous undulations as far as I could see, and in which my boat lay
          grounded some distance away.
        </p>
      </div>
    </section>
  );
}
