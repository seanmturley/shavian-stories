"use client";

import { cloneElement, useState } from "react";
import styles from "./bookmark.module.css";
import { useSwipeable } from "react-swipeable";

const margin = 25; // --margin
const defaultOffset = 150 + margin; // .icon width + --margin
const bookmark = 3;
const defaultBookmarkColour = "darkgoldenrod";
const addBookmarkThreshold = 0.8 * defaultOffset;

const config = {
  preventScrollOnSwipe: true
};

export default function Bookmark({
  children
}: Readonly<{
  children: React.ReactNode;
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
    ...config
  });

  const childProps = {
    className: styles.paragraph,
    style: {
      borderLeft: `${isBookmarked ? `${bookmark}px solid ${bookmarkColour}` : "none"}`,
      paddingLeft: `${isBookmarked ? 0.5 * margin - bookmark : 0.5 * margin}px`
    }
  };

  return (
    <section className={styles.storyContainer}>
      <div className={styles.line} style={{ left: `${offset}px` }}>
        <div className={styles.slider} {...handlers}></div>
        <a
          className={styles.icon}
          style={{
            backgroundColor: bookmarkColour
          }}
        >
          B
        </a>
        {cloneElement(children as React.ReactElement<any>, {
          ...childProps
        })}
      </div>
    </section>
  );
}
