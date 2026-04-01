import React from 'react';
import { motion } from 'framer-motion';

interface GameHeaderProps {
  humanScore: number;
  iaScore: number;
}

export function GameHeader({ 
  humanScore, 
  iaScore
}: GameHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 border-b-2 border-black py-2 px-3">
      <div className="grid grid-cols-3 items-center gap-2 max-w-3xl mx-auto">
        
        <div className="bg-blue-600 border-2 border-white rounded-lg shadow-md h-14 flex flex-col items-center justify-center">
          <div className="text-white font-bold text-[10px]">HUMANO</div>
          <div className="text-yellow-300 font-black text-xl">{humanScore}</div>
        </div>

        <motion.div 
          className="bg-gradient-to-br from-yellow-300 to-yellow-500 border-2 border-green-500 rounded-xl py-2 shadow-lg flex flex-col items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-green-800 font-bold text-[9px]">🏆 PREMIO 🏆</div>
          <div className="text-2xl font-black whitespace-nowrap" style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            WebkitTextStroke: '0.5px black',
            paintOrder: 'stroke fill',
          }}>
            <span className="text-white">10</span> <span className="text-blue-700">WLD</span>
          </div>
        </motion.div>

        <div className="bg-red-600 border-2 border-white rounded-lg shadow-md h-14 flex flex-col items-center justify-center">
          <div className="text-white font-bold text-[10px]">IA</div>
          <div className="text-yellow-300 font-black text-xl">{iaScore}</div>
        </div>
      </div>
    </div>
  );
}
