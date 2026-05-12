export function capitalizeText(text: string) {
  const trimmedText = text.trim();
  if (!trimmedText) return "";

  return trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
}
