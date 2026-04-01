'use client';

import React, { useState, useEffect } from 'react';
import { GameHeader } from '@/components/GameHeader';
import { Tablero } from '@/components/Tablero';
import { CartaCantada } from '@/components/CartaCantada';
import { Footer } from '@/components/Footer';
import { CarruselOverlay } from '@/components/CarruselOverlay';
import { LOTTERY_CARDS } from '@/data/cards';
import confetti from 'canvas-confetti';

const generateRandomBoard = () => {
  const shuffled = [...LOTTERY_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 16);
};

export function GameCanvas() {
  const [humanScore, setHumanScore] = useState(0);
  const [iaScore, setIaScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [cantadasIds, setCantadasIds] = useState<number[]>([]);
  const [iaSelectedIds, setIaSelectedIds] = useState<number[]>([]);
  const [currentCard, setCurrentCard] = useState<any>(null);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [allBoards] = useState(() => 
    Array.from({ length: 10 }, () => generateRandomBoard())
  );
  const [iaCards] = useState(() => generateRandomBoard());
  const [remainingCards, setRemainingCards] = useState<any[]>([]);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [winner, setWinner] = useState<'human' | 'ia' | null>(null);

  // Detectar victoria
  useEffect(() => {
    if (selectedIds.length === 16) {
      setIsPlaying(false);
      setWinner('human');
      setShowVictoryModal(true);
      setHumanScore(prev => prev + 1);
      
      // Confeti
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ['#16a34a', '#ef4444', '#fbbf24'];
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } else if (iaSelectedIds.length === 16) {
      setIsPlaying(false);
      setWinner('ia');
      setShowVictoryModal(true);
      setIaScore(prev => prev + 1);
    }
  }, [selectedIds, iaSelectedIds]);

  useEffect(() => {
    if (gameStarted && isPlaying && remainingCards.length > 0) {
      const interval = setInterval(() => {
        const nextCard = remainingCards[0];
        setCurrentCard(nextCard);
        setCantadasIds(prev => [...prev, nextCard.id]);
        setRemainingCards(prev => prev.slice(1));
        
        // Modo automático: marcar en tablero humano
        if (!isManualMode) {
          setSelectedIds(prev => [...prev, nextCard.id]);
        }
        
        // IA siempre marca automáticamente
        if (iaCards.some(c => c.id === nextCard.id)) {
          setIaSelectedIds(prev => [...prev, nextCard.id]);
        }
        
        // Voz
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(nextCard.name);
          utterance.lang = 'es-MX';
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [gameStarted, isPlaying, remainingCards, isManualMode, iaCards]);

  const startGame = () => {
    setGameStarted(true);
    const shuffled = [...LOTTERY_CARDS].sort(() => Math.random() - 0.5);
    setRemainingCards(shuffled);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const pauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleSelect = (carta: any) => {
    if (isManualMode && cantadasIds.includes(carta.id)) {
      setSelectedIds(prev => 
        prev.includes(carta.id) ? prev.filter(id => id !== carta.id) : [...prev, carta.id]
      );
    }
  };

  const handlePrevBoard = () => {
    setCurrentBoardIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextBoard = () => {
    setCurrentBoardIndex(prev => Math.min(allBoards.length - 1, prev + 1));
  };

  const handleSelectBoard = () => {
    startGame();
  };

  return (
    <div className="h-screen w-full bg-linear-to-br from-purple-900 via-pink-800 to-orange-600 flex flex-col">
      <GameHeader 
        humanScore={humanScore}
        iaScore={iaScore}
        gameStarted={gameStarted}
        isPaused={isPaused}
        onStartGame={startGame}
        onPauseResume={pauseResume}
      />
      
      <div className="flex-1 overflow-auto p-2 pb-16">
        <div className="flex gap-4 h-full">
          {/* Columna izquierda: 2 tableros */}
          <div className={`flex flex-col gap-2 transition-all ${isManualMode ? 'flex-[4]' : 'flex-1'}`}>
            <div className="relative">
              <Tablero 
                cartas={allBoards[currentBoardIndex]}
                seleccionadoIds={selectedIds}
                cantadasIds={cantadasIds}
                onSeleccionar={handleSelect}
                showPeanut={isManualMode}
              />
              {!gameStarted && (
                <CarruselOverlay
                  currentIndex={currentBoardIndex}
                  totalBoards={allBoards.length}
                  onPrev={handlePrevBoard}
                  onNext={handleNextBoard}
                  onSelect={handleSelectBoard}
                />
              )}
            </div>
            <div className={`transition-all ${isManualMode ? 'scale-[0.33]' : 'scale-100'} origin-top`}>
              <Tablero 
                cartas={iaCards}
                seleccionadoIds={iaSelectedIds}
                cantadasIds={cantadasIds}
                disabled={true}
                showOverlay={!isPlaying}
                overlayTitle="TABLERO IA"
              />
            </div>
          </div>
          
          {/* Columna derecha: Carta cantada */}
          <div className="w-[20%] max-w-25 flex flex-col gap-4">
            <CartaCantada 
              carta={currentCard} 
              isPlaying={isPlaying}
              onPlayPause={togglePlayPause}
            />
            
            <button
              onClick={() => setIsManualMode(!isManualMode)}
              className="w-full py-4 rounded-lg font-bold text-white text-xs shadow-lg flex flex-col items-center gap-1"
              style={{ backgroundColor: isManualMode ? '#8b5cf6' : '#3b82f6' }}
            >
              <div className="text-2xl">
                {isManualMode ? '🥜' : '🤖'}
              </div>
              <div className="text-sm font-black">
                {isManualMode ? 'MODO MANUAL' : 'MODO AUTO'}
              </div>
              <div className="text-[10px] opacity-80 font-normal">
                {isManualMode 
                  ? 'Marca con cacahuate' 
                  : 'Marcado automático'}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de Victoria */}
      {showVictoryModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
            <div className="text-8xl mb-4">
              {winner === 'human' ? '🎉' : '🤖'}
            </div>
            <h2 className="text-4xl font-black mb-4">
              {winner === 'human' ? '¡LOTERÍA!' : '¡IA GANÓ!'}
            </h2>
            <p className="text-xl mb-6">
              {winner === 'human' 
                ? '¡Felicidades! Completaste tu tablero' 
                : 'La IA completó su tablero primero'}
            </p>
            <button
              onClick={() => setShowVictoryModal(false)}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg text-xl"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
