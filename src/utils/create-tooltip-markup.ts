export function sanitizeLatinText(latin: string) {
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

export function createStoryMarkup(latin: string, shavian: string) {
  const [latinParagraphs, shavianParagraphs] = getParagraphs(latin, shavian);

  let markup = "";

  latinParagraphs.forEach((latinParagraph, index) => {
    let shavianParagraph = shavianParagraphs[index];

    const sectionStart = /^\[{3}/;
    const sectionEnd = /^\]{3}/;

    if (shavianParagraph.match(sectionStart)) {
      markup += "<section>";
      return;
    } else if (shavianParagraph.match(sectionEnd)) {
      markup += "</section>";
      return;
    }

    const blockquoteRegex = /^>>>(.+)$/;
    const blockquote = shavianParagraph.match(blockquoteRegex);

    if (blockquote) {
      markup += "<blockquote>";
      shavianParagraph = blockquote[1];
    }

    // The span is used to provide consistent cursor styling
    // even between the tooltip anchors
    markup += "<p><span>";

    // Here a "chunk" refers to a word and its adjacent punctuation
    const [latinChunks, shavianChunks] = getChunks(
      latinParagraph,
      shavianParagraph,
      index
    );

    latinChunks.forEach((latinChunk, index) => {
      markup += getMarkedUpWord(latinChunk, shavianChunks[index]);
    });

    markup += "</span></p>";

    if (blockquote) {
      markup += "</blockquote>";
    }
  });

  return markup;
}

function getParagraphs(latin: string, shavian: string) {
  const splitParagraphs = (text: string) => {
    const paragraphRegex = /^(.+)$/gm;

    return Array.from(text.matchAll(paragraphRegex), (m) => m[1]);
  };

  const latinParagraphs = splitParagraphs(latin);
  const shavianParagraphs = splitParagraphs(shavian);

  if (latinParagraphs.length !== shavianParagraphs.length) {
    throw new Error(
      `The Latin and Shavian texts do not have an equal number of paragraphs.`
    );
  }

  return [latinParagraphs, shavianParagraphs];
}

function getChunks(latin: string, shavian: string, index: number | null) {
  const breakEmDashes = (text: string) => {
    return text.replaceAll("—", "— ");
  };

  // Here a "chunk" refers to a word and its adjacent punctuation
  const latinChunks = breakEmDashes(latin).split(/\s+/);
  const shavianChunks = breakEmDashes(shavian).split(/\s+/);

  if (latinChunks.length !== shavianChunks.length) {
    throw new Error(
      `The number of Latin chunks and Shavian chunks are not equal ${index !== null && `in paragraph ${index + 1}`}.`
    );
  }

  return [latinChunks, shavianChunks];
}

function getMarkedUpWord(latinChunk: string, shavianChunk: string) {
  const nonApostropheOuterPunctuation = /^[^'\p{L}]+|[^'\p{L}]+$/gu;
  const latinWord = latinChunk.replaceAll(nonApostropheOuterPunctuation, "");

  const shavian = getShavianWordAndPunctuation(shavianChunk);

  return `${shavian.leadingPunctuation}<a data-tooltip-id="latin" data-tooltip-content="${latinWord}">${shavian.word}</a>${shavian.trailingPunctuation}${shavian.trailingSpace}`;
}

function getShavianWordAndPunctuation(shavianChunk: string) {
  const shavianChunkNoApostrophes = shavianChunk.replaceAll("'", "");

  const wordAndPunctuation = /(\p{P}*)([\p{L}\d·-]+)(\p{P}*)/u;
  const [, leadingPunctuationRaw, word, trailingPunctuationRaw] =
    shavianChunkNoApostrophes.match(wordAndPunctuation) as string[];

  const leadingPunctuation = leadingPunctuationRaw
    .replaceAll(/([«‹])/g, "$1&#8239")
    .replaceAll("***", "<em>");

  const trailingPunctuation = trailingPunctuationRaw
    .replaceAll(/,([»›])/g, "$1,")
    .replaceAll(/([»›!?])/g, "&#8239$1")
    .replaceAll("***", "</em>");

  const trailingSpace = trailingPunctuation.slice(-1) === "—" ? "" : " ";

  return { leadingPunctuation, word, trailingPunctuation, trailingSpace };
}
