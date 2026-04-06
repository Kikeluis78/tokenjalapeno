'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/lib/cards';
import { useGameStore } from '@/lib/game/store';

interface GameBoardProps {
  board: Card[];
  title: string;
  isIA?: boolean;
}

export const GameBoard = ({ board, title, isIA = false }: GameBoardProps) => {
  const { calledCards, humanMarked, iaMarked, markCard } = useGameStore();
  const [helpCards, setHelpCards] = useState<number[]>([]);

  useEffect(() => {
    if (isIA) return;

    // Ayuda visual: cartas cantadas no marcadas después de 5 segundos
    const timer = setInterval(() => {
      const needHelp = calledCards.filter(
        id => board.some(card => card.id === id) && !humanMarked.includes(id)
      );
      setHelpCards(needHelp);
    }, 5000);

    return () => clearInterval(timer);
  }, [calledCards, humanMarked, board, isIA]);

  const markedIds = isIA ? iaMarked : humanMarked;

  return (
    <div className="w-full">
      <h3 className="text-white font-black text-center mb-2">{title}</h3>
      <div className={`bg-yellow-600 rounded-2xl p-3 shadow-2xl ${isIA ? 'opacity-80' : ''}`}>
        <div className="grid grid-cols-4 gap-2">
          {board.map((card) => {
            const isMarked = markedIds.includes(card.id);
            const isCalled = calledCards.includes(card.id);
            const needsHelp = helpCards.includes(card.id);

            return (
              <div
                key={card.id}
                onClick={() => !isIA && markCard(card.id)}
                className={`
                  bg-white rounded-lg p-2 shadow-md flex flex-col items-center justify-center aspect-square relative
                  ${!isIA && isCalled ? 'cursor-pointer hover:scale-105' : ''}
                  ${needsHelp ? 'animate-pulse bg-yellow-100' : ''}
                  transition-all
                `}
              >
                <span className="text-2xl">{card.emoji}</span>
                <span className="text-[0.6rem] font-bold text-gray-700 text-center">{card.name}</span>
                
                {/* Cacahuate cuando está marcado */}
                {isMarked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-lg">
                    <span className="text-5xl">🥜</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
