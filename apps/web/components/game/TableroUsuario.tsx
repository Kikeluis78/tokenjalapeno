'use client';

import { Card } from '@/lib/cards';

interface TableroUsuarioProps {
  board: Card[];
  calledCards: number[];
  markedCards: number[];
  onMarkCard: (cardId: number) => void;
}

export const TableroUsuario = ({ board, calledCards, markedCards, onMarkCard }: TableroUsuarioProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-base">👤</span>
        <h3 className="text-xs font-bold uppercase tracking-wide text-white">Usuario</h3>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {board.map((card) => {
          const isCalled = calledCards.includes(card.id);
          const isMarked = markedCards.includes(card.id);

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onMarkCard(card.id)}
              className={[
                'aspect-square rounded-xl border p-1 text-center transition active:scale-95',
                isMarked
                  ? 'border-emerald-400 bg-emerald-500/20'
                  : isCalled
                    ? 'border-amber-300 bg-amber-400/10'
                    : 'border-white/10 bg-black/20',
              ].join(' ')}
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg">
                <span className="text-[22px] leading-none">{card.emoji}</span>
                <span className="line-clamp-2 text-[9px] font-medium leading-tight text-white">
                  {card.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
