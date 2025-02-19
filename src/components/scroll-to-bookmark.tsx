import { RefObject } from "react";

export default function ScrollToBookmark({
  bookmark,
  bookmarkRef
}: {
  bookmark: string;
  bookmarkRef: RefObject<BookmarkRef>;
}) {
  const handleScrollToBookmarkClick = () => {
    if (bookmarkRef.current?.[bookmark]) {
      bookmarkRef.current[bookmark].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return <button onClick={handleScrollToBookmarkClick}>Go to bookmark</button>;
}
