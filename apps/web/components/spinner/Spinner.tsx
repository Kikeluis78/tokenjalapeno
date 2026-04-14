'use client';

import { useEffect, useRef } from 'react';
import { useSpinner } from '@/hooks/useSpinner';
import Image from 'next/image';

interface SpinnerProps {
  onComplete: () => void;
}

export const Spinner = ({ onComplete }: SpinnerProps) => {
  const { progress, isComplete, currentSlide } = useSpinner();
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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#2b0f3a] via-[#5b1736] to-[#8a3a12]">
      
      {/* Página 1: Home con título y logo */}
      {currentSlide === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-6 animate-[fadeIn_0.5s_ease-in-out]">
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

          <div className="px-4 text-center space-y-2">
            <p className="text-xl font-black tracking-wide text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-[pulseText_2.4s_ease-in-out_infinite]">
              Juega y gana tokens
            </p>
            <p className="text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-[fadeLift_2.8s_ease-in-out_infinite]">
              y recompensas en <span className="text-blue-400">WLD</span>
            </p>
          </div>
        </div>
      )}

      {/* Página 2: Explicación del juego */}
      {currentSlide === 1 && (
        <div className="absolute inset-0 animate-[fadeIn_0.5s_ease-in-out]">
          <Image
            src="/juego2.png"
            alt="Juego de Lotería"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <h2 className="mb-6 text-4xl font-black text-yellow-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              ¡Diviértete Jugando!
            </h2>
            <p className="max-w-2xl text-2xl font-bold leading-relaxed text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Disfruta del tradicional juego de lotería mexicana y gana tokens en cada partida.
            </p>
            <p className="mt-4 text-3xl font-black text-green-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              ¡Hasta 30,000 tokens Jalapeño! 🌶️
            </p>
          </div>
        </div>
      )}

      {/* Página 3: Reglas de repartición */}
      {currentSlide === 2 && (
        <div className="absolute inset-0 animate-[fadeIn_0.5s_ease-in-out]">
          <Image
            src="/juego.png"
            alt="Reglas del Juego"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
            <h2 className="mb-8 text-4xl font-black text-yellow-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              Recompensas 🎁
            </h2>
            <div className="space-y-4 text-left">
              <div className="rounded-xl bg-black/50 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white drop-shadow-lg">
                  🎮 Avances a la IA: <span className="text-green-400">3 jalapeños</span>
                </p>
              </div>
              <div className="rounded-xl bg-black/50 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white drop-shadow-lg">
                  🤖 Gana la IA: <span className="text-yellow-400">1 jalapeño</span>
                </p>
              </div>
              <div className="rounded-xl bg-black/50 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white drop-shadow-lg">
                  🏆 Torneo semanal: <span className="text-orange-400">100 jalapeños</span>
                </p>
              </div>
              <div className="rounded-xl bg-black/50 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white drop-shadow-lg">
                  👑 Torneo mensual: <span className="text-red-400">1000 jalapeños</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barra de progreso (siempre visible) */}
      <div className="absolute bottom-8 left-1/2 w-full max-w-sm -translate-x-1/2 px-4">
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

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
