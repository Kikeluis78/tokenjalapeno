'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/lib/game/store';
import { LOTTERY_CARDS } from '@/lib/cards';
import Image from 'next/image';

export const CardRain = () => {
  const { startGame } = useGameStore();
  const [cards, setCards] = useState<{ id: number; left: string; delay: number; emoji: string }[]>([]);

  useEffect(() => {
    // Generar 15 cartas con posiciones aleatorias
    const newCards = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 120 - 10}%`, // Cubre más del ancho visible
      delay: Math.random() * 2,
      emoji: LOTTERY_CARDS[Math.floor(Math.random() * LOTTERY_CARDS.length)].emoji,
    }));
    setCards(newCards);

    // Iniciar juego después de 3 segundos
    const timer = setTimeout(() => {
      startGame();
    }, 3000);

    return () => clearTimeout(timer);
  }, [startGame]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      
      {/* Lluvia de cartas */}
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 1, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: card.delay,
              ease: 'linear',
            }}
            style={{ left: card.left }}
            className="absolute flex h-20 w-16 items-center justify-center rounded-lg border-2 border-green-500 bg-white shadow-2xl"
          >
            <span className="text-4xl">{card.emoji}</span>
          </motion.div>
        ))}
      </div>

      {/* Centro - Logo y barra de progreso */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md px-4 text-center"
      >
        <div className="relative mx-auto mb-6 h-32 w-[80%] drop-shadow-2xl">
          <Image
            src="/tituloLoteria2.png"
            alt="Lotería Mexicana"
            fill
            className="object-contain"
            priority
          />
        </div>

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
