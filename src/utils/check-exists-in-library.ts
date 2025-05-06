import { redirect } from "next/navigation";
import metadata from "@library/metadata";

export function checkExistsInLibrary(author: string, story?: string) {
  if (!Object.hasOwn(metadata, author)) {
    redirect(
      `/library?message=The author "${kebabToTitleCase(author)}" could not be found. Try searching the full library catalogue below.`
    );
  }

  if (story && !Object.hasOwn(metadata[author].stories, story)) {
    redirect(
      `/library/${author}?message=The story "${kebabToTitleCase(story)}" by "${metadata[author].name.latin}" could not be found. Try searching the following stories by the same author.`
    );
  }
}

function kebabToTitleCase(kebabString: string) {
  const hyphensRemoved = kebabString.replaceAll("-", " ");

  let titleCase = hyphensRemoved.replace(/([\p{L}\p{P}]+)\s*/gu, (match) => {
    return match.charAt(0).toUpperCase() + match.substring(1).toLowerCase();
  });

  // Minor words to display as lowercase unless they are the first word:
  // https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
  const minorWords = [
    "A",
    "An",
    "And",
    "As",
    "At",
    "But",
    "By",
    "For",
    "If",
    "In",
    "Nor",
    "Of",
    "Off",
    "On",
    "Or",
    "Per",
    "So",
    "The",
    "To",
    "Up",
    "Via",
    "Yet"
  ];

  minorWords.forEach((minorWord) => {
    titleCase = titleCase.replaceAll(
      new RegExp(String.raw`\s${minorWord}`, "g"),
      (match) => match.toLowerCase()
    );
  });

  return titleCase;
}
