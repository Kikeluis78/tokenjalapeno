'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOTTERY_CARDS } from '@/lib/cards';
import { useGameStore } from '@/lib/game/store';
import { HeaderCarrusel } from './HeaderCarrusel';
import { TableroUsuario } from './TableroUsuario';
import { ContadorCartas } from './ContadorCartas';
import { TableroIA } from './TableroIA';
import { VictoryModal } from './VictoryModal';
import { Footer } from './Footer';
import { Header } from './Header';
import { TutorialModal } from '@/components/modals';

export const GamePlay = () => {
  const router = useRouter();
  const [showTutorial, setShowTutorial] = useState(false);
  
  const {
    selectedBoard,
    iaBoard,
    currentCard,
    isPlaying,
    autoPlay,
    calledCards,
    humanMarked,
    iaMarked,
    winner,
    humanScore,
    iaScore,
    startCalling,
    pauseCalling,
    callNextCard,
    markCard,
    toggleAutoPlay,
  } = useGameStore();

  // Verificar si mostrar tutorial
  useEffect(() => {
    const hideTutorial = localStorage.getItem('hideTutorial');
    if (!hideTutorial) {
      setShowTutorial(true);
    }
  }, []);

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e] px-3 py-3">
      {/* Header con balance y stats */}
      <Header />
      
      {/* Botón salir */}
      <button
        onClick={() => router.push('/')}
        className="absolute left-3 top-16 z-10 rounded-lg bg-red-600/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg transition hover:bg-red-700 active:scale-95"
      >
        ← Salir
      </button>

      <div className="mx-auto flex h-[100dvh] w-full max-w-[480px] gap-3 pt-20 pb-24">
        {/* Columna izquierda - Tablero Usuario */}
        <div className="flex flex-1 flex-col pt-4">
          <TableroUsuario
            board={selectedBoard}
            calledCards={calledCards}
            markedCards={humanMarked}
            onMarkCard={markCard}
          />
        </div>

        {/* Columna derecha */}
        <div className="flex w-32 flex-col gap-2">
          <ContadorCartas calledCardIds={calledCards} cardsById={cardsById} />
          <HeaderCarrusel currentCard={currentCard} />
          <TableroIA board={iaBoard} markedCards={iaMarked} />
          
          {/* Toggle AutoPlay */}
          <button
            type="button"
            onClick={toggleAutoPlay}
            className={[
              'transform rounded-lg py-2 text-xs font-bold transition hover:scale-105 active:scale-95',
              autoPlay
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-white/60',
            ].join(' ')}
          >
            {autoPlay ? '🤖 Automático' : 'Automático'}
          </button>
          
          {/* Botón Play/Pause con mano */}
          <button
            type="button"
            onClick={isPlaying ? pauseCalling : startCalling}
            className="relative transform rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105 active:scale-95"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">{isPlaying ? '⏸️' : '▶️'}</span>
              {!isPlaying && (
                <>
                  <span className="text-[10px] leading-none">Toca para</span>
                  <span className="text-[10px] leading-none">empezar</span>
                  <span className="absolute -right-1 -top-1 animate-bounce text-xl">👆</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer humanScore={humanScore} iaScore={iaScore} />

      {winner && <VictoryModal />}
      
      {/* Tutorial Modal */}
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
    </div>
  );
};
