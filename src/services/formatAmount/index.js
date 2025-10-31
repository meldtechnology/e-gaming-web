import { unitTens } from "../unitTens";

export const formatAmount = (amount) => {
  if(amount === undefined) return 0;
  return (amount > 1000000) ? unitTens(amount)
    : amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Truncate a number to a fixed number of decimals (no rounding).
 * E.g. truncFixed(1.69, 1) => 1.6
 */
function truncFixed(n, decimals) {
  const f = Math.pow(10, decimals);
  return Math.trunc(n * f) / f;
}

/**
 * Format a number into a short compact form using K, M, B, T.
 * - Default 1 decimal place, truncated (not rounded), e.g. 1.65M -> 1.6M
 * - Removes trailing ".0"
 * - Supports negatives and values < 1000 (keeps as-is with locale formatting)
 */
export const formatCompactNumber = ( value, options ) => {
  if (value === null || value === undefined) return "";
  const num = typeof value === "string" ? Number(value) : value;
  if (!isFinite(num)) return "";

  const decimals = options?.decimals ?? 1;
  const trimZeros = options?.trimZeros ?? true;
  const locale = options?.locale ?? "en-US";

  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const units = [
    { v: 1e12, s: "T" },
    { v: 1e9,  s: "B" },
    { v: 1e6,  s: "M" },
    { v: 1e3,  s: "K" },
  ];

  for (const u of units) {
    if (abs >= u.v) {
      const raw = abs / u.v; // e.g. 1650000 / 1e6 = 1.65
      const truncated = decimals > 0 ? truncFixed(raw, decimals) : Math.trunc(raw);
      let txt = truncated.toFixed(decimals);
      if (trimZeros && decimals > 0) {
        // remove trailing .0 or .00, etc.
        txt = txt.replace(/\.0+$/, "").replace(/(\.[1-9]*)0+$/, "$1");
      }
      return `${sign}${txt}${u.s}`;
    }
  }

  // For values < 1000, return as a normal localized number
  return num.toLocaleString(locale);
}

