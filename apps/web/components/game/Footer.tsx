'use client';

import { useGameStore } from '@/lib/game/store';

export const Footer = () => {
  const { 
    humanScore, 
    iaScore, 
    jalapenoBalance, 
    weeklyWins, 
    totalGames,
    currentStreak 
  } = useGameStore();

  // Simular wallet ID (primeros 6 y últimos 4 caracteres)
  const walletId = '0x7a9f...3b2c';

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-black/80 backdrop-blur-md border-t border-yellow-500/20 px-3 py-2">
      <div className="mx-auto max-w-[480px]">
        {/* Fila 1: Wallet + Balance */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm shadow-lg">
              👤
            </div>
            <span className="text-[10px] text-white/50 font-mono">{walletId}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 border border-yellow-500/30">
            <span className="text-sm font-black text-yellow-400">{jalapenoBalance}</span>
            <span className="text-sm">🌶️</span>
          </div>
        </div>

        {/* Fila 2: Stats del juego */}
        <div className="flex items-center justify-between text-[10px]">
          {/* Humano */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-xs">👤</span>
              <span className="font-bold text-blue-400">{humanScore}</span>
            </div>
            <span className="text-white/30">vs</span>
            <div className="flex items-center gap-1">
              <span className="text-xs">🤖</span>
              <span className="font-bold text-purple-400">{iaScore}</span>
            </div>
          </div>

          {/* Stats centrales */}
          <div className="flex items-center gap-3 text-white/60">
            <div className="flex items-center gap-1">
              <span>🏆</span>
              <span className="font-semibold">{weeklyWins}/7</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🎮</span>
              <span className="font-semibold">{totalGames}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🔥</span>
              <span className="font-semibold text-orange-400">{currentStreak}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
