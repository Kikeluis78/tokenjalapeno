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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-red-800 to-yellow-700 p-4 flex flex-col">
      {/* Header con scores */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-black text-lg shadow-lg border-2 border-blue-400">
          👤 TÚ: {humanScore}
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-black text-lg shadow-lg border-2 border-yellow-300">
          🏆 10 WLD
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-black text-lg shadow-lg border-2 border-red-400">
          🤖 IA: {iaScore}
        </div>
      </div>

      {/* Layout del juego - Mejorado */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Tablero Humano - MÁS GRANDE */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 rounded-3xl p-5 shadow-2xl border-4 border-yellow-300">
            <div className="bg-red-700 rounded-xl p-2 mb-4">
              <h3 className="text-white font-black text-center text-2xl">TU TABLERO</h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {selectedBoard.map((card) => {
                const { calledCards, humanMarked, markCard } = useGameStore.getState();
                const isMarked = humanMarked.includes(card.id);
                const isCalled = calledCards.includes(card.id);

                return (
                  <div
                    key={card.id}
                    onClick={() => markCard(card.id)}
                    className={`
                      bg-gradient-to-br from-white to-yellow-50 rounded-xl p-3 shadow-lg border-2 border-yellow-400 
                      flex flex-col items-center justify-center aspect-square relative
                      ${isCalled ? 'cursor-pointer hover:scale-110 hover:border-green-500' : ''}
                      transition-all duration-200
                    `}
                  >
                    <span className="text-4xl mb-1">{card.emoji}</span>
                    <span className="text-xs font-bold text-gray-800 text-center leading-tight">{card.name}</span>
                    
                    {/* Cacahuate cuando está marcado */}
                    {isMarked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-500/30 rounded-xl backdrop-blur-sm">
                        <span className="text-6xl drop-shadow-lg">🥜</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carta cantada (centro) - MEJORADO */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-6">
          {/* Carta actual */}
          <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl p-10 shadow-2xl w-full max-w-sm aspect-square flex flex-col items-center justify-center border-8 border-yellow-400">
            {currentCard ? (
              <>
                <span className="text-9xl mb-4 animate-bounce">{currentCard.emoji}</span>
                <p className="text-gray-900 font-black text-2xl text-center uppercase">{currentCard.name}</p>
              </>
            ) : (
              <>
                <span className="text-9xl mb-4 opacity-30">🎴</span>
                <p className="text-gray-500 font-bold text-xl">Esperando...</p>
              </>
            )}
          </div>
          
          {/* Controles */}
          <div className="w-full max-w-sm">
            {!isPlaying ? (
              <button 
                onClick={startCalling}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black text-2xl py-5 rounded-2xl shadow-2xl transition-all hover:scale-105 border-4 border-green-400"
              >
                ▶️ INICIAR JUEGO
              </button>
            ) : (
              <div className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-black text-2xl py-5 rounded-2xl shadow-2xl border-4 border-gray-500 text-center">
                ⏸️ JUGANDO...
              </div>
            )}
          </div>
        </div>

        {/* Tablero IA - MÁS PEQUEÑO */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/90 rounded-2xl p-4 shadow-2xl border-2 border-gray-600">
            <div className="bg-blue-700 rounded-lg p-2 mb-3">
              <h3 className="text-white font-bold text-center text-lg">TABLERO IA</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {iaBoard.map((card) => {
                const { iaMarked } = useGameStore.getState();
                const isMarked = iaMarked.includes(card.id);

                return (
                  <div
                    key={card.id}
                    className="bg-gray-700 rounded-lg p-2 flex flex-col items-center justify-center aspect-square relative border border-gray-600"
                  >
                    <span className="text-2xl mb-0.5">{card.emoji}</span>
                    <span className="text-[0.5rem] text-gray-300 text-center leading-tight">{card.name}</span>
                    
                    {isMarked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 rounded-lg">
                        <span className="text-4xl">🥜</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de victoria/derrota */}
      {winner && <VictoryModal />}
    </div>
  );
};
