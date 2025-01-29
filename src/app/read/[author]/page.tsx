import dynamic from "next/dynamic";

export default async function Author({
  params
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;

  const StoryList = dynamic(() => import(`@library/${author}/stories`));

  return <StoryList />;
}
