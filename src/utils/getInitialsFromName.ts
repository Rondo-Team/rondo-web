export function getInitialsFromName(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "NI";

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
