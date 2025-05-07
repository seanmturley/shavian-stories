import Link from "next/link";
import metadata from "@library/metadata";

export default function AuthorBio({ authorName }: { authorName: string }) {
  return (
    <>
      <p>{metadata[authorName].bio.dates}</p>
      <p>
        {metadata[authorName].bio.about}{" "}
        <Link href={metadata[authorName].bio.link}>
          Read more on Wikipedia [external link icon]
        </Link>
      </p>
    </>
  );
}
