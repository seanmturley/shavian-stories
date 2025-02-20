import { RefObject } from "react";
import ClientOnly from "@components/client-only";
import styles from "./scroll-to-bookmark.module.css";

export default function ScrollToBookmark({
  bookmark,
  bookmarkRef
}: {
  bookmark: string;
  bookmarkRef: RefObject<BookmarkRef>;
}) {
  if (!bookmark) return null;

  const handleScrollToBookmarkClick = () => {
    if (bookmarkRef.current?.[bookmark]) {
      bookmarkRef.current[bookmark].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <ClientOnly>
      <button
        className={styles.scrollButton}
        onClick={handleScrollToBookmarkClick}
      >
        Go to bookmark
      </button>
    </ClientOnly>
  );
}
