export default function createTooltipMarkup(latin: string, shavian: string) {
  const latinWords = latin.split(/\s+/);
  const shavianWords = shavian.split(/\s+/);

  if (latinWords.length !== shavianWords.length) {
    throw new Error(
      "The number of Latin words and Shavian words must be equal."
    );
  }

  let markup = "";

  shavianWords.forEach((shavianWord, index) => {
    markup += `<a data-tooltip-id="latin" data-tooltip-content="${latinWords[index]}">${shavianWord}</a> `;
  });

  return markup.trim();
}
