"use server";

import generateStoryHtml from "@utils/format-story/generate-story-html";
import lintLatin from "@utils/format-story/lint-latin";

export const getLintedLatin: FormAction = async function (prevState, formData) {
  const latin = formData.get("latin") as string;

  const latinLinted = lintLatin(latin);

  return {
    ...prevState,
    latin,
    latinLinted,
    message: "Linted Latin copied to clipboard."
  };
};

export const getStoryHtml: FormAction = async function (prevState, formData) {
  const shavian = formData.get("shavian") as string;
  const latinLinted = formData.get("latinLinted") as string;

  try {
    const storyHtml = generateStoryHtml(latinLinted, shavian);

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
