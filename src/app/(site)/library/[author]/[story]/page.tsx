import Story from "@components/story";
import metadata from "@library/metadata";

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

export default async function StoryPage({
  params
}: {
  params: Promise<{ author: string; story: string }>;
}) {
  const { author, story } = await params;

  return <Story author={author} story={story} />;
}
