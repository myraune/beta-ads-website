import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export const SoundControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const { toggleMute, click } = useSoundEffects();

  useEffect(() => {
    // Check both mute states
    const effectsMuted = localStorage.getItem('soundEffectsMuted') === 'true';
    const ambientMuted = localStorage.getItem('ambientAudioMuted') === 'true';
    setIsMuted(effectsMuted || ambientMuted);
  }, []);

  const handleToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Toggle both sound systems
    localStorage.setItem('soundEffectsMuted', String(newMutedState));
    localStorage.setItem('ambientAudioMuted', String(newMutedState));
    
    if (!newMutedState) {
      click();
    }
    
    // Require page reload for ambient audio changes
    if (newMutedState === false) {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg border-border hover:border-primary/50 transition-all duration-300 hover:scale-110"
      onClick={handleToggle}
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </Button>
  );
};
