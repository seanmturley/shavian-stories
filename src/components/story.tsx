import dynamic from "next/dynamic";
import StoryHeader from "@components/story-header";
import styles from "@components/story.module.css";

export default function Story({
  author,
  story
}: {
  author: string;
  story: string;
}) {
  const StoryText = dynamic(() => import(`@library/${author}/${story}`));

  return (
    <article className={styles.story}>
      <StoryHeader author={author} story={story} />
      <StoryText />
    </article>
  );
}
