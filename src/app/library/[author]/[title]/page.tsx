import dynamic from "next/dynamic";

export default async function StoryPage({
  params
}: {
  params: Promise<{ author: string; title: string }>;
}) {
  const { author, title } = await params;

  const Story = dynamic(() => import(`@library/${author}/${title}`));

  return <Story />;
}
