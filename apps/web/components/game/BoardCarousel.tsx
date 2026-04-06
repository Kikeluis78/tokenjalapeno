'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/store';
import { Card } from '@/lib/cards';

interface BoardCardProps {
  card: Card;
}

const BoardCard = ({ card }: BoardCardProps) => (
  <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl p-3 shadow-lg border-2 border-yellow-400 flex flex-col items-center justify-center aspect-square hover:scale-105 transition-transform">
    <span className="text-4xl mb-1">{card.emoji}</span>
    <span className="text-xs font-bold text-gray-800 text-center leading-tight">{card.name}</span>
  </div>
);

export const BoardCarousel = () => {
  const { allBoards, currentBoardIndex, iaBoard, setCurrentBoardIndex, selectBoard } = useGameStore();
  
  const currentBoard = allBoards[currentBoardIndex];
  
  const handlePrev = () => {
    if (currentBoardIndex > 0) {
      setCurrentBoardIndex(currentBoardIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentBoardIndex < allBoards.length - 1) {
      setCurrentBoardIndex(currentBoardIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-red-800 to-yellow-700 flex flex-col items-center justify-center px-4 py-8">
      {/* Instrucciones */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-3 animate-bounce">👆</div>
        <h2 className="text-3xl font-black text-white drop-shadow-lg mb-2">
          Selecciona tu tablero
        </h2>
        <p className="text-yellow-300 font-bold text-lg">
          Tablero {currentBoardIndex + 1} de {allBoards.length}
        </p>
      </motion.div>

      {/* Carrusel de tableros - TABLERO HUMANO MÁS GRANDE */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          {/* Flecha izquierda */}
          <button
            onClick={handlePrev}
            disabled={currentBoardIndex === 0}
            className="text-7xl text-white disabled:opacity-30 transition hover:scale-110 active:scale-95 drop-shadow-lg"
          >
            ←
          </button>

          {/* Tablero actual - MÁS GRANDE Y CON MEJOR DISEÑO */}
          <motion.div
            key={currentBoardIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 mx-6"
          >
            <div className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 rounded-3xl p-6 shadow-2xl border-4 border-yellow-300">
              <div className="bg-red-700 rounded-2xl p-1 mb-3">
                <h3 className="text-white font-black text-center text-xl">TU TABLERO</h3>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {currentBoard?.map((card) => (
                  <BoardCard key={card.id} card={card} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Flecha derecha */}
          <button
            onClick={handleNext}
            disabled={currentBoardIndex === allBoards.length - 1}
            className="text-7xl text-white disabled:opacity-30 transition hover:scale-110 active:scale-95 drop-shadow-lg"
          >
            →
          </button>
        </div>

        {/* Botón seleccionar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={selectBoard}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-black text-3xl py-5 rounded-2xl shadow-2xl border-4 border-white"
        >
          ✓ SELECCIONAR
        </motion.button>
      </div>

      {/* VS Indicator */}
      <div className="text-5xl font-black text-white drop-shadow-lg mb-4 animate-pulse">
        VS
      </div>

      {/* Tablero de la IA - MÁS PEQUEÑO */}
      <div className="w-full max-w-xs">
        <div className="bg-gray-900/80 rounded-xl p-3 shadow-xl border-2 border-gray-600">
          <div className="bg-blue-700 rounded-lg p-1 mb-2">
            <p className="text-white font-bold text-center text-sm">TABLERO IA</p>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {iaBoard?.map((card) => (
              <div key={card.id} className="bg-gray-700 rounded-md p-1.5 flex flex-col items-center justify-center aspect-square border border-gray-600">
                <span className="text-xl">{card.emoji}</span>
                <span className="text-[0.45rem] text-gray-300 text-center leading-tight">{card.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
