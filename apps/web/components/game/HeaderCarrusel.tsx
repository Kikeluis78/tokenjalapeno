'use client';

import { Card } from '@/lib/cards';

interface HeaderCarruselProps {
  currentCard: Card | null;
}

export const HeaderCarrusel = ({ currentCard }: HeaderCarruselProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
        Carta actual
      </p>

      <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl bg-black/20 px-4 py-5 text-center">
        {currentCard ? (
          <>
            <span className="mb-2 text-5xl leading-none">{currentCard.emoji}</span>
            <h2 className="text-lg font-bold text-white">{currentCard.name}</h2>
            <p className="mt-2 text-xs text-white/70">{currentCard.phrase}</p>
          </>
        ) : (
          <>
            <span className="mb-2 text-5xl leading-none text-white/30">🎴</span>
            <p className="text-sm font-medium text-white/60">Esperando primera carta</p>
          </>
        )}
      </div>
    </section>
  );
};
