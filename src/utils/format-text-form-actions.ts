"use server";

import { sanitizeLatinText } from "@utils/format-text";

export const formatLatin: FormAction = async function (prevState, formData) {
  const latin = formData.get("latin") as string;

  const latinSanitized = sanitizeLatinText(latin);

  return {
    ...prevState,
    latin,
    latinSanitized,
    message: "Formatted Latin text copied to clipboard."
  };
};
