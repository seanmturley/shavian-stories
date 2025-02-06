"use server";

import { createStoryMarkup, sanitizeLatinText } from "@utils/format-text";

export const formatLatin: FormAction = async function (prevState, formData) {
  const latin = formData.get("latin") as string;

  const latinSanitized = sanitizeLatinText(latin);

  return {
    ...prevState,
    latin,
    latinSanitized,
    message: "Linted Latin copied to clipboard."
  };
};

export const getStoryHtml: FormAction = async function (prevState, formData) {
  const shavian = formData.get("shavian") as string;
  const latinSanitized = formData.get("latinSanitized") as string;

  try {
    const storyHtml = createStoryMarkup(latinSanitized, shavian);

    return {
      ...prevState,
      shavian,
      storyHtml,
      message: "Story HTML copied to clipboard."
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        ...prevState,
        shavian,
        message: `Error: ${error.message}.`
      };
    }
  }
};
