export const useUtils = () => {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  /** @param {string} sentence */
  function capitalizeSentence(sentence) {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .toString()
      .replace(",", " ");
  }

  return { toTitleCase, capitalizeSentence };
};
