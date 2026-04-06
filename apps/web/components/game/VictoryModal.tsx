'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/game/store';

export const VictoryModal = () => {
  const router = useRouter();
  const { winner, humanScore, iaScore } = useGameStore();

  const isVictory = winner === 'human';

  const handlePlayAgain = () => {
    router.push('/game');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
      >
        {/* Emoji */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-9xl mb-4"
        >
          {isVictory ? '🎉' : '😢'}
        </motion.div>

        {/* Título */}
        <h2 className={`text-4xl font-black mb-4 ${isVictory ? 'text-green-600' : 'text-red-600'}`}>
          {isVictory ? '¡GANASTE!' : '¡PERDISTE!'}
        </h2>

        {/* Mensaje */}
        <p className="text-gray-700 text-lg mb-6">
          {isVictory 
            ? '¡Felicidades! Completaste tu tablero primero' 
            : 'La IA completó su tablero primero. ¡Inténtalo de nuevo!'}
        </p>

        {/* Puntuación */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Humano</p>
            <p className="text-3xl font-black text-blue-600">{humanScore}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">IA</p>
            <p className="text-3xl font-black text-red-600">{iaScore}</p>
          </div>
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <button
            onClick={handlePlayAgain}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-black text-lg py-4 rounded-2xl shadow-lg transition"
          >
            🔄 JUGAR DE NUEVO
          </button>
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-black text-lg py-4 rounded-2xl shadow-lg transition"
          >
            🏠 VOLVER AL MENÚ
          </button>
        </div>
      </motion.div>
    </div>
  );
};
