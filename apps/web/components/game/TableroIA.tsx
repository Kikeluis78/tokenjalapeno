'use client';

import { Card } from '@/lib/cards';

interface TableroIAProps {
  board: Card[];
  markedCards: number[];
}

export const TableroIA = ({ board, markedCards }: TableroIAProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-2.5">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm">🧠</span>
        <h3 className="text-[11px] font-bold uppercase tracking-wide text-white">Tablero IA</h3>
      </div>

      <div className="grid grid-cols-4 gap-1 opacity-70">
        {board.map((card) => {
          const isMarked = markedCards.includes(card.id);

          return (
            <div
              key={card.id}
              className={[
                'aspect-square rounded-lg border p-0.5',
                isMarked ? 'border-rose-400 bg-rose-500/20' : 'border-white/10 bg-black/20',
              ].join(' ')}
            >
              <div className="flex h-full flex-col items-center justify-center gap-0.5 rounded-md text-center">
                <span className="text-sm leading-none">{card.emoji}</span>
                <span className="line-clamp-2 text-[7px] leading-tight text-white/70">{card.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
