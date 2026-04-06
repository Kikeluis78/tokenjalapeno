'use client';

import { useEffect } from 'react';
import { useSpinner } from '@/hooks/useSpinner';
import Image from 'next/image';

interface SpinnerProps {
  onComplete: () => void;
}

export const Spinner = ({ onComplete }: SpinnerProps) => {
  const { progress, isComplete } = useSpinner();

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  const getProgressColor = (value: number): string => {
    if (value < 33) return 'bg-red-600';
    if (value < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 px-4 py-6">
      {/* Título Lotería - Arriba y más grande */}
      <div className="w-full max-w-lg flex justify-center mb-8">
        <div className="relative w-96 h-28">
          <Image
            src="/tituloLoteria.png"
            alt="Lotería Mexicana"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Logo Spinner - Circular sin fondo blanco */}
      <div className="w-full max-w-sm mb-12 flex justify-center">
        <div className="relative w-56 h-56 rounded-full overflow-hidden bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 p-1 animate-pulse shadow-2xl">
          <div className="w-full h-full rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
            <Image
              src="/logoSpinner.png"
              alt="Jalapeño Token"
              fill
              className="object-cover scale-110"
              priority
            />
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full max-w-sm mb-6">
        <div className="h-4 bg-gray-900/50 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
          <div
            className={`h-full transition-all duration-300 ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-center mt-2 font-black text-xl drop-shadow-lg">
          {progress}%
        </p>
      </div>

      {/* Subtítulo */}
      <div className="text-center space-y-3 px-4">
        <p className="text-xl font-bold text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse">
          Juega y gana tokens
        </p>
        <p className="text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          y recompensas en <span className="text-blue-400">WLD</span>
        </p>
      </div>
    </div>
  );
};
