'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/game/store';
import { BoardCarousel, CardRain, GamePlay } from '@/components/game';

export default function GamePage() {
  const { gamePhase, generateBoards, resetGame } = useGameStore();
  
  useEffect(() => {
    resetGame();
    generateBoards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gamePhase === 'selection') {
    return <BoardCarousel />;
  }

  if (gamePhase === 'transition') {
    return <CardRain />;
  }

  return <GamePlay />;
}
