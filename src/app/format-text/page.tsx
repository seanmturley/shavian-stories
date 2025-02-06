"use client";

import { useActionState, useEffect } from "react";
import SubmitButton from "@components/submit-button";
import { formatLatin, getStoryHtml } from "@utils/format-text-form-actions";

const initialFormatLatinState = {
  latin: "",
  latinSanitized: "",
  message: ""
};

const initialStoryHtmlState = {
  shavian: "",
  storyHtml: "",
  message: ""
};

export default function FormatText() {
  const [formatLatinState, formatLatinAction] = useActionState(
    formatLatin,
    initialFormatLatinState
  );

  const [storyHtmlState, storyHtmlAction] = useActionState(
    getStoryHtml,
    initialStoryHtmlState
  );

  useEffect(() => {
    if (storyHtmlState.storyHtml) {
      navigator.clipboard.writeText(storyHtmlState.storyHtml);
      return;
    }

    if (formatLatinState.latinSanitized) {
      navigator.clipboard.writeText(formatLatinState.latinSanitized);
    }
  });

  return (
    <>
      <section>
        <form>
          <label htmlFor="latin">Enter marked up Latin:</label>
          <textarea
            autoComplete="off"
            autoCorrect="off"
            autoFocus
            cols={100}
            defaultValue={formatLatinState.latin || ""}
            id="latin"
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
      </section>

      <section>
        <form>
          <label htmlFor="shavian">Enter marked up Shavian</label>
          <textarea
            autoComplete="off"
            autoCorrect="off"
            cols={100}
            defaultValue={storyHtmlState.shavian || ""}
            disabled={!formatLatinState.latinSanitized}
            id="shavian"
            name="shavian"
            required
            rows={30}
            spellCheck={false}
          />

          <input
            type="hidden"
            name="latinSanitized"
            value={formatLatinState.latinSanitized}
          />

          <SubmitButton
            disabled={!formatLatinState.latinSanitized}
            formAction={storyHtmlAction}
            pendingText="Formatting text..."
          >
            Get story HTML
          </SubmitButton>

          <div aria-live="polite">
            {storyHtmlState.message && <p>{storyHtmlState.message}</p>}
          </div>
        </form>
      </section>
    </>
  );
}
