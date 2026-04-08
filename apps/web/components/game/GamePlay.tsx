'use client';

import { useEffect, useMemo } from 'react';
import { LOTTERY_CARDS } from '@/lib/cards';
import { useGameStore } from '@/lib/game/store';
import { HeaderCarrusel } from './HeaderCarrusel';
import { TableroUsuario } from './TableroUsuario';
import { ContadorCartas } from './ContadorCartas';
import { CartasSalidas } from './CartasSalidas';
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e] px-4 py-5 text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col gap-3">
        <HeaderCarrusel currentCard={currentCard} />

        <section className="grid grid-cols-[1fr_auto] gap-3">
          <TableroUsuario
            board={selectedBoard}
            calledCards={calledCards}
            markedCards={humanMarked}
            onMarkCard={markCard}
          />

          <div className="flex w-32 flex-col gap-2">
            <ContadorCartas calledCardIds={calledCards} cardsById={cardsById} />
            <CartasSalidas calledCardIds={calledCards} cardsById={cardsById} />
            <TableroIA board={iaBoard} markedCards={iaMarked} />
          </div>
        </section>

        <Footer isPlaying={isPlaying} onPlay={startCalling} />
      </div>

      {winner && <VictoryModal />}
    </div>
  );
};
