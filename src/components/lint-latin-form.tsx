import { useActionState, useEffect } from "react";
import SubmitButton from "@components/submit-button";
import { getLintedLatin } from "@utils/format-story/format-story-form-actions";

const initialLintLatinState = {
  latin: "",
  latinLinted: "",
  message: ""
};

export default function LintLatinForm({
  setLatinLinted
}: {
  setLatinLinted: Function;
}) {
  const [lintLatinState, lintLatinAction] = useActionState(
    getLintedLatin,
    initialLintLatinState
  );

  useEffect(() => {
    if (lintLatinState.latinLinted) {
      navigator.clipboard.writeText(lintLatinState.latinLinted);
      setLatinLinted(lintLatinState.latinLinted);
    }
  }, [lintLatinState.latinLinted]);

  return (
    <form>
      <label htmlFor="latin">Enter marked up Latin:</label>
      <textarea
        autoComplete="off"
        autoCorrect="off"
        autoFocus
        cols={100}
        defaultValue={lintLatinState.latin || ""}
        id="latin"
        name="latin"
        required
        rows={18}
        spellCheck={false}
      />

      <SubmitButton formAction={lintLatinAction} pendingText="Linting text...">
        Get linted Latin
      </SubmitButton>

      <div aria-live="polite">
        {lintLatinState.message && <p>{lintLatinState.message}</p>}
      </div>
    </form>
  );
}
