'use client';

import { useState, useEffect, useRef } from 'react';

interface UseSpinnerReturn {
  progress: number;
  isComplete: boolean;
  currentSlide: number;
}

export const useSpinner = (): UseSpinnerReturn => {
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const doneRef = useRef(false);

  useEffect(() => {
    // 18 segundos total = 18000ms
    // Incremento cada 180ms para llegar a 100 en 18s
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        
        // Cambiar slides según el progreso
        if (next >= 22 && next < 56) {
          setCurrentSlide(1); // Página 2: 22-55% (6 segundos)
        } else if (next >= 56) {
          setCurrentSlide(2); // Página 3: 56-100% (8 segundos)
        }
        
        if (next >= 100) {
          clearInterval(interval);
          if (!doneRef.current) {
            doneRef.current = true;
            setTimeout(() => setIsComplete(true), 300);
          }
          return 100;
        }
        return next;
      });
    }, 180);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { progress, isComplete, currentSlide };
};
