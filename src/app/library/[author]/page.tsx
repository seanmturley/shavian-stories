import dynamic from "next/dynamic";

export default async function AuthorCataloguePage({
  params
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;

  const AuthorCatalogue = dynamic(() => import(`@library/${author}/catalogue`));

  return <AuthorCatalogue />;
}
