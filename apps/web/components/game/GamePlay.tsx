'use client';

import { useEffect, useMemo } from 'react';
import { LOTTERY_CARDS } from '@/lib/cards';
import { useGameStore } from '@/lib/game/store';
import { HeaderCarrusel } from './HeaderCarrusel';
import { TableroUsuario } from './TableroUsuario';
import { ContadorCartas } from './ContadorCartas';
import { TableroIA } from './TableroIA';
import { Footer } from './Footer';
import { VictoryModal } from './VictoryModal';

export const GamePlay = () => {
  const {
    selectedBoard,
    iaBoard,
    currentCard,
    isPlaying,
    calledCards,
    humanMarked,
    iaMarked,
    winner,
    startCalling,
    callNextCard,
    markCard,
  } = useGameStore();

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      callNextCard();
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, callNextCard]);

  const cardsById = useMemo(() => {
    return new Map(LOTTERY_CARDS.map((card) => [card.id, card]));
  }, []);

  if (!selectedBoard) return null;

  return (
    <div className="min-h-screen bg-[#111827] px-4 py-5 text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col gap-3">
        <HeaderCarrusel currentCard={currentCard} />

        <section className="grid grid-cols-[1.5fr_0.9fr] gap-2.5">
          <TableroUsuario
            board={selectedBoard}
            calledCards={calledCards}
            markedCards={humanMarked}
            onMarkCard={markCard}
          />

          <div className="flex flex-col gap-2.5">
            <ContadorCartas calledCardIds={calledCards} cardsById={cardsById} />
            <TableroIA board={iaBoard} markedCards={iaMarked} />
          </div>
        </section>

        <Footer isPlaying={isPlaying} onPlay={startCalling} />
      </div>

      {winner && <VictoryModal />}
    </div>
  );
};
