'use client';

import { Card } from '@/lib/cards';

interface ContadorCartasProps {
  calledCardIds: number[];
  cardsById: Map<number, Card>;
}

export const ContadorCartas = ({ calledCardIds, cardsById }: ContadorCartasProps) => {
  const totalCards = 54;
  const remaining = totalCards - calledCardIds.length;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white/70">Cartas</span>
        <span className="text-lg font-black text-white">{remaining}/{totalCards}</span>
      </div>
    </div>
  );
};
