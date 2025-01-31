import Link from "next/link";
import metadata from "@library/metadata";

export default function AuthorCatalogue({ author }: { author: string }) {
  const authorMetadata = metadata[author];

  return (
    <section>
      <h1>{authorMetadata.name.latin} stories</h1>
      <ul>
        {Object.keys(authorMetadata.stories).map((story) => (
          <li key={story}>
            <Link href={`${process.env.libraryUrl}/${author}/${story}`}>
              {authorMetadata.stories[story].title.latin}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
