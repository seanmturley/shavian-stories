"use client";

import Link from "next/link";
import styles from "./nav-bar.module.css";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  if (pathname === "/library/p-g-wodehouse/jeeves-takes-charge") {
    return <h1>This isn't a nav bar</h1>;
  }

  return (
    <header>
      <h1>
        <Link href="/">Shavian Stories</Link>
      </h1>

      <nav>
        <ul>
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
