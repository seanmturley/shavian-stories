type StoryHeaderProps = {
  author: Author;
  story: Story;
};

export default function StoryHeader({ author, story }: StoryHeaderProps) {
  return (
    <header>
      <h1>
        <a data-tooltip-id="latin" data-tooltip-content={story.title.latin}>
          {story.title.shavian}
        </a>
      </h1>
      <p>
        <a data-tooltip-id="latin" data-tooltip-content="by">
          𐑚𐑲
        </a>{" "}
        <a
          rel="author"
          href={author.url}
          data-tooltip-id="latin"
          data-tooltip-content={author.latin}
        >
          {author.shavian}
        </a>
      </p>
      <p>{story.year}</p>
    </header>
  );
}
