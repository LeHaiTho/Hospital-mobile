const truncateText = (text) => {
  return text.length > 100 ? text.substring(0, 100) + "..." : text;
};

export { truncateText };
