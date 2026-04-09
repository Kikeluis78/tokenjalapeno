'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/store';
import { LOTTERY_CARDS } from '@/lib/cards';
import Image from 'next/image';

export const CardRain = () => {
  const { startGame } = useGameStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      startGame();
    }, 3000);

    return () => clearTimeout(timer);
  }, [startGame]);

  // Crear cortina de cartas: 15 columnas x 4 filas = 60 cartas
  const rainCards = Array.from({ length: 60 }, (_, i) => {
    const col = i % 15; // 15 columnas
    const row = Math.floor(i / 15); // 4 filas
    
    return {
      id: i,
      card: LOTTERY_CARDS[Math.floor(Math.random() * LOTTERY_CARDS.length)],
      delay: row * 0.3 + Math.random() * 0.2, // Filas escalonadas
      x: (col / 14) * 100, // Distribuir columnas de 0% a 100%
      duration: 2.5 + Math.random() * 0.5
    };
  });

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      {/* Lluvia de cartas - cubrir toda la pantalla horizontalmente */}
      {rainCards.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -100, x: `${item.x}%`, opacity: 0 }}
          animate={{ 
            y: '110vh', 
            opacity: [0, 0.4, 0.4, 0]
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: 'linear'
          }}
          className="absolute"
        >
          <div className="flex h-20 w-16 flex-col items-center justify-center rounded-lg bg-white p-3 shadow-2xl">
            <span className="text-3xl">{item.card.emoji}</span>
          </div>
        </motion.div>
      ))}

      {/* Logo central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <div className="relative mx-auto h-32 w-80 drop-shadow-2xl">
            <Image
              src="/tituloLoteria2.png"
              alt="Lotería Mexicana"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
