'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOTTERY_CARDS } from '@/lib/cards';
import { useGameStore } from '@/lib/game/store';
import { notifyGameResult } from '@/lib/notifications';
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
  const [showPlayHint, setShowPlayHint] = useState(true);
  
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
    lastReward,
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

  // Notificar cuando hay un ganador
  useEffect(() => {
    if (winner && lastReward > 0) {
      notifyGameResult(winner === 'human', lastReward);
    }
  }, [winner, lastReward]);

  const cardsById = useMemo(() => {
    return new Map(LOTTERY_CARDS.map((card) => [card.id, card]));
  }, []);

  const handleStartGame = () => {
    setShowPlayHint(false);
    startCalling();
  };

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
          
          {/* Botón Play/Pause con mano y texto */}
          <div className="relative">
            <button
              type="button"
              onClick={isPlaying ? pauseCalling : handleStartGame}
              className="relative w-full transform rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-2.5 text-sm font-black text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-xl">{isPlaying ? '⏸️' : '▶️'}</span>
                <span className="text-xs">{isPlaying ? 'Pausa' : 'Play'}</span>
              </div>
            </button>
            
            {/* Mano y texto de ayuda - solo cuando no está jugando */}
            {!isPlaying && showPlayHint && (
              <div className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                <div className="animate-bounce text-4xl drop-shadow-2xl">
                  👆
                </div>
                <div className="whitespace-nowrap rounded-lg bg-black/80 px-2 py-1 text-[9px] font-bold text-yellow-300 shadow-lg">
                  Presiona para iniciar
                </div>
              </div>
            )}
          </div>
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
