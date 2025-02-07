"use client";

import { useState } from "react";
import LintLatinForm from "@components/lint-latin-form";
import StoryHtmlForm from "@components/story-html-form";
import styles from "./format-story.module.css";

export default function FormatStory() {
  const [formKey, setFormKey] = useState(0);
  const [latinLinted, setLatinLinted] = useState("");

  const handleClick = () => {
    setLatinLinted("");
    setFormKey((prev) => prev + 1);
  };

  return (
    <section className={styles.formatStory}>
      <h1 className={styles.heading}>Story HTML Builder</h1>

      <LintLatinForm key={formKey} setLatinLinted={setLatinLinted} />

      <p>
        <a
          className={styles.transliteration}
          href="https://www.dechifro.org/shavian/"
        >
          Get Shavian transileration
        </a>
      </p>

      <StoryHtmlForm key={formKey + 1} latinLinted={latinLinted} />

      <button className={styles.reset} onClick={handleClick} type="button">
        Reset
      </button>
    </section>
  );
}
