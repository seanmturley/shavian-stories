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
  const [latinLines, shavianLines] = getLines(latin, shavian);

  let markup = "";

  latinLines.forEach((latinLine, lineNumber) => {
    const shavianLine = shavianLines[lineNumber];

    const section = addSection(shavianLine);
    if (section) {
      markup += section;
      return;
    }

    const header = addHeader(latinLine, shavianLine, lineNumber);
    if (header) {
      markup += header;
      return;
    }

    const blockquote = addBlockQuote(latinLine, shavianLine, lineNumber);
    if (blockquote) {
      markup += blockquote;
      return;
    }

    markup += getLineMarkup(latinLine, shavianLine, "paragraph", lineNumber);
  });

  return markup;
}

function getLines(latin: string, shavian: string) {
  const splitLines = (text: string) => {
    const lines = /^(.+)$/gm;
    return Array.from(text.matchAll(lines), (m) => m[1]);
  };

  const latinLines = splitLines(latin);
  const shavianLines = splitLines(shavian);

  if (latinLines.length !== shavianLines.length) {
    throw new Error(
      `The Latin and Shavian texts do not have an equal number of lines.`
    );
  }

  return [latinLines, shavianLines];
}

function addSection(shavianLine: string) {
  const sectionStart = /^\[{3}/;
  const sectionEnd = /^\]{3}/;

  if (shavianLine.match(sectionStart)) {
    return "<section>";
  }

  if (shavianLine.match(sectionEnd)) {
    return "</section>";
  }
}

function addHeader(
  latinLine: string,
  shavianLine: string,
  lineNumber: number | null
) {
  const headerStart = /^###(.*)$/;
  const latinHeader = latinLine.match(headerStart);
  const shavianHeader = shavianLine.match(headerStart);

  if (latinHeader && shavianHeader) {
    let headerMarkup = "<header>";

    headerMarkup += getLineMarkup(
      latinHeader[1],
      shavianHeader[1],
      "heading",
      lineNumber
    );

    headerMarkup += "</header>";

    return headerMarkup;
  }
}

function addBlockQuote(
  latinLine: string,
  shavianLine: string,
  lineNumber: number | null
) {
  const blockquoteStart = /^>>>(.+)$/;
  const blockquote = shavianLine.match(blockquoteStart);

  if (blockquote) {
    let blockquoteMarkup = "<blockquote>";

    blockquoteMarkup += getLineMarkup(
      latinLine,
      blockquote[1],
      "paragraph",
      lineNumber
    );

    blockquoteMarkup += "</blockquote>";

    return blockquoteMarkup;
  }
}

function getLineMarkup(
  latinLine: string,
  shavianLine: string,
  type: "heading" | "paragraph",
  lineNumber: number | null
) {
  let lineMarkup = "";

  if (type === "heading") lineMarkup += "<h1>";
  if (type === "paragraph") lineMarkup += "<p>";

  // The span is used to provide consistent cursor styling
  // even between the tooltip anchors
  lineMarkup += "<span>";

  // Here a "chunk" refers to a word and its adjacent punctuation
  const [latinChunks, shavianChunks] = getChunks(
    latinLine,
    shavianLine,
    lineNumber
  );

  latinChunks.forEach((latinChunk, lineNumber) => {
    lineMarkup += getMarkedUpWord(latinChunk, shavianChunks[lineNumber]);
  });

  lineMarkup += "</span>";

  if (type === "heading") lineMarkup += "</h1>";
  if (type === "paragraph") lineMarkup += "</p>";

  return lineMarkup;
}

function getChunks(
  latinLine: string,
  shavianLine: string,
  lineNumber: number | null
) {
  const breakEmDashes = (text: string) => {
    return text.replaceAll("—", "— ");
  };

  // Here a "chunk" refers to a word and its adjacent punctuation
  const latinChunks = breakEmDashes(latinLine).split(/\s+/);
  const shavianChunks = breakEmDashes(shavianLine).split(/\s+/);

  if (latinChunks.length !== shavianChunks.length) {
    throw new Error(
      `The number of Latin chunks and Shavian chunks are not equal ${lineNumber !== null && `in line ${lineNumber + 1}`}.`
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
