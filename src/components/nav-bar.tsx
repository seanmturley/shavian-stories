"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import StoryReturnLink from "@components/story-return-link";
import styles from "./nav-bar.module.css";
import metadata from "@library/metadata";

export default function NavBar() {
  const pathname = usePathname();

  const authorAndStory = /\/library\/([^\/]+)\/([^\/]+)$/gm;
  const match = authorAndStory.exec(pathname);

  if (match) {
    const [_, author, story] = match;

    if (
      Object.hasOwn(metadata, author) &&
      Object.hasOwn(metadata[author].stories, story)
    ) {
      return <StoryReturnLink />;
    }
  }

  return (
    <header className={styles.navBar}>
      <h1>
        <Link href="/">Shavian Stories</Link>
      </h1>

      <nav>
        <ul className={styles.navList}>
          <li className={styles.dropdown}>
            <Link href="#">Learn</Link>
            <ul className={styles.dropdownContent}>
              <li>
                <Link href="#">Shavian</Link>
              </li>
              <li>
                <Link href="#">Neo-Shavian English</Link>
              </li>
              <li>
                <Link href="#">Neo-Shavian French</Link>
              </li>
            </ul>
          </li>

          <li className={styles.dropdown}>
            <Link href="/library">Read</Link>
            <ul className={styles.dropdownContent}>
              <li>
                <Link href="/library">Shavian</Link>
              </li>
              <li>
                <Link href="/library">Neo-Shavian English</Link>
              </li>
              <li>
                <Link href="/library">Neo-Shavian French</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
