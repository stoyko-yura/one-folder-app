const capitalizeFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

const capitalizeEachLetters = (sentence: string): string => {
  const splitedSentence: string[] = sentence.split(' ');

  for (let i = 0; i < splitedSentence.length; i++) {
    const word = splitedSentence[i];

    splitedSentence[i] = capitalizeFirstLetter(word);
  }

  return splitedSentence.join(' ');
};

export const capitalize = (str: string): string => {
  if (str.split(' ').length) {
    return capitalizeEachLetters(str);
  }

  return capitalizeFirstLetter(str);
};
