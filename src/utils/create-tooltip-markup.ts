export function createStoryMarkup(latin: string, shavian: string) {
  const shavianTidy = replaceQuotesAndApostrophes(shavian);

  const [latinParagraphs, shavianParagraphs] = getParagraphs(
    latin,
    shavianTidy
  );

  let markup = "";

  latinParagraphs.forEach((latinParagraph, index) => {
    // Here a "chunk" refers to a word and its adjacent punctuation
    const [latinChunks, shavianChunks] = getChunks(
      latinParagraph,
      shavianParagraphs[index],
      index
    );

    // The span is used to provide consistent cursor styling
    // even between the tooltip anchors
    markup += "<p><span>";

    latinChunks.forEach((latinChunk, index) => {
      markup += getMarkedUpWord(latinChunk, shavianChunks[index]);
    });

    markup += "</span></p>";
  });

  return markup;
}

function replaceQuotesAndApostrophes(shavian: string) {
  return (
    shavian
      // Replace quotations marks (single or double) with guillemets
      // There are some corner cases where this won't work e.g.
      // Quotations inside a sentence like in "this" case.
      .replaceAll(/(?<!\p{L})['"‘“](?=\p{L})/gu, "«")
      .replaceAll(/(?<!\p{L})['"’”](?!\p{L})/gu, "»")
      // Remove all apostrphe's from Shavian
      .replaceAll(/\'/g, "")
  );
}

function getParagraphs(latin: string, shavian: string) {
  function splitParagraphs(text: string) {
    const paragraphRegex = /^(.+)$/gm;

    return Array.from(text.matchAll(paragraphRegex), (m) => m[1]);
  }

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
  function breakEmDashes(text: string) {
    return text.replaceAll("—", "— ");
  }

  // Here a "chunk" refers to a word and its adjacent punctuation
  const latinChunks = breakEmDashes(latin).split(/\s+/);
  const shavianChunks = breakEmDashes(shavian).split(/\s+/);

  if (latinChunks.length !== shavianChunks.length) {
    throw new Error(
      `The number of Latin words and Shavian words are not equal ${index !== null && `in paragraph ${index + 1}`}.`
    );
  }

  return [latinChunks, shavianChunks];
}

function getMarkedUpWord(latinChunk: string, shavianChunk: string) {
  const outerPunctuation = /^\p{P}+|\p{P}+$/gu;
  const latinWord = latinChunk.replaceAll(outerPunctuation, "");

  const wordAndPunctuation = /(\p{P}*)([\p{L}\d]+)(\p{P}*)/u;
  let [, leadingPunctuation, shavianWord, trailingPunctuation] =
    shavianChunk.match(wordAndPunctuation) as string[];

  if (trailingPunctuation !== "—") trailingPunctuation += " ";

  return `${leadingPunctuation}<a data-tooltip-id="latin" data-tooltip-content="${latinWord}">${shavianWord}</a>${trailingPunctuation}`;
}
