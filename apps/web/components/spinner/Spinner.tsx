'use client';

import { useEffect, useRef } from 'react';
import { useSpinner } from '@/hooks/useSpinner';
import Image from 'next/image';

interface SpinnerProps {
  onComplete: () => void;
}

export const Spinner = ({ onComplete }: SpinnerProps) => {
  const { progress, isComplete } = useSpinner();
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (isComplete && !hasCompleted.current) {
      hasCompleted.current = true;
      onComplete();
    }
  }, [isComplete, onComplete]);

  const getProgressColor = (value: number): string => {
    if (value < 33) return 'bg-red-600';
    if (value < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#2b0f3a] via-[#5b1736] to-[#8a3a12] px-4 py-6">
      <div className="mb-8 flex w-full max-w-2xl justify-center">
        <div className="relative h-64 w-full animate-[floatTitle_3.2s_ease-in-out_infinite] sm:h-72">
          <Image
            src="/tituloLoteria.png"
            alt="Lotería Mexicana"
            fill
            sizes="(max-width: 640px) 100vw, 768px"
            className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="mb-6 flex w-full max-w-sm justify-center">
        <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-amber-400 to-green-500 p-1.5 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1f2937] p-3 animate-[pulse_2s_ease-in-out_infinite]">
            <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white/10">
              <Image
                src="/logoSpinner.png"
                alt="Jalapeño Token"
                fill
                sizes="224px"
                className="object-cover scale-[1.08] rounded-full"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 w-full max-w-sm">
        <div className="h-4 overflow-hidden rounded-full border-2 border-white/20 bg-gray-900/50 shadow-2xl">
          <div
            className={`h-full transition-all duration-300 ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-center text-xl font-black text-white drop-shadow-lg">
          {progress}%
        </p>
      </div>

      <div className="px-4 text-center space-y-2">
        <p className="text-xl font-black tracking-wide text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-[pulseText_2.4s_ease-in-out_infinite]">
          Juega y gana tokens
        </p>
        <p className="text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-[fadeLift_2.8s_ease-in-out_infinite]">
          y recompensas en <span className="text-blue-400">WLD</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes floatTitle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }

        @keyframes pulseText {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.88; }
        }

        @keyframes fadeLift {
          0%, 100% { transform: translateY(0px); opacity: 0.9; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
