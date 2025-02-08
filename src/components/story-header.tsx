import parse from "html-react-parser";
import metadata from "@library/metadata";
import { getLineHtml } from "@utils/format-story/generate-story-html";

type StoryHeaderProps = {
  author: string;
  story: string;
};

export default function StoryHeader({ author, story }: StoryHeaderProps) {
  const authorName = metadata[author].name;
  const storyMetadata = metadata[author].stories[story];

  const headingHtml = getLineHtml(
    storyMetadata.title.latin,
    storyMetadata.title.shavian,
    "heading"
  );

  return (
    <header>
      {parse(headingHtml)}
      <p>
        <span>
          <a data-tooltip-id="latin" data-tooltip-content="by">
            𐑚𐑲
          </a>{" "}
          <a
            rel="author"
            href={`${process.env.libraryUrl}/${author}`}
            data-tooltip-id="latin"
            data-tooltip-content={authorName.latin}
            className="link"
          >
            {authorName.shavian}
          </a>
        </span>
      </p>
      <p>{storyMetadata.year}</p>
    </header>
  );
}
