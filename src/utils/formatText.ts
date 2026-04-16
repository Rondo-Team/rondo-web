export function formatText(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return words
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
