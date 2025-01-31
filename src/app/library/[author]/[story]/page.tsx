import Story from "@components/story";

export default async function StoryPage({
  params
}: {
  params: Promise<{ author: string; story: string }>;
}) {
  const { author, story } = await params;

  return <Story author={author} story={story} />;
}
