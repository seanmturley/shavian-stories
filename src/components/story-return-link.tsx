"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./story-return-link.module.css";

export default function StoryReturnLink() {
  const searchParams = useSearchParams();

  const returnPath = searchParams.get("return");

  return (
    <Link className={styles.storyReturnLink} href={returnPath ?? "/"}>
      ←
    </Link>
  );
}
