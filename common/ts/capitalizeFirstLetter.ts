const capitalizeFirstLetter = (stringToCapitialize: string): string => {
  return `${stringToCapitialize
    .charAt(0)
    .toUpperCase()}${stringToCapitialize.slice(1)}`;
};

export default capitalizeFirstLetter;
