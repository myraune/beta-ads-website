import { useEffect, useRef } from 'react';

export const AmbientAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);
  const isMutedRef = useRef(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Check for saved mute state
    const savedMuteState = localStorage.getItem('ambientAudioMuted');
    if (savedMuteState === 'true') {
      isMutedRef.current = true;
      return;
    }

    const initAudio = () => {
      if (isInitializedRef.current || isMutedRef.current) return;
      
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;
        isInitializedRef.current = true;

        // Master gain for fade in/out
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0;
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Layer 1: Deep bass drone (100-150Hz)
        const bass = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bass.type = 'sine';
        bass.frequency.value = 120;
        bassGain.gain.value = 0.03;
        bass.connect(bassGain);
        bassGain.connect(masterGain);
        oscillatorsRef.current.push(bass);
        gainNodesRef.current.push(bassGain);

        // Layer 2: Mid atmospheric pad (300-400Hz)
        const mid = ctx.createOscillator();
        const midGain = ctx.createGain();
        mid.type = 'triangle';
        mid.frequency.value = 350;
        midGain.gain.value = 0.02;
        mid.connect(midGain);
        midGain.connect(masterGain);
        oscillatorsRef.current.push(mid);
        gainNodesRef.current.push(midGain);

        // Layer 3: High shimmer (2000-3000Hz)
        const high = ctx.createOscillator();
        const highGain = ctx.createGain();
        high.type = 'sine';
        high.frequency.value = 2500;
        highGain.gain.value = 0.008;
        high.connect(highGain);
        highGain.connect(masterGain);
        oscillatorsRef.current.push(high);
        gainNodesRef.current.push(highGain);

        // Start all oscillators
        oscillatorsRef.current.forEach(osc => osc.start());

        // Fade in over 2 seconds
        masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2);

        // Add subtle modulation to frequencies for organic feel
        const modulateBass = () => {
          if (!audioContextRef.current) return;
          const time = audioContextRef.current.currentTime;
          bass.frequency.setValueAtTime(120 + Math.sin(time * 0.1) * 10, time);
          mid.frequency.setValueAtTime(350 + Math.sin(time * 0.15) * 20, time);
          high.frequency.setValueAtTime(2500 + Math.sin(time * 0.2) * 100, time);
        };

        const modulationInterval = setInterval(modulateBass, 100);

        // Subtle percussive blips every 5-8 seconds
        const scheduleBlip = () => {
          if (!audioContextRef.current || isMutedRef.current) return;
          
          const blipOsc = ctx.createOscillator();
          const blipGain = ctx.createGain();
          blipOsc.type = 'sine';
          blipOsc.frequency.value = 800;
          blipGain.gain.value = 0.01;
          
          blipOsc.connect(blipGain);
          blipGain.connect(masterGain);
          
          const now = ctx.currentTime;
          blipGain.gain.setValueAtTime(0.01, now);
          blipGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          
          blipOsc.start(now);
          blipOsc.stop(now + 0.2);
          
          setTimeout(scheduleBlip, 5000 + Math.random() * 3000);
        };
        
        setTimeout(scheduleBlip, 3000);

        // Pause when tab is hidden
        const handleVisibilityChange = () => {
          if (!audioContextRef.current) return;
          
          if (document.hidden) {
            audioContextRef.current.suspend();
          } else {
            audioContextRef.current.resume();
          }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
          clearInterval(modulationInterval);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          oscillatorsRef.current.forEach(osc => {
            try {
              osc.stop();
            } catch (e) {
              // Already stopped
            }
          });
          if (audioContextRef.current) {
            audioContextRef.current.close();
          }
        };
      } catch (error) {
        console.warn('Ambient audio initialization failed:', error);
      }
    };

    // Initialize on first user interaction
    const handleInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return null;
};
