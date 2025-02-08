import metadata from "@library/metadata";
import StoryHeader from "@components/story-header";
import StoryText from "@components/story-text";
import styles from "./story.module.css";

export function generateStaticParams() {
  const staticParams = [];

  for (const author in metadata) {
    const stories = metadata[author].stories;

    for (const story in stories) {
      staticParams.push({ author, story });
    }
  }

  return staticParams;
}

export default async function Story({
  params
}: {
  params: Promise<{ author: string; story: string }>;
}) {
  const parameters = await params;

  return (
    <article className={styles.story}>
      <StoryHeader {...parameters} />
      <StoryText {...parameters} />
    </article>
  );
}
