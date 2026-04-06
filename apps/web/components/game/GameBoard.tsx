'use client';

import { Card } from '@/lib/cards';

interface GameBoardProps {
  board: Card[];
  title: string;
  isIA?: boolean;
}

export const GameBoard = ({ board, title, isIA = false }: GameBoardProps) => {
  return (
    <div className="w-full">
      <h3 className="text-white font-black text-center mb-2">{title}</h3>
      <div className={`bg-yellow-600 rounded-2xl p-3 shadow-2xl ${isIA ? 'opacity-80' : ''}`}>
        <div className="grid grid-cols-4 gap-2">
          {board.map((card) => (
            <div 
              key={card.id}
              className="bg-white rounded-lg p-2 shadow-md flex flex-col items-center justify-center aspect-square hover:scale-105 transition cursor-pointer"
            >
              <span className="text-2xl">{card.emoji}</span>
              <span className="text-[0.6rem] font-bold text-gray-700 text-center">{card.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
