"use client";

import { useState } from "react";
import SanitizeLatinForm from "@components/sanitize-latin-form";
import StoryHtmlForm from "@components/story-html-form";
import styles from "./format-text.module.css";

export default function FormatText() {
  const [formKey, setFormKey] = useState(0);
  const [latinSanitized, setLatinSanitized] = useState("");

  const handleClick = () => {
    setLatinSanitized("");
    setFormKey((prev) => prev + 1);
  };

  return (
    <section className={styles.formatText}>
      <h1 className={styles.heading}>Story HTML Builder</h1>

      <SanitizeLatinForm key={formKey} setLatinSanitized={setLatinSanitized} />

      <p>
        <a
          className={styles.transliteration}
          href="https://www.dechifro.org/shavian/"
        >
          Get Shavian transileration
        </a>
      </p>

      <StoryHtmlForm key={formKey + 1} latinSanitized={latinSanitized} />

      <button className={styles.reset} onClick={handleClick} type="button">
        Reset
      </button>
    </section>
  );
}
