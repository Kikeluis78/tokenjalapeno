'use client';

import { Card } from '@/lib/cards';
import { useGameStore } from '@/lib/game/store';
import { useEffect, useState } from 'react';

interface TableroUsuarioProps {
  board: Card[];
  calledCards: number[];
  markedCards: number[];
  onMarkCard: (cardId: number) => void;
}

export const TableroUsuario = ({ board, calledCards, markedCards, onMarkCard }: TableroUsuarioProps) => {
  const { shakeCardId, isPlaying } = useGameStore();
  const [pulsingCards, setPulsingCards] = useState<number[]>([]);

  // Efecto para pulsar todas las cartas no marcadas cada 12 segundos
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Encontrar todas las cartas que han sido cantadas pero no marcadas
      const unmarkedCalledCards = calledCards.filter(
        cardId => !markedCards.includes(cardId) && board.some(c => c.id === cardId)
      );
      
      if (unmarkedCalledCards.length > 0) {
        setPulsingCards(unmarkedCalledCards);
        // Quitar el pulso después de 2 segundos
        setTimeout(() => setPulsingCards([]), 2000);
      }
    }, 12000); // Cada 12 segundos

    return () => clearInterval(interval);
  }, [isPlaying, calledCards, markedCards, board]);

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
            const shouldPulse = pulsingCards.includes(card.id);

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
                  shouldPulse ? 'animate-pulse-help' : '',
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
        @keyframes pulse-help {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
        .animate-pulse-help {
          animation: pulse-help 1s ease-in-out 2;
        }
      `}</style>
    </section>
  );
};
