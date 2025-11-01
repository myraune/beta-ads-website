import { useRef, useEffect } from 'react';

export const useSoundEffects = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const isMuted = useRef(false);

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudio = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const playTone = (frequency: number, duration: number, volume: number = 0.1, type: OscillatorType = 'sine') => {
    if (isMuted.current || !audioContext.current) return;

    try {
      const ctx = audioContext.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = type;
      oscillator.frequency.value = frequency;

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  };

  const hover = () => {
    playTone(800, 0.05, 0.03, 'sine');
  };

  const click = () => {
    playTone(1200, 0.08, 0.05, 'sine');
    setTimeout(() => playTone(1400, 0.06, 0.04, 'sine'), 30);
  };

  const whoosh = () => {
    const ctx = audioContext.current;
    if (isMuted.current || !ctx) return;

    try {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  };

  const success = () => {
    playTone(800, 0.1, 0.06, 'sine');
    setTimeout(() => playTone(1000, 0.1, 0.05, 'sine'), 80);
    setTimeout(() => playTone(1200, 0.15, 0.06, 'sine'), 160);
  };

  const toggleMute = () => {
    isMuted.current = !isMuted.current;
    return isMuted.current;
  };

  return {
    hover,
    click,
    whoosh,
    success,
    toggleMute,
    isMuted: isMuted.current
  };
};
