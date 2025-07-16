export const FormatSize = (bytes) => {
  if (bytes >= 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  } else if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else {
    return bytes + ' B';
  }
};
