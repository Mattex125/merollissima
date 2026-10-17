// Formatting helpers. The site is English, whatever the locale of the machine
// that builds it, and content dates are UTC days.

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "12 October 2026" */
export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** "2026-10-12", for <time datetime>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
