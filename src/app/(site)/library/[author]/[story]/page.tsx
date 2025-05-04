import { redirect } from "next/navigation";
import StoryBody from "@components/story-body";
import StoryFooter from "@components/story-footer";
import StoryHeader from "@components/story-header";
import StoryReturnLink from "@components/story-return-link";
import metadata from "@library/metadata";
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
  const { author, story } = await params;

  if (!Object.hasOwn(metadata, author)) {
    redirect("/library");
  }
  if (!Object.hasOwn(metadata[author], story)) {
    redirect(`/library/${author}`);
  }

  const { latin } = await import(`@library/${author}/${story}/latin`);
  const { shavian } = await import(`@library/${author}/${story}/shavian`);

  return (
    <article className={styles.story}>
      <StoryReturnLink />
      <StoryHeader {...{ author, story }} />
      <StoryBody {...{ author, story, latin, shavian }} />
      <StoryFooter />
    </article>
  );
}
