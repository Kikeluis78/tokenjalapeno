'use client';

import { useState, useEffect } from 'react';

interface TutorialModalProps {
  onClose: () => void;
}

export const TutorialModal = ({ onClose }: TutorialModalProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [markedCards, setMarkedCards] = useState<number[]>([]);

  // Secuencia de cartas a marcar (índices: 0, 5, 10, 15 = diagonal)
  const markSequence = [0, 5, 10, 15];

  useEffect(() => {
    // Animación: marcar una carta cada 1.5 segundos
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % (markSequence.length + 1);
        if (next < markSequence.length) {
          setMarkedCards((marked) => [...marked, markSequence[next]]);
        } else {
          // Reiniciar animación
          setMarkedCards([]);
        }
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideTutorial', 'true');
    }
    onClose();
  };

  // Tablero de ejemplo (4x4 = 16 cartas)
  const exampleCards = [
    { id: 1, emoji: '🌵', name: 'El Nopal' },
    { id: 2, emoji: '🎸', name: 'El Músico' },
    { id: 3, emoji: '🌙', name: 'La Luna' },
    { id: 4, emoji: '⭐', name: 'La Estrella' },
    { id: 5, emoji: '🌮', name: 'El Taco' },
    { id: 6, emoji: '🎺', name: 'La Trompeta' },
    { id: 7, emoji: '🌶️', name: 'El Chile' },
    { id: 8, emoji: '🦅', name: 'El Águila' },
    { id: 9, emoji: '🎭', name: 'El Teatro' },
    { id: 10, emoji: '🌻', name: 'La Flor' },
    { id: 11, emoji: '🎪', name: 'El Circo' },
    { id: 12, emoji: '🌺', name: 'La Rosa' },
    { id: 13, emoji: '🎨', name: 'El Arte' },
    { id: 14, emoji: '🦜', name: 'El Loro' },
    { id: 15, emoji: '🎯', name: 'El Blanco' },
    { id: 16, emoji: '🌴', name: 'La Palma' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 p-6 shadow-2xl">
        
        {/* Título */}
        <h2 className="mb-4 text-center text-2xl font-black text-yellow-300 drop-shadow-lg">
          ¿Cómo Jugar Lotería? 🎮
        </h2>

        {/* Instrucciones paso a paso */}
        <div className="mb-4 space-y-2 rounded-xl bg-black/30 p-4">
          <p className="text-sm font-bold text-white">
            <span className="text-yellow-300">1.</span> Las cartas salen automáticamente cada 2 segundos
          </p>
          <p className="text-sm font-bold text-white">
            <span className="text-yellow-300">2.</span> Cuando salga una carta que tengas, <span className="text-green-400">tócala en tu tablero</span>
          </p>
          <p className="text-sm font-bold text-white">
            <span className="text-yellow-300">3.</span> Completa las <span className="text-yellow-300">16 cartas</span> antes que la IA
          </p>
        </div>

        {/* Tablero de ejemplo 4x4 con animación */}
        <div className="relative mb-4 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 p-3 shadow-xl">
          <div className="rounded-xl border-4 border-white bg-white p-1.5">
            <div className="grid grid-cols-4 gap-0.5">
              {exampleCards.map((card, index) => {
                const isMarked = markedCards.includes(index);
                const isCurrent = currentStep < markSequence.length && markSequence[currentStep] === index;
                
                return (
                  <div
                    key={card.id}
                    className={`relative aspect-square rounded-sm border transition-all duration-300 ${
                      isMarked 
                        ? 'border-green-500 bg-gradient-to-br from-green-600 to-green-700' 
                        : 'border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800'
                    } ${isCurrent ? 'ring-2 ring-yellow-400 ring-offset-1' : ''}`}
                  >
                    <div className="flex h-full flex-col items-center justify-center p-0.5">
                      <span className="text-lg leading-none">{card.emoji}</span>
                      <span className="mt-0.5 text-[6px] font-bold leading-tight text-white">{card.name}</span>
                    </div>
                    
                    {/* Cacahuate cuando está marcada */}
                    {isMarked && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl drop-shadow-lg animate-in zoom-in-50 duration-300">🥜</span>
                      </div>
                    )}
                    
                    {/* Mano animada en la carta actual */}
                    {isCurrent && (
                      <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2">
                        <div className="animate-bounce text-3xl drop-shadow-2xl">
                          👆
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Indicador de progreso */}
          <div className="mt-2 text-center">
            <p className="text-xs font-bold text-white">
              {markedCards.length > 0 && `${markedCards.length}/4 marcadas`}
              {markedCards.length === 4 && ' ✨ ¡Diagonal completa!'}
            </p>
          </div>
        </div>

        {/* Objetivo */}
        <div className="mb-4 rounded-xl bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-500/50 p-3 text-center">
          <p className="text-sm font-bold text-white">
            🏆 <span className="text-yellow-300">Gana tokens</span> al completar tu tablero antes que la IA
          </p>
        </div>

        {/* Checkbox */}
        <label className="mb-4 flex cursor-pointer items-center justify-center gap-2 text-white">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-300"
          />
          <span className="text-sm">No mostrar más</span>
        </label>

        {/* Botón */}
        <button
          onClick={handleClose}
          className="w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-lg font-black text-white shadow-lg transition hover:scale-105 active:scale-95"
        >
          ¡Entendido! 🚀
        </button>
      </div>
    </div>
  );
};
