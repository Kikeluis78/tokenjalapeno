'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/lib/game/store';

export const BoardCarousel = () => {
  const { allBoards, currentBoardIndex, setCurrentBoardIndex, selectBoard } = useGameStore();
  const [showHand, setShowHand] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHand(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!allBoards || allBoards.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e]">
        <div className="text-center text-white">
          <div className="mb-4 text-4xl">🎲</div>
          <p>Generando tableros...</p>
        </div>
      </div>
    );
  }

  const currentBoard = allBoards[currentBoardIndex];

  if (!currentBoard) {
    return null;
  }

  const handlePrev = () => {
    if (currentBoardIndex > 0) {
      setCurrentBoardIndex(currentBoardIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentBoardIndex < allBoards.length - 1) {
      setCurrentBoardIndex(currentBoardIndex + 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e] px-4 py-6">
      {/* Efectos de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-green-600/20 blur-3xl" />
        <div className="absolute -right-20 bottom-40 h-96 w-96 animate-pulse rounded-full bg-yellow-600/20 blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto flex min-h-[50dvh] w-full max-w-[420px] flex-col justify-center gap-2">
        {/* Header */}
        <header className="mb-2 text-center">
          <h1 className="mb-2 text-3xl font-black uppercase tracking-wide text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            ¡Elige tu Tablero de la Suerte! 🍀
          </h1>
          <p className="text-sm font-bold text-white/80">Tablero {currentBoardIndex + 1} de {allBoards.length}</p>
        </header>

        {/* Tablero con fondo verde */}
        <section className="relative">
          {/* Contenedor verde (fondo del tablero) */}
          <div className=" bg-gradient-to-br from-green-600 to-green-700 p-4 shadow-2xl">
            {/* Borde blanco grueso */}
            <div className="rounded-2xl border-[6px] border-white bg-white p-2 shadow-inner">
              {/* Grid de cartas 4x4 sin gaps */}
              <div className="relative grid grid-cols-4 gap-0 overflow-hidden rounded-xl">
                {currentBoard.map((card) => (
                  <div
                    key={card.id}
                    className="relative aspect-square border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800"
                  >
                    <div className="flex h-full flex-col items-center justify-center p-1">
                      <span className="text-2xl leading-none">{card.emoji}</span>
                      <span className="mt-0.5 text-[7px] font-bold leading-tight text-white">{card.name}</span>
                    </div>
                  </div>
                ))}
                
                {/* Overlay blanco transparente */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
              </div>
            </div>

            {/* Flechas de navegación sobre el tablero */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentBoardIndex === 0}
                className="group relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-2xl text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl disabled:opacity-30 disabled:hover:scale-100"
              >
                <span className="drop-shadow-lg">◄</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentBoardIndex === allBoards.length - 1}
                className="group relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-2xl text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl disabled:opacity-30 disabled:hover:scale-100"
              >
                <span className="drop-shadow-lg">►</span>
              </button>
            </div>

            {/* Mano animada indicando swipe */}
            {showHand && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="animate-bounce text-6xl drop-shadow-2xl">
                  👆
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Botón Seleccionar con animación */}
        <button
          type="button"
          onClick={selectBoard}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 py-4 text-lg font-black text-white shadow-lg shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/60 active:scale-95 animate-pulse"
        >
          <span className="relative z-10">Seleccionar</span>
        </button>
      </div>
    </div>
  );
};
