'use client';

import { useGameStore } from '@/lib/game/store';
import { GameBoard } from './GameBoard';

export const GamePlay = () => {
  const { selectedBoard, iaBoard } = useGameStore();

  if (!selectedBoard) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-red-800 to-yellow-700 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
          👤 Humano: 0
        </div>
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold">
          🏆 Premio: 10 WLD
        </div>
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
          🤖 IA: 0
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
            <span className="text-8xl mb-4">🎴</span>
            <p className="text-gray-500 font-bold">Esperando carta...</p>
          </div>
          
          {/* Controles */}
          <div className="mt-4 space-y-2 w-full max-w-xs">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-xl shadow-lg">
              ▶️ INICIAR
            </button>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl shadow-lg">
              🏆 ¡LOTERÍA!
            </button>
          </div>
        </div>

        {/* Tablero IA */}
        <div className="md:col-span-1">
          <GameBoard board={iaBoard} title="TABLERO IA" isIA />
        </div>
      </div>
    </div>
  );
};
