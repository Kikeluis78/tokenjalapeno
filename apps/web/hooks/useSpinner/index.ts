'use client';

import { useState, useEffect, useRef } from 'react';

interface UseSpinnerReturn {
  progress: number;
  isComplete: boolean;
}

export const useSpinner = (): UseSpinnerReturn => {
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!doneRef.current) {
            doneRef.current = true;
            setTimeout(() => setIsComplete(true), 300);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { progress, isComplete };
};
