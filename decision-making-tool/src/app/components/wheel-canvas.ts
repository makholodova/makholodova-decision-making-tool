import type { OptionData } from '../types/interfaces';
import type { ElementCreator } from '../until/element-creator';
import { truncateText } from '../until/text-utiities';
import { getRandomColorRGB } from '../until/generate-colors';
import { shuffleArray } from '../until/shuffle-array';
import {
  clearCanvas,
  drawCircle,
  drawCursor,
  drawStar,
} from '../until/canvas-utiities';
import { easeInOut } from '../until/ease-in-out';
import type DecisionPickerView from '../view/main/decision-picker/decision-picker-view';

export class WheelCanvas {
  private decisionPickerView: DecisionPickerView;
  private listOfOptions: OptionData[];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private rotationAngle: number = 0;
  private isSpinning: boolean = false;
  private sectorColors: string[];
  private duration: number;
  private spinStartTime: number;
  private totalRotationAngle: number = 0;
  private totalDuration: number = 0;

  constructor(
    decisionPickerView: DecisionPickerView,
    listOfOptions: OptionData[],
    canvasElement: ElementCreator,
    seconds: number
  ) {
    this.decisionPickerView = decisionPickerView;
    this.listOfOptions = shuffleArray(listOfOptions);
    this.sectorColors = this.listOfOptions.map(() => getRandomColorRGB());
    this.canvas = canvasElement.getCanvasElement();
    this.ctx = canvasElement.getContext();
    this.duration = seconds;
    this.spinStartTime = 0;
    this.drawWheel();
  }

  public drawWheel(): void {
    this.ctx.strokeStyle = '#00000';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 50;
    const innerRadius = radius * 0.15;

    clearCanvas(this.ctx, this.canvas);
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.rotationAngle);
    this.ctx.translate(-centerX, -centerY);

    this.drawWheelBase(centerX, centerY, radius);
    this.drawWheelText(centerX, centerY, radius);
    this.ctx.restore();

    drawCircle(this.ctx, centerX, centerY, innerRadius);
    drawCursor(this.ctx, centerX, centerY, radius);
    drawStar(this.ctx, centerX, centerY, radius);
    if (this.isSpinning) {
      this.updatePickedOption();
    }
  }

  public spinWheel(seconds: number): void {
    this.duration = seconds;
    if (this.duration < 5) return;

    if (this.isSpinning) return;
    this.isSpinning = true;
    this.decisionPickerView.setDisabledState(this.isSpinning);
    this.decisionPickerView.showPickedOption(this.isSpinning);
    this.spinStartTime = Date.now();

    const rotationCount = this.duration + Math.random() * 3;
    this.totalRotationAngle = 2 * Math.PI * rotationCount;
    this.totalDuration = this.duration * 1000;

    requestAnimationFrame(this.animateSpin.bind(this));
  }

  private animateSpin(): void {
    const timeCount = Date.now() - this.spinStartTime;

    if (timeCount < this.totalDuration) {
      const timeProgress = Math.max(
        0,
        Math.min((Date.now() - this.spinStartTime) / (this.duration * 1000), 1)
      );
      const animationProgress = easeInOut(timeProgress);

      this.rotationAngle = this.totalRotationAngle * animationProgress;

      this.drawWheel();
      requestAnimationFrame(this.animateSpin.bind(this));
    } else {
      this.isSpinning = false;
      this.decisionPickerView.setDisabledState(this.isSpinning);
      this.decisionPickerView.showPickedOption(this.isSpinning);
      this.drawWheel();
    }
  }

  private drawWheelBase(
    centerX: number,
    centerY: number,
    radius: number
  ): void {
    const totalWeight: number = this.listOfOptions.reduce(
      (sum: number, option: OptionData): number => sum + Number(option.weight),
      0
    );
    let angleStart: number = -Math.PI / 2;

    for (let index = 0; index < this.listOfOptions.length; index++) {
      const weight: number =
        Number(this.listOfOptions[index].weight) / totalWeight;
      const angle: number = 2 * Math.PI * weight;
      const angleEnd: number = angleStart + angle;

      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, angleStart, angleEnd);
      this.ctx.closePath();

      this.ctx.fillStyle = this.sectorColors[index];
      this.ctx.fill();
      this.ctx.stroke();

      angleStart = angleEnd;
    }
  }
  private drawWheelText(
    centerX: number,
    centerY: number,
    radius: number
  ): void {
    const totalWeight: number = this.listOfOptions.reduce(
      (sum: number, option: OptionData): number => sum + Number(option.weight),
      0
    );
    let angleStart: number = -Math.PI / 2;

    this.ctx.fillStyle = '#FFF';
    this.ctx.font = '16px Arial';
    this.ctx.textBaseline = 'middle';

    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    this.ctx.shadowBlur = 4;
    this.ctx.shadowOffsetX = -2;
    this.ctx.shadowOffsetY = -2;

    for (const option of this.listOfOptions) {
      const weight: number = Number(option.weight) / totalWeight;
      const angle: number = 2 * Math.PI * weight;
      const angleEnd: number = angleStart + angle;

      this.ctx.save();
      this.ctx.translate(centerX, centerY);
      this.ctx.rotate(angleStart + angle / 2);

      const textX: number = radius * 0.3;
      const textY = 0;
      const maxTextWidth: number = radius * 0.4;

      let displayedText: string = option.title;

      const textWidth = this.ctx.measureText(displayedText).width;

      if (textWidth > maxTextWidth) {
        displayedText = truncateText(this.ctx, option.title, maxTextWidth);
      }

      const textFitAngle: number = textWidth / radius;
      if (textFitAngle / 2 > angle) {
        displayedText = '';
      }

      this.ctx.fillText(displayedText, textX, textY);
      this.ctx.restore();

      angleStart = angleEnd;
    }
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
  }

  private getCurrentPickedOption(): OptionData | undefined {
    let currentAngle =
      ((this.rotationAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    currentAngle = (-currentAngle + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI); // Корректируем направление

    let currentOption: OptionData | undefined = undefined;
    let angleStart = 0;

    for (const option of this.listOfOptions) {
      const weight: number = Number(option.weight);
      const totalWeight: number = this.listOfOptions.reduce(
        (sum: number, option: OptionData) => sum + Number(option.weight),
        0
      );
      const angle: number = (2 * Math.PI * weight) / totalWeight;
      const angleEnd: number = angleStart + angle;

      if (currentAngle >= angleStart && currentAngle < angleEnd) {
        currentOption = option;
        break;
      }

      angleStart = angleEnd;
    }

    return currentOption;
  }
  private updatePickedOption(): void {
    const pickedOption = this.getCurrentPickedOption();
    if (pickedOption) {
      this.decisionPickerView.setPickedOption(pickedOption.title);
    }
  }
}
