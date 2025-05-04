import { redirect } from "next/navigation";
import Catalogue from "@components/catalogue";
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

  if (!Object.hasOwn(metadata, author)) {
    redirect("/library");
  }

  return <Catalogue authorName={author} />;
}
