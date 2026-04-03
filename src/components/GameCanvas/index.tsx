'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GameHeader } from '@/components/GameHeader';
import { Tablero } from '@/components/Tablero';
import { CartaCantada } from '@/components/CartaCantada';
import { Footer } from '@/components/Footer';
import { CarruselOverlay } from '@/components/CarruselOverlay';
import { LOTTERY_CARDS } from '@/data/cards';
import confetti from 'canvas-confetti';

interface Card {
  id: number;
  name: string;
  emoji: string;
}

const generateRandomBoard = () => {
  const shuffled = [...LOTTERY_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 16);
};

export function GameCanvas() {
  const router = useRouter();
  const [humanScore, setHumanScore] = useState(0);
  const [iaScore, setIaScore] = useState(0);
  const [boardSelected, setBoardSelected] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [cantadasIds, setCantadasIds] = useState<number[]>([]);
  const [iaSelectedIds, setIaSelectedIds] = useState<number[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | undefined>(undefined);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [allBoards, setAllBoards] = useState(() => 
    Array.from({ length: 10 }, () => generateRandomBoard())
  );
  const [iaCards, setIaCards] = useState(() => generateRandomBoard());
  const [remainingCards, setRemainingCards] = useState<Card[]>([]);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [winner, setWinner] = useState<'human' | 'ia' | null>(null);

  // Detectar victoria - solo cuando se llenan los 16 espacios del cartón
  useEffect(() => {
    const humanBoard = allBoards[currentBoardIndex];
    const humanBoardIds = humanBoard.map(c => c.id);
    const humanMatches = selectedIds.filter(id => humanBoardIds.includes(id));
    
    const iaBoardIds = iaCards.map(c => c.id);
    const iaMatches = iaSelectedIds.filter(id => iaBoardIds.includes(id));
    
    if (humanMatches.length === 16) {
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
    } else if (iaMatches.length === 16) {
      setIsPlaying(false);
      setWinner('ia');
      setShowVictoryModal(true);
      setIaScore(prev => prev + 1);
    }
  }, [selectedIds, iaSelectedIds, allBoards, currentBoardIndex, iaCards]);

  useEffect(() => {
    if (gameStarted && isPlaying && remainingCards.length > 0) {
      const nextCard = remainingCards[0];
      setCurrentCard(nextCard);
      setCantadasIds(prev => [...prev, nextCard.id]);
      
      // Modo automático: marcar solo si la carta está en el tablero humano
      if (!isManualMode) {
        const humanBoard = allBoards[currentBoardIndex];
        if (humanBoard.some(c => c.id === nextCard.id)) {
          setSelectedIds(prev => [...prev, nextCard.id]);
        }
      }
      
      // IA marca solo si la carta está en su tablero
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
      
      const timeout = setTimeout(() => {
        setRemainingCards(prev => prev.slice(1));
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [gameStarted, isPlaying, remainingCards, isManualMode, iaCards, allBoards, currentBoardIndex]);

  const handleSelectBoard = () => {
    setBoardSelected(true);
  };

  const startGame = () => {
    setGameStarted(true);
    setIsPlaying(true);
    const shuffled = [...LOTTERY_CARDS].sort(() => Math.random() - 0.5);
    setRemainingCards(shuffled);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelect = (carta: Card) => {
    if (isManualMode && cantadasIds.includes(carta.id)) {
      const humanBoard = allBoards[currentBoardIndex];
      // Solo permitir marcar si la carta está en el tablero del jugador
      if (humanBoard.some(c => c.id === carta.id)) {
        setSelectedIds(prev => 
          prev.includes(carta.id) ? prev.filter(id => id !== carta.id) : [...prev, carta.id]
        );
      }
    }
  };

  const handlePrevBoard = () => {
    setCurrentBoardIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextBoard = () => {
    setCurrentBoardIndex(prev => Math.min(allBoards.length - 1, prev + 1));
  };

  const handleNewGame = () => {
    setShowVictoryModal(false);
    setBoardSelected(false);
    setGameStarted(false);
    setIsPlaying(false);
    setSelectedIds([]);
    setIaSelectedIds([]);
    setCantadasIds([]);
    setCurrentCard(undefined);
    setWinner(null);
    setAllBoards(Array.from({ length: 10 }, () => generateRandomBoard()));
    setIaCards(generateRandomBoard());
  };

  const handleContinueSameBoard = () => {
    setShowVictoryModal(false);
    setGameStarted(false);
    setIsPlaying(false);
    setSelectedIds([]);
    setIaSelectedIds([]);
    setCantadasIds([]);
    setCurrentCard(undefined);
    setWinner(null);
  };

  return (
    <div className="h-screen w-full bg-linear-to-br from-purple-900 via-pink-800 to-orange-600 flex flex-col">
      <GameHeader 
        humanScore={humanScore}
        iaScore={iaScore}
      />
      
      <div className="flex-1 overflow-auto p-2 pb-24">
        <div className="flex gap-4 h-full pb-8">
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
              {!boardSelected && (
                <CarruselOverlay
                  currentIndex={currentBoardIndex}
                  totalBoards={allBoards.length}
                  onPrev={handlePrevBoard}
                  onNext={handleNextBoard}
                  onSelect={handleSelectBoard}
                />
              )}
            </div>
            <div className={`transition-all ${gameStarted ? 'scale-[0.33]' : 'scale-100'} origin-top`}>
              <Tablero 
                cartas={iaCards}
                seleccionadoIds={iaSelectedIds}
                cantadasIds={cantadasIds}
                disabled={true}
                showOverlay={!gameStarted}
                overlayTitle={!gameStarted ? "IA" : ""}
                isIA={true}
              />
            </div>
          </div>
          
          {/* Columna derecha: Carta cantada */}
          <div className="w-[20%] max-w-25 flex flex-col gap-4">
            <CartaCantada 
              carta={currentCard} 
              isPlaying={isPlaying}
              onPlayPause={gameStarted ? togglePlayPause : startGame}
            />
            
            {boardSelected && !gameStarted && (
              <div className="w-full py-4 rounded-lg font-bold text-white text-xs shadow-lg flex flex-col items-center gap-1 bg-gray-500">
                <div className="text-2xl">👆</div>
                <div className="text-sm font-black">PRESIONA CANTAR</div>
                <div className="text-[10px] opacity-80 font-normal">Arriba para iniciar</div>
              </div>
            )}
            
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

            <button
              onClick={() => router.push('/')}
              className="w-full py-4 rounded-lg font-bold text-white text-xs shadow-lg flex flex-col items-center gap-1 bg-red-600 hover:bg-red-700 transition-colors"
            >
              <div className="text-2xl">🚪</div>
              <div className="text-sm font-black">SALIR</div>
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
            <h2 className="text-4xl font-black mb-4 text-gray-800">
              {winner === 'human' ? '¡VICTORIA HUMANA!' : '¡IA GANÓ!'}
            </h2>
            <p className="text-lg mb-8 text-gray-600">
              {winner === 'human' 
                ? '¡Felicidades! Has completado tu tablero y ganaste esta ronda' 
                : 'La IA completó su tablero primero. ¡Inténtalo de nuevo!'}
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleNewGame}
                className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg transition-colors"
              >
                🔄 Nuevo Tablero
              </button>
              <button
                onClick={handleContinueSameBoard}
                className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-lg transition-colors"
              >
                ▶️ Mismo Tablero
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
