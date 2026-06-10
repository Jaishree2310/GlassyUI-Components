import { PointerEvent, useCallback, useRef, useState } from 'react';

export interface LightReflection {
  x: number;
  y: number;
  opacity: number;
}

export const useLightReflection = <T extends HTMLElement>() => {
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef<LightReflection>({ x: 50, y: 20, opacity: 0.45 });
  const [reflection, setReflection] = useState<LightReflection>({
    x: 50,
    y: 20,
    opacity: 0.45,
  });

  const updateReflection = useCallback((nextReflection: LightReflection) => {
    pendingRef.current = nextReflection;

    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = requestAnimationFrame(() => {
      setReflection(pendingRef.current);
      frameRef.current = null;
    });
  }, []);

  const handleLightMove = useCallback(
    (event: PointerEvent<T>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      updateReflection({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
        opacity: 0.68,
      });
    },
    [updateReflection],
  );

  const softenReflection = useCallback(() => {
    updateReflection({ x: 50, y: 18, opacity: 0.38 });
  }, [updateReflection]);

  return {
    reflection,
    handleLightMove,
    softenReflection,
  };
};
