import AuthorCatalogue from "@components/author-catalogue";
import metadata from "@library/metadata";

export function generateStaticParams() {
  return Object.keys(metadata).map((author) => ({ author }));
}

export default async function Author({
  params
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;

  return <AuthorCatalogue author={author} />;
}
