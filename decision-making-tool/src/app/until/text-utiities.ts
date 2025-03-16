export function truncateText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string {
  const ellipsis = '...';
  let textWidth = context.measureText(text).width;

  while (text.length > 0 && textWidth > maxWidth) {
    text = text.slice(0, -1);
    textWidth = context.measureText(text + ellipsis).width;
  }

  return text + (textWidth > maxWidth ? '' : ellipsis);
}
