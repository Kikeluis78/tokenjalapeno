'use client';

import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/game/store';
import { useEffect, useState } from 'react';

export const VictoryModal = () => {
  const router = useRouter();
  const { 
    winner, 
    resetGame, 
    jalapenoBalance, 
    weeklyWins, 
    currentStreak,
    gameStartTime,
    claimRewards
  } = useGameStore();
  
  const [reward, setReward] = useState(0);
  const [isQuickWin, setIsQuickWin] = useState(false);

  useEffect(() => {
    if (winner === 'human') {
      const gameDuration = gameStartTime ? (Date.now() - gameStartTime) / 1000 : 0;
      const quickWin = gameDuration < 120;
      setIsQuickWin(quickWin);
      setReward(quickWin ? 125 : 100);
    } else {
      setReward(50);
    }
  }, [winner, gameStartTime]);

  const isVictory = winner === 'human';
  const qualifiedForRaffle = weeklyWins >= 7;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[380px] rounded-3xl border-2 border-yellow-500/30 bg-gradient-to-br from-[#1f2937] to-[#111827] p-6 text-white shadow-2xl">
        {/* Emoji y título */}
        <div className="mb-4 text-center text-7xl animate-bounce">
          {isVictory ? '🎉' : '😔'}
        </div>
        <h2 className="mb-2 text-center text-3xl font-black">
          {isVictory ? '¡VICTORIA!' : 'Derrota'}
        </h2>
        
        {/* Recompensa */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-yellow-500/20 p-4 text-center">
          <p className="mb-1 text-sm text-white/70">
            {isVictory ? 'Ganaste' : 'Premio de consolación'}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-black text-yellow-400">+{reward}</span>
            <span className="text-3xl">🌶️</span>
          </div>
          {isQuickWin && (
            <p className="mt-2 text-xs text-green-400">⚡ +25 bonus por victoria rápida</p>
          )}
        </div>

        {/* Stats */}
        <div className="mb-6 space-y-2 rounded-xl bg-black/30 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Balance total:</span>
            <span className="font-bold text-yellow-400">{jalapenoBalance} 🌶️</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Victorias semanales:</span>
            <span className="font-bold">{weeklyWins}/7 🏆</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Racha actual:</span>
            <span className="font-bold text-orange-400">{currentStreak} 🔥</span>
          </div>
          {qualifiedForRaffle && (
            <div className="mt-3 rounded-lg bg-green-500/20 p-2 text-center">
              <p className="text-xs font-bold text-green-400">
                ✅ Calificado para sorteo semanal
              </p>
            </div>
          )}
        </div>

        {/* Cooldown */}
        <div className="mb-6 rounded-xl bg-blue-500/10 p-3 text-center">
          <p className="text-xs text-white/60">Próximo juego gratis:</p>
          <p className="text-lg font-bold text-blue-400">⏱️ {formatTime(8 * 60 * 60)}</p>
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              claimRewards();
              alert('💰 Recompensas cobradas! (Simulado)');
            }}
            className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-3 text-sm font-black text-black shadow-lg transition hover:scale-105 active:scale-95"
          >
            💰 Cobrar Recompensas
          </button>
          
          <button
            type="button"
            onClick={() => { resetGame(); router.push('/game'); }}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105 active:scale-95"
          >
            🎲 Doble o Nada
          </button>
          
          <button
            type="button"
            onClick={() => { resetGame(); router.push('/'); }}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
