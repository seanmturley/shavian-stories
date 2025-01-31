import dynamic from "next/dynamic";
import StoryHeader from "@components/story-header";

export default function Story({
  author,
  story
}: {
  author: string;
  story: string;
}) {
  const StoryText = dynamic(() => import(`@library/${author}/${story}`));

  return (
    <article>
      <StoryHeader author={author} story={story} />
      <StoryText />
    </article>
  );
}
