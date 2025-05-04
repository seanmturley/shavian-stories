import { redirect } from "next/navigation";
import metadata from "@library/metadata";

export function checkExistsInLibrary(author: string, story?: string) {
  if (!Object.hasOwn(metadata, author)) {
    redirect(
      `/library?message=The author "${author}" could not be found. Try searching the full library catalogue below.`
    );
  }

  if (story && !Object.hasOwn(metadata[author], story)) {
    redirect(
      `/library/${author}?message=The story "${story}" by "${author}" could not be found. Try searching the following stories by the same author.`
    );
  }
}
