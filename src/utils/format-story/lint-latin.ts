/**
 * Lints the provided Latin text, including replacing conventional speech marks
 * and quotes with guillemets.
 *
 * @remarks
 * The linting process involves the following steps:
 *  - Removing all extra whitespace
 *  - Replacing all speech marks (single or double, including fancy variants)
 *    with double guillemets.
 *  - Replacing all quotation marks (single or double, including fancy variants)
 *    with single guillemets.
 *
 * **NOTE:** All apostrophes will be left intact *except* in the rare situation
 * where there is a leading non-fancy apostrophe followed by a trailing apostrophe
 * e.g.: "'tis the boys' favourite."
 *
 * @param latin - A string of Latin text, copied from the raw story source text,
 * with additional markup added as necessary. See {@link generateStoryHtml} for
 * markup details.
 * @returns A linted version of the provided Latin text.
 */
export default function lintLatin(latin: string) {
  const startOfLineSpaces = /^\s+/gm;
  const consecutiveSpaces = /[^\S\r\n][^\S\r\n]+/g;
  const latinTrimmed = latin
    .replace(consecutiveSpaces, " ")
    .replace(startOfLineSpaces, "\n")
    .trim();

  const speechMarks =
    /(?<=^|\p{L}\p{P}\s|—)['"‘“](.+?)(?:(?:(?<=(?:[\p{L}\d]\p{P}+))['"’”])|['"’”](—))/gmu;
  const quotationMarks = /(?<!\p{L})(['"‘“])([^'"‘“]*?)['"’”](?!\p{L})/gu;

  return latinTrimmed
    .replaceAll(speechMarks, "«$1»$2")
    .replaceAll(quotationMarks, "‹$2›");
}
