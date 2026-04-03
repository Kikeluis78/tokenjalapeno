// Utilidades de audio para el juego
export class AudioManager {
  private audioContext: AudioContext | null = null;
  private backgroundMusic: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.05; // Volumen muy bajo
    }
  }

  // Música de fondo suave
  startBackgroundMusic() {
    if (!this.audioContext || this.backgroundMusic) return;

    this.backgroundMusic = this.audioContext.createOscillator();
    const filter = this.audioContext.createBiquadFilter();
    
    this.backgroundMusic.type = 'sine';
    this.backgroundMusic.frequency.setValueAtTime(220, this.audioContext.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    this.backgroundMusic.connect(filter);
    filter.connect(this.gainNode!);
    
    this.backgroundMusic.start();
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
      this.backgroundMusic = null;
    }
  }

  // Sonido de flecha
  playArrowSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Sonido de victoria
  playVictorySound() {
    if (!this.audioContext) return;

    const notes = [523, 659, 784, 1047];
    
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = this.audioContext!.createOscillator();
        const gain = this.audioContext!.createGain();
        
        oscillator.connect(gain);
        gain.connect(this.audioContext!.destination);
        
        oscillator.type = 'triangle';
        oscillator.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.3, this.audioContext!.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext!.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(this.audioContext!.currentTime + 0.5);
      }, index * 200);
    });
  }

  // Sonido de derrota
  playDefeatSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 1);
    
    gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 1);
  }
}

export const audioManager = new AudioManager();
