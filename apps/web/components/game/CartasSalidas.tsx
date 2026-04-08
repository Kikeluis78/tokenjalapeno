'use client';

import { Card } from '@/lib/cards';

interface CartasSalidasProps {
  calledCardIds: number[];
  cardsById: Map<number, Card>;
}

export const CartasSalidas = ({ calledCardIds, cardsById }: CartasSalidasProps) => {
  const calledCards = calledCardIds
    .map((cardId) => cardsById.get(cardId))
    .filter((card): card is Card => Boolean(card))
    .reverse()
    .slice(0, 8); // Solo mostrar las últimas 8

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-2">
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="text-xs">🃏</span>
        <h3 className="text-[10px] font-bold uppercase tracking-wide text-white/80">Salidas</h3>
      </div>

      <div className="max-h-[280px] space-y-1 overflow-y-auto">
        {calledCards.length > 0 ? (
          calledCards.map((card) => (
            <div
              key={card.id}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-2 py-1"
            >
              <span className="text-sm leading-none">{card.emoji}</span>
              <span className="text-[9px] font-medium leading-tight text-white/90">{card.name}</span>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-white/10 bg-black/10 px-2 py-2 text-center text-[9px] text-white/40">
            Sin cartas
          </div>
        )}
      </div>
    </section>
  );
};
