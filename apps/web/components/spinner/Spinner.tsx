'use client';

import { useEffect } from 'react';
import { useSpinner } from '@/hooks/useSpinner';

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
      {/* Título Jalapeño Token - Optimizado para móvil */}
      <div className="w-full max-w-sm mb-6">
        <h2 className="text-4xl font-black text-red-600 drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] text-center leading-tight" style={{ fontFamily: 'var(--font-alfa-slab)' }}>
          JALAPEÑO<br />TOKEN<sup className="text-xl">®</sup>
        </h2>
      </div>

      {/* Imagen Jalapeño */}
      <div className="w-full max-w-xs aspect-square mb-8 flex items-center justify-center">
        <div className="text-8xl animate-bounce drop-shadow-2xl">🌶️</div>
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

      {/* Título estilo Lotería Mexicana */}
      <div className="text-center space-y-3 px-4">
        <h1 className="text-3xl font-black leading-tight">
          <span className="inline-block text-red-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">L</span>
          <span className="inline-block text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">O</span>
          <span className="inline-block text-green-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">T</span>
          <span className="inline-block text-blue-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">E</span>
          <span className="inline-block text-pink-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">R</span>
          <span className="inline-block text-orange-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Í</span>
          <span className="inline-block text-purple-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">A</span>
          <br />
          <span className="inline-block text-cyan-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">M</span>
          <span className="inline-block text-lime-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">E</span>
          <span className="inline-block text-rose-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">X</span>
          <span className="inline-block text-amber-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">I</span>
          <span className="inline-block text-teal-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">C</span>
          <span className="inline-block text-fuchsia-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">A</span>
          <span className="inline-block text-emerald-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">N</span>
          <span className="inline-block text-red-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] animate-pulse">A</span>
        </h1>
        
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
