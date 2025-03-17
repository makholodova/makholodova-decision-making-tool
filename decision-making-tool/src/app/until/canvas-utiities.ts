export function clearCanvas(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): void {
  context.resetTransform();
  context.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawCursor(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  context.beginPath();
  context.moveTo(centerX + radius + 20, centerY + 25);
  context.lineTo(centerX + radius + 7, centerY);
  context.lineTo(centerX + radius + 20, centerY - 25);
  context.lineTo(centerX + radius - 30, centerY);
  context.closePath();

  context.fillStyle = '#DBC7C9';
  context.fill();
  context.stroke();
}

export function drawStar(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const outerRadius: number = radius * 0.15;
  const innerRadius: number = outerRadius * 0.5;
  const points = 9;
  const angleStep: number = (Math.PI * 2) / (points * 2);

  context.beginPath();

  for (let index: number = 0; index < points * 2; index++) {
    const angle: number = index * angleStep - Math.PI / 2;
    const r: number = index % 2 === 0 ? outerRadius : innerRadius;
    const x: number = centerX + Math.cos(angle) * r;
    const y: number = centerY + Math.sin(angle) * r;

    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }

  context.closePath();
  context.fillStyle = '#DBC7C9';
  context.fill();
  context.stroke();
}
export function drawCircle(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fillStyle = '#F2F2EF';
  context.fill();
  context.stroke();
}
