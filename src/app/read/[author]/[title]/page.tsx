import dynamic from "next/dynamic";

export default async function Story({
  params
}: {
  params: Promise<{ author: string; title: string }>;
}) {
  const { author, title } = await params;

  const StoryText = dynamic(() => import(`@library/${author}/${title}`));

  return <StoryText />;
}
