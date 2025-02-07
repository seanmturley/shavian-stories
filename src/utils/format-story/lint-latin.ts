export default function lintLatin(latin: string) {
  const startOfLineSpaces = /^\s+/gm;
  const consecutiveSpaces = /[^\S\r\n][^\S\r\n]+/g;
  const latinTrimmed = latin
    .replace(consecutiveSpaces, " ")
    .replace(startOfLineSpaces, "\n")
    .trim();

  const speechMarks =
    /(?<=^|\p{L}\p{P}\s|—)['"‘“](.+?)(?:(?:(?<=(?:[\p{L}\d]\p{P}+))['"’”])|['"’”](—))/gmu;
  const quotationMarks = /(?<!\p{L})(['"])([^'"]*)\1(?!\p{L})/gu;

  return latinTrimmed
    .replaceAll(speechMarks, "«$1»$2")
    .replaceAll(quotationMarks, "‹$2›");
}
