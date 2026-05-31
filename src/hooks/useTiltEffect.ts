import { PointerEvent, useCallback, useEffect, useRef, useState } from 'react';

export interface TiltTransform {
  rotateX: number;
  rotateY: number;
}

interface UseTiltEffectOptions {
  maxTilt: number;
  disabled?: boolean;
}

export const useTiltEffect = <T extends HTMLElement>({
  maxTilt,
  disabled = false,
}: UseTiltEffectOptions) => {
  const elementRef = useRef<T | null>(null);
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef<TiltTransform>({ rotateX: 0, rotateY: 0 });
  const [transform, setTransform] = useState<TiltTransform>({
    rotateX: 0,
    rotateY: 0,
  });

  const updateTransform = useCallback((nextTransform: TiltTransform) => {
    pendingRef.current = nextTransform;

    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = requestAnimationFrame(() => {
      setTransform(pendingRef.current);
      frameRef.current = null;
    });
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<T>) => {
      if (disabled || !elementRef.current) {
        return;
      }

      const rect = elementRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      updateTransform({
        rotateX: ((centerY - y) / centerY) * maxTilt,
        rotateY: ((x - centerX) / centerX) * maxTilt,
      });
    },
    [disabled, maxTilt, updateTransform],
  );

  const resetTilt = useCallback(() => {
    updateTransform({ rotateX: 0, rotateY: 0 });
  }, [updateTransform]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return {
    elementRef,
    transform,
    handlePointerMove,
    resetTilt,
  };
};
