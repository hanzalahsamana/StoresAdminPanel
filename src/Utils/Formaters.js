import { CURRENCY } from '@/Structure/DefaultStructures';

export const formatNumberWithCommas = (num, decimals = 2, withCommas = true, wantCurrencyCode = true) => {
  if (num === null || num === undefined || isNaN(num)) return '0.00';

  const formatted = new Intl.NumberFormat('en-US', {
    useGrouping: withCommas,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);

  return wantCurrencyCode ? `${CURRENCY}${' '}${formatted}` : formatted;
};

export const abbreviateNumber = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num?.toString();
};

export const formatSize = (bytes) => {
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

export const formatRelativeTime = (isoDateString) => {
  const date = new Date(isoDateString);
  const now = new Date();

  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // Helper to format time as 12-hour with am/pm
  function formatTime(d) {
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // convert 0 to 12 for 12 AM
    const minStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minStr}${ampm}`;
  }

  // If date is today, show time
  if (diffDays === 0) {
    return formatTime(date);
  }

  // Yesterday
  if (diffDays === 1) {
    return 'Yesterday';
  }

  // Less than a month ago, show days ago
  if (diffDays < 30) {
    return `${diffDays} days ago`;
  }

  // Less than a year ago, show months ago
  if (diffMonths < 12) {
    return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
  }

  // Otherwise show years ago
  return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
};

export const formatAmount = (amount) => {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
