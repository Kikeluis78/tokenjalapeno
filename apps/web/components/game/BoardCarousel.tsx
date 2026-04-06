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

      {/* Carrusel de tableros - DISEÑO SEGÚN PDF */}
      <div className="w-full max-w-4xl flex items-center justify-center gap-8 mb-8">
        {/* Flecha izquierda */}
        <button
          onClick={handlePrev}
          disabled={currentBoardIndex === 0}
          className="text-7xl text-red-500 disabled:opacity-30 transition hover:scale-110 active:scale-95 drop-shadow-lg"
        >
          ◀
        </button>

        {/* Tablero actual - CENTRADO Y GRANDE */}
        <motion.div
          key={currentBoardIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-shrink-0"
        >
          <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl p-6 shadow-2xl border-8 border-white">
            <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-2xl">
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
          className="text-7xl text-red-500 disabled:opacity-30 transition hover:scale-110 active:scale-95 drop-shadow-lg"
        >
          ▶
        </button>
      </div>

      {/* Botón seleccionar - ESTILO PDF */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={selectBoard}
        className="w-full max-w-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-3xl py-6 rounded-full shadow-2xl border-4 border-white mb-8"
      >
        Seleccionar
      </motion.button>

      {/* VS Indicator */}
      <div className="text-4xl font-black text-white drop-shadow-lg mb-4">
        VS
      </div>

      {/* Tablero de la IA - COMPACTO ABAJO */}
      <div className="w-full max-w-sm">
        <div className="bg-gray-900/90 rounded-2xl p-4 shadow-xl border-4 border-gray-600">
          <div className="bg-blue-700 rounded-lg p-2 mb-3 flex items-center justify-center gap-2">
            <span className="text-2xl">🤖</span>
            <p className="text-white font-bold text-center text-lg">IA</p>
          </div>
          <div className="grid grid-cols-4 gap-2 bg-gray-800 p-2 rounded-lg">
            {iaBoard?.map((card) => (
              <div key={card.id} className="bg-gray-700 rounded-lg p-2 flex flex-col items-center justify-center aspect-square border border-gray-600">
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
