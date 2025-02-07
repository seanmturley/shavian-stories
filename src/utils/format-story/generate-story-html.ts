import lintLatin from "@utils/format-story/lint-latin";

/**
 * Builds the story HTML from marked up Latin and Shavian inputs.
 *
 * @remarks
 * The input strings should be marked up in the following manner:
 *  - A wrapping `<section>` is marked with opening `[[[` and closing `]]]`
 *  - A wrapping `<header><h1>` is marked with leading `###`
 *  - A wrapping `<blockquote>` is marked with leading `>>>`
 *  - A wrapping `<em>` is marked with opening `***` and closing `***`
 *
 * The Latin can be transliterated to Shavian using
 * {@link https://www.dechifro.org/shavian/ | Dechifro's tool}.
 *
 * @param latin - A marked up string of Latin text, linted with {@link lintLatin}.
 * @param shavian - The same as {@link latin}, but transliterated into Shavian.
 *
 * @returns A linted version of the provided Latin text.
 */
export default function generateStoryHtml(latin: string, shavian: string) {
  const [latinLines, shavianLines] = getLines(latin, shavian);

  let html = "";

  latinLines.forEach((latinLine, lineNumber) => {
    const shavianLine = shavianLines[lineNumber];

    const section = addSection(shavianLine);
    if (section) {
      html += section;
      return;
    }

    const header = addHeader(latinLine, shavianLine, lineNumber);
    if (header) {
      html += header;
      return;
    }

    const blockquote = addBlockQuote(latinLine, shavianLine, lineNumber);
    if (blockquote) {
      html += blockquote;
      return;
    }

    html += getLineHtml(latinLine, shavianLine, "paragraph", lineNumber);
  });

  return html;
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
  const shavianHeader = shavianLine.match(headerStart);

  if (shavianHeader) {
    let headerHtml = "<header>";

    headerHtml += getLineHtml(
      latinLine,
      shavianHeader[1],
      "heading",
      lineNumber
    );

    headerHtml += "</header>";

    return headerHtml;
  }
}

function addBlockQuote(
  latinLine: string,
  shavianLine: string,
  lineNumber: number | null
) {
  const blockquoteStart = /^>>>(.+)$/;
  const shavianBlockquote = shavianLine.match(blockquoteStart);

  if (shavianBlockquote) {
    let blockquoteHtml = "<blockquote>";

    blockquoteHtml += getLineHtml(
      latinLine,
      shavianBlockquote[1],
      "paragraph",
      lineNumber
    );

    blockquoteHtml += "</blockquote>";

    return blockquoteHtml;
  }
}

function getLineHtml(
  latinLine: string,
  shavianLine: string,
  type: "heading" | "paragraph",
  lineNumber: number | null
) {
  let lineHtml = "";

  if (type === "heading") lineHtml += "<h1>";
  if (type === "paragraph") lineHtml += "<p>";

  // The span is used to provide consistent cursor styling
  // even between the tooltip anchors
  lineHtml += "<span>";

  // Here a "chunk" refers to a word and its adjacent punctuation
  const [latinChunks, shavianChunks] = getChunks(
    latinLine,
    shavianLine,
    lineNumber
  );

  let emphasisFlag = false;

  latinChunks.forEach((latinChunk, lineNumber) => {
    let shavianChunk = shavianChunks[lineNumber];

    const emphasisStart = shavianChunk.match(/^\p{P}*\*{3}/u);
    const emphasisEnd = shavianChunk.match(/\*{3}\p{P}*$/u);

    if (emphasisStart || emphasisEnd) {
      shavianChunk = shavianChunk.replaceAll("***", "");
    }

    if (emphasisStart) {
      emphasisFlag = true;
      lineHtml += "<em>";
    }

    const style = emphasisFlag ? "emphasis" : "normal";

    lineHtml += getWordHtml(latinChunk, shavianChunk, style);

    if (emphasisEnd) {
      emphasisFlag = false;
      lineHtml += "</em>";
    }
  });

  lineHtml += "</span>";

  if (type === "heading") lineHtml += "</h1>";
  if (type === "paragraph") lineHtml += "</p>";

  return lineHtml;
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

function getWordHtml(
  latinChunk: string,
  shavianChunk: string,
  style: "emphasis" | "normal"
) {
  const markupAndNonApostrophePunctuation = /^[^'\p{L}]+|[^'\p{L}]+$/gu;
  const latinWord = latinChunk.replaceAll(
    markupAndNonApostrophePunctuation,
    ""
  );

  const shavian = getShavianWordAndPunctuation(shavianChunk);

  let tooltipId;
  if (style === "emphasis") tooltipId = "latin-emphasis";
  if (style === "normal") tooltipId = "latin";

  return `${shavian.leadingPunctuation}<a data-tooltip-id="${tooltipId}" data-tooltip-content="${latinWord}">${shavian.word}</a>${shavian.trailingPunctuation}${shavian.trailingSpace}`;
}

function getShavianWordAndPunctuation(shavianChunk: string) {
  const shavianChunkNoApostrophes = shavianChunk.replaceAll("'", "");

  const wordAndPunctuation = /(\p{P}*)([\p{L}\d·-]+)(\p{P}*)/u;
  const [, leadingPunctuationRaw, word, trailingPunctuationRaw] =
    shavianChunkNoApostrophes.match(wordAndPunctuation) as string[];

  const leadingPunctuation = leadingPunctuationRaw.replaceAll(
    /([«‹])/g,
    "$1&#8239"
  );

  const trailingPunctuation = trailingPunctuationRaw
    .replaceAll(/,([»›])/g, "$1,")
    .replaceAll(/([»›!?])/g, "&#8239$1");

  const trailingSpace = trailingPunctuation.slice(-1) === "—" ? "" : " ";

  return { leadingPunctuation, word, trailingPunctuation, trailingSpace };
}
