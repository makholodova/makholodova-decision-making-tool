export function easeInOut(x: number): number {
  return x < 0.5 ? 4 * x ** 3 : 4 * x ** 3 - 12 * x ** 2 + 12 * x - 3;
}
