import Link from "next/link";
import styles from "./nav-bar.module.css";

export default function NavBar() {
  return (
    <nav>
      <Link href="/">
        <h1>Shavian Stories</h1>
      </Link>
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
  );
}
