import { useEffect, useState, useCallback } from "react";

// Konami code: up up down down left right left right b a
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(onActivate: () => void) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        const next = index + 1;
        if (next === KONAMI.length) {
          onActivate();
          setIndex(0);
        } else {
          setIndex(next);
        }
      } else {
        setIndex(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, onActivate]);
}

// Click counter on a specific element — triggers after N clicks
export function useClickEasterEgg(threshold = 7) {
  const [clicks, setClicks] = useState(0);
  const [triggered, setTriggered] = useState(false);

  const onClick = useCallback(() => {
    setClicks((c) => {
      const next = c + 1;
      if (next >= threshold) {
        setTriggered(true);
        return 0;
      }
      return next;
    });
  }, [threshold]);

  const reset = useCallback(() => setTriggered(false), []);

  return { onClick, triggered, reset, clicks };
}
