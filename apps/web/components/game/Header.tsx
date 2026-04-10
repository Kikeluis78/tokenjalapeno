'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/game/store';

export const Header = () => {
  const { jalapenoBalance, weeklyWins, cooldownRemaining, canPlayFree, updateCooldown } = useGameStore();

  useEffect(() => {
    // Actualizar cooldown cada segundo
    const interval = setInterval(() => {
      updateCooldown();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateCooldown]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm border-b border-white/10 px-4 py-2">
      <div className="mx-auto flex max-w-[480px] items-center justify-between">
        {/* Balance */}
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500/20 to-yellow-500/20 px-3 py-1.5 border border-yellow-500/30">
          <span className="text-xl">🌶️</span>
          <span className="text-sm font-black text-yellow-400">{jalapenoBalance}</span>
        </div>

        {/* Victorias semanales */}
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1.5 border border-blue-500/30">
          <span className="text-sm">🏆</span>
          <span className="text-xs font-bold text-white">{weeklyWins}/7</span>
        </div>

        {/* Cooldown */}
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-3 py-1.5 border border-green-500/30">
          {canPlayFree ? (
            <>
              <span className="text-sm">✅</span>
              <span className="text-xs font-bold text-green-400">Listo</span>
            </>
          ) : (
            <>
              <span className="text-sm">⏱️</span>
              <span className="text-xs font-bold text-white">{formatTime(cooldownRemaining)}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
