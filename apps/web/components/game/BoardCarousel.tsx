'use client';

import { useGameStore } from '@/lib/game/store';
import { SelectionFooter } from './SelectionFooter';

export const BoardCarousel = () => {
  const { allBoards, currentBoardIndex, setCurrentBoardIndex, selectBoard } = useGameStore();

  if (!allBoards || allBoards.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111827]">
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
    <div className="min-h-screen bg-[#111827] px-4 py-5 text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col gap-5">
        <header className="space-y-2 text-center">
          <h1 className="text-base font-bold uppercase tracking-[0.18em] text-white">Selecciona tablero</h1>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentBoardIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-lg text-white transition disabled:opacity-30"
            >
              ←
            </button>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-4 gap-1.5 rounded-2xl bg-black/20 p-2.5">
                {currentBoard.map((card) => (
                  <div
                    key={card.id}
                    className="aspect-square rounded-xl border border-white/10 bg-white/10 p-1"
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg text-center">
                      <span className="text-[22px] leading-none">{card.emoji}</span>
                      <span className="line-clamp-2 text-[8px] leading-tight text-white/80">{card.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentBoardIndex === allBoards.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-lg text-white transition disabled:opacity-30"
            >
              →
            </button>
          </div>
        </section>

        <SelectionFooter selectedIndex={currentBoardIndex} onSelect={selectBoard} />
      </div>
    </div>
  );
};
