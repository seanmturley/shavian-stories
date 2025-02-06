"use client";

import { useActionState, useEffect } from "react";
import SubmitButton from "@components/submit-button";
import { formatLatin } from "@utils/format-text-form-actions";

const initialFormatLatinState = {
  latin: "",
  latinSanitized: "",
  message: ""
};

export default function FormatText() {
  const [formatLatinState, formatLatinAction] = useActionState(
    formatLatin,
    initialFormatLatinState
  );

  useEffect(() => {
    if (formatLatinState.latinSanitized) {
      navigator.clipboard.writeText(formatLatinState.latinSanitized);
    }
  });

  return (
    <form>
      <label htmlFor="latin">Enter marked up Latin:</label>
      <textarea
        autoComplete="off"
        autoCorrect="off"
        // autoFocus
        cols={100}
        defaultValue={formatLatinState.latin || ""}
        name="latin"
        required
        rows={30}
        spellCheck={false}
      />

      <SubmitButton
        formAction={formatLatinAction}
        pendingText="Formatting text..."
      >
        Get formatted Latin
      </SubmitButton>

      <div aria-live="polite">
        {formatLatinState.message && <p>{formatLatinState.message}</p>}
      </div>
    </form>
  );
}
