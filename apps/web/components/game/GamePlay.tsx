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
      {/* Header con scores - COMPACTO */}
      <div className="flex justify-between items-center mb-4 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-black text-base shadow-lg border-2 border-blue-400 flex items-center gap-2">
          <span className="text-2xl">👤</span>
          <span>{humanScore}</span>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl font-black text-base shadow-lg border-2 border-yellow-300">
          🏆 10 WLD
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl font-black text-base shadow-lg border-2 border-red-400 flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span>{iaScore}</span>
        </div>
      </div>

      {/* Layout del juego - SEGÚN PDF */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Tablero Humano - IZQUIERDA (6 columnas) */}
        <div className="lg:col-span-6">
          <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl p-5 shadow-2xl border-8 border-white">
            <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-2xl">
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

        {/* Columna derecha - CARTA + IA (6 columnas) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Carta cantada - ARRIBA DERECHA */}
          <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl p-8 shadow-2xl border-8 border-yellow-400">
            {currentCard ? (
              <div className="flex flex-col items-center">
                <span className="text-8xl mb-3">{currentCard.emoji}</span>
                <p className="text-gray-900 font-black text-xl text-center uppercase mb-3">{currentCard.name}</p>
                {/* FRASE DEL CANTADOR */}
                <div className="bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg w-full">
                  <p className="text-sm font-bold text-center italic">"{currentCard.phrase}"</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-8">
                <span className="text-8xl mb-3 opacity-30">🎴</span>
                <p className="text-gray-500 font-bold text-lg">Esperando...</p>
              </div>
            )}
          </div>
          
          {/* Controles */}
          <div className="w-full">
            {!isPlaying ? (
              <button 
                onClick={startCalling}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black text-2xl py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 border-4 border-green-400 flex items-center justify-center gap-2"
              >
                <span className="text-3xl">▶️</span>
                <span>INICIAR</span>
              </button>
            ) : (
              <div className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-black text-2xl py-4 rounded-2xl shadow-2xl border-4 border-gray-500 text-center flex items-center justify-center gap-2">
                <span className="text-3xl">⏸️</span>
                <span>JUGANDO...</span>
              </div>
            )}
          </div>

          {/* Tablero IA - ABAJO DERECHA */}
          <div className="bg-gray-900/90 rounded-2xl p-4 shadow-2xl border-4 border-gray-600">
            <div className="bg-blue-700 rounded-lg p-2 mb-3 flex items-center justify-center gap-2">
              <span className="text-2xl">🤖</span>
              <h3 className="text-white font-bold text-center text-base">TABLERO IA</h3>
            </div>
            <div className="grid grid-cols-4 gap-2 bg-gray-800 p-2 rounded-lg">
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
