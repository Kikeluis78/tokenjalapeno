'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/game/store';
import { BoardCarousel, CardRain, GamePlay } from '@/components/game';

export default function GamePage() {
  const { gamePhase, generateBoards, resetGame, allBoards } = useGameStore();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    resetGame();
    generateBoards();
    setIsReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady || allBoards.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e]">
        <div className="text-center text-white">
          <div className="mb-4 text-4xl animate-pulse">🎲</div>
          <p>Generando tableros...</p>
        </div>
      </div>
    );
  }

  if (gamePhase === 'selection') {
    return <BoardCarousel />;
  }

  if (gamePhase === 'transition') {
    return <CardRain />;
  }

  return <GamePlay />;
}
