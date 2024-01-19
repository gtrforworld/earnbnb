const truncateStringMiddle = (str, maxLength = 12) => {
    if (str.length <= maxLength) {
      return str;
    }
  
    const ellipsisLength = 3; // Length of the ellipsis ("...")
  
    // Calculate the length of the truncated parts on both sides of the ellipsis
    const truncatedPartLength = (maxLength - ellipsisLength) / 2;
  
    // Truncate the string and add ellipsis in the middle
    const truncatedString =
      str.slice(0, Math.floor(truncatedPartLength)) +
      '...' +
      str.slice(-Math.ceil(truncatedPartLength));
  
    return truncatedString;
};

export default truncateStringMiddle;