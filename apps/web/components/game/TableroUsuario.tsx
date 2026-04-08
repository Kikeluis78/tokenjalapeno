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
    <section className="rounded-2xl border-2 border-white/20 bg-gradient-to-br from-green-600 to-green-700 p-3 shadow-xl">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-base">👤</span>
        <h3 className="text-xs font-bold uppercase tracking-wide text-white drop-shadow">Tu Tablero</h3>
      </div>

      {/* Borde blanco como en el carrusel */}
      <div className="rounded-xl border-4 border-white bg-white p-1.5">
        <div className="grid grid-cols-4 gap-0 overflow-hidden rounded-lg">
          {board.map((card) => {
            const isCalled = calledCards.includes(card.id);
            const isMarked = markedCards.includes(card.id);

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onMarkCard(card.id)}
                className={[
                  'relative aspect-square border border-gray-700 p-1 text-center transition active:scale-95',
                  isMarked
                    ? 'bg-emerald-500/90'
                    : isCalled
                      ? 'bg-amber-400/80'
                      : 'bg-gradient-to-br from-gray-900 to-gray-800',
                ].join(' ')}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <span className="text-2xl leading-none">{card.emoji}</span>
                  <span className="mt-0.5 text-[7px] font-bold leading-tight text-white">
                    {card.name}
                  </span>
                </div>
                {isMarked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/40">
                    <span className="text-3xl drop-shadow-lg">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
