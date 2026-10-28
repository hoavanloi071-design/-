// Procedural Web Audio API cafe ambiance generator (Rain on window + Warm Vinyl Cafe Tone)

class CafeAmbianceEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private rainNode: AudioNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.2);
    this.masterGain.connect(this.ctx.destination);

    // Create 5 seconds loop of soft pink/brown rain noise
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration for rain sound
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 2.8; // gain boost
      // random soft vinyl pops
      if (Math.random() < 0.0003) {
        data[i] += (Math.random() - 0.5) * 1.5;
      }
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter for muffled rain against glass
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(650, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(120, this.ctx.currentTime);

    noise.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(this.masterGain);

    noise.start(0);
    this.noiseSource = noise;
    this.rainNode = highpass;
    this.isRunning = true;
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
      setTimeout(() => {
        try {
          if (this.noiseSource) {
            this.noiseSource.stop();
            this.noiseSource.disconnect();
          }
        } catch {
          // ignore
        }
        this.isRunning = false;
      }, 450);
    } else {
      this.isRunning = false;
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, vol));
      this.masterGain.gain.setTargetAtTime(clamped * 0.25, this.ctx.currentTime, 0.1);
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const cafeAudio = new CafeAmbianceEngine();
