import { useActionState, useEffect } from "react";
import SubmitButton from "@components/submit-button";
import { formatLatin } from "@utils/format-text-form-actions";

const initialFormatLatinState = {
  latin: "",
  latinSanitized: "",
  message: ""
};

export default function SanitizeLatinForm({
  setLatinSanitized
}: {
  setLatinSanitized: Function;
}) {
  const [formatLatinState, formatLatinAction] = useActionState(
    formatLatin,
    initialFormatLatinState
  );

  useEffect(() => {
    if (formatLatinState.latinSanitized) {
      navigator.clipboard.writeText(formatLatinState.latinSanitized);
      setLatinSanitized(formatLatinState.latinSanitized);
    }
  }, [formatLatinState.latinSanitized]);

  return (
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
        rows={18}
        spellCheck={false}
      />

      <SubmitButton
        formAction={formatLatinAction}
        pendingText="Linting text..."
      >
        Get linted Latin
      </SubmitButton>

      <div aria-live="polite">
        {formatLatinState.message && <p>{formatLatinState.message}</p>}
      </div>
    </form>
  );
}
