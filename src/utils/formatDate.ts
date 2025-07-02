export function formatReadableDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
