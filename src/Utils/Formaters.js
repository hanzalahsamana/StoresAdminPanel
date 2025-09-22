import { CURRENCY } from '@/Structure/DefaultStructures';

export const formatNumberWithCommas = (num, decimals = 2, withCommas = true, wantCurrencyCode = true) => {
  if (num === null || num === undefined || isNaN(num)) return '0.00';

  const formatted = new Intl.NumberFormat('en-US', {
    useGrouping: withCommas,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);

  return wantCurrencyCode ? `${CURRENCY}${" "}${formatted}` : formatted;
};

export const abbreviateNumber = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num?.toString();
};
