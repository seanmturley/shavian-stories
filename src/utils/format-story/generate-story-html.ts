import lintLatin from "@utils/format-story/lint-latin";

/**
 * Builds the story HTML from marked up Latin and Shavian inputs.
 *
 * @remarks
 * The input strings should be marked up in the following manner:
 *  - A section break is marked with a line containing `|||`
 *  - A heading is marked with leading `###`
 *  - A blockquoted paragraph is marked with leading `>>>`
 *  - Wrapping `<em>` tags are marked with opening `***` and closing `***`
 *
 * The Latin can be transliterated to Shavian using
 * {@link https://www.dechifro.org/shavian/ | Dechifro's tool}.
 *
 * @param latin - A marked up string of Latin text, linted with {@link lintLatin}.
 * @param shavian - The same {@link latin} text, transliterated into Shavian.
 *
 * @returns A 2-dimensional array:
 *  - The first dimension represents different sections;
 *  - The second dimension lists each line of HTML within that section, as a string.
 */
export default function generateStoryHtml(latin: string, shavian: string) {
  const [latinLines, shavianLines] = getLines(latin, shavian);

  let htmlArray = [];
  let sectionArray = [];

  for (let lineNumber = 0; lineNumber < latinLines.length; lineNumber++) {
    const latinLine = latinLines[lineNumber];
    const shavianLine = shavianLines[lineNumber];

    const newSection = /^\|{3}/;

    if (shavianLine.match(newSection)) {
      htmlArray.push(sectionArray);
      sectionArray = [];
      continue;
    }

    const header = addHeader(latinLine, shavianLine, lineNumber);
    if (header) {
      sectionArray.push(header);
      continue;
    }

    const blockquote = addBlockQuote(latinLine, shavianLine, lineNumber);
    if (blockquote) {
      sectionArray.push(blockquote);
      continue;
    }

    sectionArray.push(
      getLineHtml(latinLine, shavianLine, "paragraph", lineNumber)
    );
  }

  htmlArray.push(sectionArray);

  return htmlArray;
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

// function addSection(shavianLine: string) {
//   const sectionStart = /^\[{3}/;
//   const sectionEnd = /^\]{3}/;

//   if (shavianLine.match(sectionStart)) {
//     return "<section>";
//   }

//   if (shavianLine.match(sectionEnd)) {
//     return "</section>";
//   }
// }

function addHeader(
  latinLine: string,
  shavianLine: string,
  lineNumber?: number
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
  lineNumber?: number
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

export function getLineHtml(
  latinLine: string,
  shavianLine: string,
  type: "heading" | "paragraph",
  lineNumber?: number
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

  latinChunks.forEach((latinChunk, chunkNumber) => {
    let shavianChunk = shavianChunks[chunkNumber];

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

  lineHtml = lineHtml.trimEnd();

  lineHtml += "</span>";

  if (type === "heading") lineHtml += "</h1>";
  if (type === "paragraph") lineHtml += "</p>";

  return lineHtml;
}

function getChunks(
  latinLine: string,
  shavianLine: string,
  lineNumber?: number
) {
  const breakEmDashes = (text: string) => {
    return text.replaceAll(/—(»)?/g, "—$1 ");
  };

  // Here a "chunk" refers to a word and its adjacent punctuation
  const latinChunks = breakEmDashes(latinLine).trimEnd().split(/\s+/);
  const shavianChunks = breakEmDashes(shavianLine).trimEnd().split(/\s+/);

  if (latinChunks.length !== shavianChunks.length) {
    throw new Error(
      `The number of Latin chunks and Shavian chunks are not equal ${lineNumber && `in line ${lineNumber + 1}`}.`
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

  const wordAndPunctuation = /([^·\P{P}]*)([\p{L}\d·-]+)(\p{P}*)/u;
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
