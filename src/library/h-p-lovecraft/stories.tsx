import Link from "next/link";

export default function LovecraftStories() {
  const linkBase = "/read/h-p-lovecraft";

  return (
    <section>
      <h1>Lovecraft Stories</h1>
      <ul>
        <li>
          <Link href={`${linkBase}/dagon`}>Dagon</Link>
        </li>
        <li>
          <Link href={`${linkBase}/the-dunwich-horror`}>
            The Dunwich Horror
          </Link>
        </li>
      </ul>
    </section>
  );
}
