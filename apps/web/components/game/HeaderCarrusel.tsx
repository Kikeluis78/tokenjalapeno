'use client';

import { Card } from '@/lib/cards';

interface HeaderCarruselProps {
  currentCard: Card | null;
}

export const HeaderCarrusel = ({ currentCard }: HeaderCarruselProps) => {
  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-2">
      <div className="mb-1 flex items-center gap-1.5">
        <span className="text-xs">🎴</span>
        <h3 className="text-[10px] font-bold uppercase tracking-wide text-white/80">Carta actual</h3>
      </div>

      {currentCard ? (
        <div className="rounded-lg border border-white/20 bg-gradient-to-br from-purple-600/30 to-pink-600/30 p-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{currentCard.emoji}</span>
            <div className="flex-1">
              <p className="text-xs font-bold text-white">{currentCard.name}</p>
              <p className="text-[9px] italic text-white/70">{currentCard.phrase}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-white/20 bg-black/20 p-3 text-center">
          <p className="text-[10px] text-white/50">Esperando...</p>
        </div>
      )}
    </section>
  );
};
