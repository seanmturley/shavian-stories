import AuthorCatalogue from "@components/author-catalogue";

export default async function AuthorCataloguePage({
  params
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;

  return <AuthorCatalogue author={author} />;
}
