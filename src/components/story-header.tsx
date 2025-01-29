import { storyUrl } from "@library/metadata";
import styles from "@library/story.module.css";

type StoryHeaderProps = {
  author: Author;
  story: Story;
};

export default function StoryHeader({ author, story }: StoryHeaderProps) {
  return (
    <header>
      <h1>
        <span className={styles.textCursor}>
          <a data-tooltip-id="latin" data-tooltip-content={story.title.latin}>
            {story.title.shavian}
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
            href={`${storyUrl}/${author.url}`}
            data-tooltip-id="latin"
            data-tooltip-content={author.latin}
          >
            {author.shavian}
          </a>
        </span>
      </p>
      <p>{story.year}</p>
    </header>
  );
}
