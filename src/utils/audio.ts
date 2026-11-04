// Subtle synthesized audio feedback & procedural ambient audio using the Web Audio API
// Lightweight, zero-asset, procedural sound design for responsive micro-interactions & background ambiance

class AudioManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.initContext();
      this.playChime();
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    return this.enabled;
  }

  public setSoundEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (this.enabled) {
      this.initContext();
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
  }

  // --- Background Ambient Audio Engine ---
  public startAmbient() {
    if (!this.enabled || this.isAmbientPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Master Ambient Gain Node
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      // Gentle fade in over 2 seconds to warm ambient volume (~0.02)
      masterGain.gain.linearRampToValueAtTime(0.022, this.ctx.currentTime + 2.0);
      masterGain.connect(this.ctx.destination);
      this.ambientGain = masterGain;

      // Warm Low-pass Filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);
      filter.connect(masterGain);

      // Low Frequency Oscillator (LFO) for gentle harmonic breathing (0.07Hz)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.07, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(120, this.ctx.currentTime); // mod range ±120Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      this.lfo = lfo;

      // 4 Tuned Harmonic Frequencies: C3 (130.81Hz), G3 (196.00Hz), D4 (293.66Hz), E4 (329.63Hz)
      const freqs = [130.81, 196.00, 293.66, 329.63];
      this.ambientOscs = freqs.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        // Slight micro-detune for organic tape shimmer
        const detuneCents = (idx - 1.5) * 3;
        osc.detune.setValueAtTime(detuneCents, this.ctx!.currentTime);

        oscGain.gain.setValueAtTime(0.25, this.ctx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        return osc;
      });

      this.isAmbientPlaying = true;
    } catch {
      // AudioContext policy fallback
    }
  }

  public stopAmbient() {
    if (!this.isAmbientPlaying || !this.ambientGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Smooth fade out over 0.8 seconds
      this.ambientGain.gain.linearRampToValueAtTime(0.00001, now + 0.8);

      setTimeout(() => {
        this.ambientOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        });
        this.ambientOscs = [];
        if (this.lfo) {
          try {
            this.lfo.stop();
            this.lfo.disconnect();
          } catch {}
          this.lfo = null;
        }
        if (this.ambientGain) {
          try {
            this.ambientGain.disconnect();
          } catch {}
          this.ambientGain = null;
        }
        this.isAmbientPlaying = false;
      }, 850);
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  // --- Interaction SFX ---
  public playClick(pitch: number = 800) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext policy fallback
    }
  }

  public playHover() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(540, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // ignore
    }
  }

  public playChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.06);

        gain.gain.setValueAtTime(0.03, this.ctx!.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + i * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + i * 0.06);
        osc.stop(this.ctx!.currentTime + i * 0.06 + 0.28);
      });
    } catch {
      // ignore
    }
  }
}

export const sound = new AudioManager();
