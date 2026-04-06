'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/game/store';
import { GameBoard } from './GameBoard';
import { VictoryModal } from './VictoryModal';

export const GamePlay = () => {
  const { 
    selectedBoard, 
    iaBoard, 
    currentCard, 
    isPlaying, 
    humanScore, 
    iaScore,
    winner,
    startCalling,
    callNextCard
  } = useGameStore();

  // Cantador automático cada 2 segundos
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      callNextCard();
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, callNextCard]);

  if (!selectedBoard) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-red-800 to-yellow-700 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
          👤 Humano: {humanScore}
        </div>
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold">
          🏆 Premio: 10 WLD
        </div>
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
          🤖 IA: {iaScore}
        </div>
      </div>

      {/* Layout del juego */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tablero Humano */}
        <div className="md:col-span-1">
          <GameBoard board={selectedBoard} title="TU TABLERO" />
        </div>

        {/* Carta cantada (centro) */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-xs aspect-square flex flex-col items-center justify-center">
            {currentCard ? (
              <>
                <span className="text-8xl mb-4">{currentCard.emoji}</span>
                <p className="text-gray-900 font-black text-xl text-center">{currentCard.name}</p>
              </>
            ) : (
              <>
                <span className="text-8xl mb-4">🎴</span>
                <p className="text-gray-500 font-bold">Esperando carta...</p>
              </>
            )}
          </div>
          
          {/* Controles */}
          <div className="mt-4 space-y-2 w-full max-w-xs">
            {!isPlaying ? (
              <button 
                onClick={startCalling}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-xl shadow-lg transition"
              >
                ▶️ INICIAR
              </button>
            ) : (
              <button 
                disabled
                className="w-full bg-gray-600 text-white font-black py-3 rounded-xl shadow-lg opacity-50"
              >
                ⏸️ JUGANDO...
              </button>
            )}
          </div>
        </div>

        {/* Tablero IA */}
        <div className="md:col-span-1">
          <GameBoard board={iaBoard} title="TABLERO IA" isIA />
        </div>
      </div>

      {/* Modal de victoria/derrota */}
      {winner && <VictoryModal />}
    </div>
  );
};
