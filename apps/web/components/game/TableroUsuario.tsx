'use client';

import { Card } from '@/lib/cards';
import { useGameStore } from '@/lib/game/store';

interface TableroUsuarioProps {
  board: Card[];
  calledCards: number[];
  markedCards: number[];
  onMarkCard: (cardId: number) => void;
}

export const TableroUsuario = ({ board, calledCards, markedCards, onMarkCard }: TableroUsuarioProps) => {
  const { shakeCardId } = useGameStore();

  return (
    <section className="flex max-h-[50vh] flex-col rounded-xl bg-gradient-to-br from-green-600 to-green-700 p-2 shadow-xl">
      <div className="mb-1.5 flex items-center gap-2 px-1">
        <span className="text-sm">👤</span>
        <h3 className="text-[10px] font-bold uppercase tracking-wide text-white drop-shadow">Tu Tablero</h3>
      </div>

      {/* Grid de cartas sin espacios */}
      <div className="overflow-hidden rounded-lg">
        <div className="grid grid-cols-4 gap-0">
          {board.map((card) => {
            const isCalled = calledCards.includes(card.id);
            const isMarked = markedCards.includes(card.id);
            const shouldShake = shakeCardId === card.id;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onMarkCard(card.id)}
                disabled={!isCalled || isMarked}
                className={[
                  'relative border border-gray-700 p-2 text-center transition active:scale-95 disabled:cursor-not-allowed',
                  isMarked
                    ? 'bg-emerald-500/90'
                    : 'bg-gradient-to-br from-gray-900 to-gray-800',
                  shouldShake ? 'animate-shake' : '',
                ].join(' ')}
              >
                <div className="flex h-full flex-col items-center justify-center gap-0.5">
                  <span className="text-3xl leading-none">{card.emoji}</span>
                  <span className="text-[8px] font-bold leading-tight text-white">
                    {card.name}
                  </span>
                </div>
                {isMarked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/60">
                    <span className="text-5xl drop-shadow-lg">🥜</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
