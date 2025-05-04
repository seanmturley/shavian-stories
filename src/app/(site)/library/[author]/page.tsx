import Catalogue from "@components/catalogue";
import metadata from "@library/metadata";
import { checkExistsInLibrary } from "@utils/check-exists-in-library";

export function generateStaticParams() {
  return Object.keys(metadata).map((author) => ({ author }));
}

export default async function Author({
  params
}: {
  params: Promise<{ author: string }>;
}) {
  const { author } = await params;

  checkExistsInLibrary(author);

  return <Catalogue authorName={author} />;
}
