'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/store';
import { LOTTERY_CARDS } from '@/lib/cards';

export const CardRain = () => {
  const { startGame } = useGameStore();

  useEffect(() => {
    // Después de 3 segundos, iniciar el juego
    const timer = setTimeout(() => {
      startGame();
    }, 3000);

    return () => clearTimeout(timer);
  }, [startGame]);

  // Generar 50 cartas para cubrir toda la pantalla horizontalmente
  const rainCards = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    card: LOTTERY_CARDS[Math.floor(Math.random() * LOTTERY_CARDS.length)],
    delay: Math.random() * 2,
    x: (i % 10) * 10 + Math.random() * 8, // Distribuir uniformemente en toda la pantalla
    duration: 2 + Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 overflow-hidden">
      {/* Lluvia de cartas - cubrir toda la pantalla */}
      {rainCards.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -100, x: `${item.x}%`, rotate: 0, opacity: 0 }}
          animate={{ 
            y: '110vh', 
            rotate: 360,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: 'linear'
          }}
          className="absolute"
        >
          <div className="bg-white rounded-lg p-3 shadow-2xl w-16 h-20 flex flex-col items-center justify-center">
            <span className="text-3xl">{item.card.emoji}</span>
          </div>
        </motion.div>
      ))}

      {/* Texto central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-5xl font-black text-white drop-shadow-2xl mb-4">
            ¡A JUGAR!
          </h2>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-8xl"
          >
            🎰
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
