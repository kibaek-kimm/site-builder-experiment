export function validateHex(hex: string) {
  const hexPattern = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})([A-Fa-f0-9]{2})?$/;
  return hexPattern.test(hex);
}
