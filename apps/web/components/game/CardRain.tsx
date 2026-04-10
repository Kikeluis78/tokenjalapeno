'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/store';
import { LOTTERY_CARDS } from '@/lib/cards';
import Image from 'next/image';

export const CardRain = () => {
  const { startGame } = useGameStore();
  const [cards, setCards] = useState<{ id: number; left: string; delay: number; emoji: string; size: 'small' | 'medium' | 'large' }[]>([]);

  useEffect(() => {
    // Generar 20 cartas con tamaños variados
    const newCards = Array.from({ length: 20 }).map((_, i) => {
      const sizes = ['small', 'medium', 'large'] as const;
      return {
        id: i,
        left: `${Math.random() * 120 - 10}%`,
        delay: Math.random() * 2,
        emoji: LOTTERY_CARDS[Math.floor(Math.random() * LOTTERY_CARDS.length)].emoji,
        size: sizes[Math.floor(Math.random() * sizes.length)]
      };
    });
    setCards(newCards);

    // Iniciar juego después de 3 segundos
    const timer = setTimeout(() => {
      startGame();
    }, 3000);

    return () => clearTimeout(timer);
  }, [startGame]);

  const getSizeClasses = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small': return 'h-12 w-10 text-2xl';
      case 'medium': return 'h-16 w-12 text-3xl';
      case 'large': return 'h-20 w-16 text-4xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      
      {/* Logo de fondo más grande */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="relative h-full w-full">
          <Image
            src="/juego2.png"
            alt="Fondo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Lluvia de cartas */}
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 0.3, 0.3, 0],
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: card.delay,
              ease: 'linear',
            }}
            style={{ left: card.left }}
            className={`absolute flex items-center justify-center rounded-lg border-2 border-green-500 bg-white shadow-2xl ${getSizeClasses(card.size)}`}
          >
            <span>{card.emoji}</span>
          </motion.div>
        ))}
      </div>

      {/* Centro - Barra de progreso */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md px-4 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold tracking-widest text-white">
          PREPARANDO JUEGO.......
        </h2>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-yellow-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  );
};
