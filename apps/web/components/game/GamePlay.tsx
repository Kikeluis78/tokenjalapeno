'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { LOTTERY_CARDS } from '@/lib/cards';
import { useGameStore } from '@/lib/game/store';
import { HeaderCarrusel } from './HeaderCarrusel';
import { TableroUsuario } from './TableroUsuario';
import { ContadorCartas } from './ContadorCartas';
import { CartasSalidas } from './CartasSalidas';
import { TableroIA } from './TableroIA';
import { VictoryModal } from './VictoryModal';

export const GamePlay = () => {
  const router = useRouter();
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e] px-3 py-4">
      {/* Botón salir */}
      <button
        onClick={() => router.push('/')}
        className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-600/80 text-white shadow-lg transition hover:bg-red-700 active:scale-95"
      >
        ✕
      </button>

      <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] gap-2">
        {/* Columna izquierda - Tablero Usuario */}
        <div className="flex flex-1 flex-col">
          <TableroUsuario
            board={selectedBoard}
            calledCards={calledCards}
            markedCards={humanMarked}
            onMarkCard={markCard}
          />
        </div>

        {/* Columna derecha */}
        <div className="flex w-32 flex-col gap-2">
          <HeaderCarrusel currentCard={currentCard} />
          <ContadorCartas calledCardIds={calledCards} cardsById={cardsById} />
          <CartasSalidas calledCardIds={calledCards} cardsById={cardsById} />
          <TableroIA board={iaBoard} markedCards={iaMarked} />
          
          {/* Botón Play */}
          <button
            type="button"
            onClick={startCalling}
            disabled={isPlaying}
            className="mt-auto transform rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/60 disabled:hover:scale-100"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>

      {winner && <VictoryModal />}
    </div>
  );
};
