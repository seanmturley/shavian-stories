import Link from "next/link";

type AuthorProps = {
  author: Author;
  stories: Stories;
};

export default function AuthorCatalogue({ author, stories }: AuthorProps) {
  return (
    <section>
      <h1>{author.latin} stories</h1>
      <ul>
        {Object.keys(stories).map((story) => (
          <li key={story}>
            <Link href={`${author.url}/${stories[story].title.url}`}>
              {stories[story].title.latin}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
