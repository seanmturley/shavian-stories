"use client";

import { useState } from "react";
import SanitizeLatinForm from "@components/sanitize-latin-form";
import StoryHtmlForm from "@components/story-html-form";

export default function FormatText() {
  const [formKey, setFormKey] = useState(0);
  const [latinSanitized, setLatinSanitized] = useState("");

  const handleClick = () => {
    setLatinSanitized("");
    setFormKey((prev) => prev + 1);
  };

  return (
    <>
      <SanitizeLatinForm key={formKey} setLatinSanitized={setLatinSanitized} />
      <StoryHtmlForm key={formKey + 1} latinSanitized={latinSanitized} />
      <section>
        <button type="button" onClick={handleClick}>
          Reset
        </button>
      </section>
    </>
  );
}
