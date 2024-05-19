export const capitalizeWordsInString = (words: string): string => {
  const capitalizeFirstLetterRegex = /(\b[a-z](?!\s))/g;
  return words.replace(capitalizeFirstLetterRegex, (x) => x.toUpperCase());
};
