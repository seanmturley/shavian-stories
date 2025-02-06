import { useActionState, useEffect } from "react";
import SubmitButton from "@components/submit-button";
import { getStoryHtml } from "@utils/format-text-form-actions";

const initialStoryHtmlState = {
  shavian: "",
  storyHtml: "",
  message: ""
};

export default function StoryHtmlForm({
  latinSanitized
}: {
  latinSanitized: string;
}) {
  const [storyHtmlState, storyHtmlAction] = useActionState(
    getStoryHtml,
    initialStoryHtmlState
  );

  useEffect(() => {
    if (storyHtmlState.storyHtml) {
      navigator.clipboard.writeText(storyHtmlState.storyHtml);
      return;
    }
  }, [storyHtmlState.storyHtml]);

  return (
    <form>
      <label htmlFor="shavian">Enter marked up Shavian:</label>
      <textarea
        autoComplete="off"
        autoCorrect="off"
        cols={100}
        defaultValue={storyHtmlState.shavian || ""}
        disabled={!latinSanitized}
        id="shavian"
        name="shavian"
        required
        rows={18}
        spellCheck={false}
      />

      <input type="hidden" name="latinSanitized" value={latinSanitized} />

      <SubmitButton
        disabled={!latinSanitized}
        formAction={storyHtmlAction}
        pendingText="Generating HTML..."
      >
        Get story HTML
      </SubmitButton>

      <div aria-live="polite">
        {storyHtmlState.message && <p>{storyHtmlState.message}</p>}
      </div>
    </form>
  );
}
