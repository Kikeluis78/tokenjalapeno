'use client';

import { Card } from '@/lib/cards';

interface ContadorCartasProps {
  calledCardIds: number[];
  cardsById: Map<number, Card>;
}

export const ContadorCartas = ({ calledCardIds, cardsById }: ContadorCartasProps) => {
  const calledCards = calledCardIds
    .map((cardId) => cardsById.get(cardId))
    .filter((card): card is Card => Boolean(card))
    .reverse();

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-2.5">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm">🪪</span>
        <h3 className="text-[11px] font-bold uppercase tracking-wide text-white">Cartas salidas</h3>
      </div>

      <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
        {calledCards.length > 0 ? (
          calledCards.map((card) => (
            <div
              key={card.id}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-2 py-1.5"
            >
              <span className="text-base leading-none">{card.emoji}</span>
              <span className="text-[10px] font-medium leading-tight text-white/85">{card.name}</span>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-black/10 px-2 py-3 text-center text-[10px] text-white/50">
            Aún no salen cartas.
          </div>
        )}
      </div>
    </section>
  );
};
