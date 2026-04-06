'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/store';
import { Card } from '@/lib/cards';

interface BoardCardProps {
  card: Card;
}

const BoardCard = ({ card }: BoardCardProps) => (
  <div className="bg-white rounded-lg p-2 shadow-md flex flex-col items-center justify-center aspect-square">
    <span className="text-3xl">{card.emoji}</span>
    <span className="text-xs font-bold text-gray-700 text-center mt-1">{card.name}</span>
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
        className="text-center mb-6"
      >
        <div className="text-6xl mb-2 animate-bounce">👆</div>
        <h2 className="text-2xl font-black text-white drop-shadow-lg">
          Selecciona tu tablero
        </h2>
        <p className="text-yellow-300 font-bold">
          Tablero {currentBoardIndex + 1} de {allBoards.length}
        </p>
      </motion.div>

      {/* Carrusel de tableros */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-4">
          {/* Flecha izquierda */}
          <button
            onClick={handlePrev}
            disabled={currentBoardIndex === 0}
            className="text-6xl text-white disabled:opacity-30 transition hover:scale-110 active:scale-95"
          >
            ←
          </button>

          {/* Tablero actual */}
          <motion.div
            key={currentBoardIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 mx-4"
          >
            <div className="bg-yellow-600 rounded-2xl p-4 shadow-2xl">
              <div className="grid grid-cols-4 gap-2">
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
            className="text-6xl text-white disabled:opacity-30 transition hover:scale-110 active:scale-95"
          >
            →
          </button>
        </div>

        {/* Botón seleccionar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={selectBoard}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-black text-2xl py-4 rounded-2xl shadow-2xl"
        >
          SELECCIONAR
        </motion.button>
      </div>

      {/* Tablero de la IA (abajo) */}
      <div className="w-full max-w-xs">
        <p className="text-white font-bold text-center mb-2">Tablero de la IA</p>
        <div className="bg-gray-800/50 rounded-2xl p-3 shadow-xl">
          <div className="grid grid-cols-4 gap-1.5">
            {iaBoard?.map((card) => (
              <div key={card.id} className="bg-gray-700 rounded-md p-1 flex flex-col items-center justify-center aspect-square">
                <span className="text-xl">{card.emoji}</span>
                <span className="text-[0.5rem] text-gray-300 text-center">{card.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
