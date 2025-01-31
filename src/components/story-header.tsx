import styles from "@components/story.module.css";
import metadata from "@library/metadata";

type StoryHeaderProps = {
  author: string;
  story: string;
};

export default function StoryHeader({ author, story }: StoryHeaderProps) {
  const authorName = metadata[author].name;
  const storyMetadata = metadata[author].stories[story];

  return (
    <header>
      <h1>
        <span className={styles.textCursor}>
          <a
            data-tooltip-id="latin"
            data-tooltip-content={storyMetadata.title.latin}
          >
            {storyMetadata.title.shavian}
          </a>
        </span>
      </h1>
      <p>
        <span className={styles.textCursor}>
          <a data-tooltip-id="latin" data-tooltip-content="by">
            𐑚𐑲
          </a>{" "}
          <a
            rel="author"
            href={`${process.env.libraryUrl}/${author}`}
            data-tooltip-id="latin"
            data-tooltip-content={authorName.latin}
          >
            {authorName.shavian}
          </a>
        </span>
      </p>
      <p>{storyMetadata.year}</p>
    </header>
  );
}
