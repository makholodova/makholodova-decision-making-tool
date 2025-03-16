export class Sounds {
  public enabled: boolean;
  private winSound: HTMLAudioElement;

  constructor() {
    this.winSound = new Audio('./sounds/winSound.mp3');
    const savedSoundState = localStorage.getItem('soundEnabled');
    this.enabled = savedSoundState ? JSON.parse(savedSoundState) : false;
  }

  public toggleAudio(): void {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', JSON.stringify(this.enabled));
    console.log(this.enabled);
  }

  public playWinSound(): void {
    if (this.enabled) {
      this.winSound.play();
    }
  }
}
