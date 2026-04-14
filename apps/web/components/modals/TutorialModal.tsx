'use client';

import { useState, useEffect } from 'react';

interface TutorialModalProps {
  onClose: () => void;
}

export const TutorialModal = ({ onClose }: TutorialModalProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideTutorial', 'true');
    }
    onClose();
  };

  // Tablero de ejemplo (4 cartas)
  const exampleCards = [
    { id: 1, emoji: '🌵', name: 'El Nopal' },
    { id: 2, emoji: '🎸', name: 'El Músico' },
    { id: 3, emoji: '🌙', name: 'La Luna' },
    { id: 4, emoji: '⭐', name: 'La Estrella' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 p-6 shadow-2xl">
        
        {/* Título */}
        <h2 className="mb-4 text-center text-2xl font-black text-yellow-300 drop-shadow-lg">
          ¿Cómo Jugar? 🎮
        </h2>

        {/* Instrucciones */}
        <p className="mb-6 text-center text-white">
          Cuando salga una carta, <span className="font-bold text-yellow-300">toca</span> la imagen en tu tablero:
        </p>

        {/* Tablero de ejemplo */}
        <div className="relative mb-6 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 p-4 shadow-xl">
          <div className="rounded-xl border-4 border-white bg-white p-2">
            <div className="grid grid-cols-2 gap-1">
              {exampleCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`relative aspect-square rounded-lg border-2 border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 ${
                    index === 0 ? 'ring-4 ring-yellow-400 ring-offset-2' : ''
                  }`}
                >
                  <div className="flex h-full flex-col items-center justify-center p-2">
                    <span className="text-3xl">{card.emoji}</span>
                    <span className="mt-1 text-[8px] font-bold text-white">{card.name}</span>
                  </div>
                  
                  {/* Mano animada en la primera carta */}
                  {index === 0 && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="animate-bounce text-4xl drop-shadow-2xl">
                        👆
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objetivo */}
        <div className="mb-6 rounded-xl bg-black/30 p-4 text-center">
          <p className="text-sm font-bold text-white">
            🎯 <span className="text-yellow-300">Completa una línea</span> (horizontal, vertical o diagonal) para ganar
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

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};
