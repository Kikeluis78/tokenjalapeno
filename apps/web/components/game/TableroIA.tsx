'use client';

import { Card } from '@/lib/cards';

interface TableroIAProps {
  board: Card[];
  markedCards: number[];
}

export const TableroIA = ({ board, markedCards }: TableroIAProps) => {
  return (
    <section className="rounded-lg border-2 border-green-600/40 bg-gradient-to-br from-green-600/10 to-green-700/10 p-2">
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="text-xs">🧠</span>
        <h3 className="text-[9px] font-bold uppercase tracking-wide text-white">IA</h3>
      </div>

      <div className="grid grid-cols-4 gap-0">
        {board.map((card) => {
          const isMarked = markedCards.includes(card.id);

          return (
            <div
              key={card.id}
              className={[
                'aspect-square border border-gray-700',
                isMarked ? 'bg-rose-500/70' : 'bg-gray-900/50',
              ].join(' ')}
            >
              <div className="flex h-full flex-col items-center justify-center">
                <span className="text-xs leading-none">{card.emoji}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
