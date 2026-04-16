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
    claimRewards,
    playDoubleOrNothing,
    doubleOrNothingCount,
    buyGameWithWLD,
    totalGames,
    humanScore,
    iaScore
  } = useGameStore();
  
  const [reward, setReward] = useState(0);
  const [isQuickWin, setIsQuickWin] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (winner === 'human') {
      const gameDuration = gameStartTime ? (Date.now() - gameStartTime) / 1000 : 0;
      const quickWin = gameDuration < 120;
      setIsQuickWin(quickWin);
      setReward(quickWin ? 125 : 100);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setReward(50);
    }
  }, [winner, gameStartTime]);

  const isVictory = winner === 'human';
  const qualifiedForRaffle = weeklyWins >= 7;
  const gameDuration = gameStartTime ? Math.floor((Date.now() - gameStartTime) / 1000) : 0;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 backdrop-blur-md">
      {/* Confetti animado */}
      {showConfetti && isVictory && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🌶️', '🏆', '⭐', '💰'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-[400px] rounded-3xl border-2 border-yellow-500/40 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-white shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Emoji y título con animación */}
        <div className="mb-4 text-center">
          <div className="text-8xl mb-2 animate-bounce">
            {isVictory ? '🏆' : '😔'}
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            {isVictory ? '¡VICTORIA!' : '¡Casi!'}
          </h2>
          <p className="text-sm text-white/60 mt-1">
            {isVictory ? '¡Increíble jugada!' : 'La IA ganó esta vez'}
          </p>
        </div>
        
        {/* Recompensa destacada */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 p-5 text-center border border-yellow-500/30 shadow-lg">
          <p className="mb-2 text-xs text-white/70 uppercase tracking-wider">
            {isVictory ? '🎁 Recompensa' : '🎁 Consolación'}
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl font-black text-yellow-400 animate-pulse">+{reward}</span>
            <span className="text-4xl">🌶️</span>
          </div>
          {isQuickWin && (
            <div className="inline-block rounded-full bg-green-500/20 px-3 py-1 border border-green-500/40">
              <p className="text-xs font-bold text-green-400">⚡ +25 bonus victoria rápida</p>
            </div>
          )}
        </div>

        {/* Stats del juego */}
        <div className="mb-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-blue-500/10 p-3 text-center border border-blue-500/20">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-xs text-white/60">Duración</div>
            <div className="text-sm font-bold text-blue-400">{formatDuration(gameDuration)}</div>
          </div>
          <div className="rounded-xl bg-purple-500/10 p-3 text-center border border-purple-500/20">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs text-white/60">Marcadas</div>
            <div className="text-sm font-bold text-purple-400">16/16</div>
          </div>
          <div className="rounded-xl bg-orange-500/10 p-3 text-center border border-orange-500/20">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-xs text-white/60">Racha</div>
            <div className="text-sm font-bold text-orange-400">{currentStreak}</div>
          </div>
        </div>

        {/* Stats generales */}
        <div className="mb-5 space-y-2 rounded-xl bg-black/40 p-4 border border-white/5">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">💰 Balance total:</span>
            <span className="font-bold text-yellow-400">{jalapenoBalance} 🌶️</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">🏆 Victorias semanales:</span>
            <span className="font-bold">{weeklyWins}/7</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">🎮 Partidas totales:</span>
            <span className="font-bold">{totalGames}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">📊 Récord:</span>
            <span className="font-bold text-blue-400">{humanScore} - {iaScore}</span>
          </div>
          {qualifiedForRaffle && (
            <div className="mt-3 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-2.5 text-center border border-green-500/40">
              <p className="text-xs font-bold text-green-400">
                ✅ ¡Calificado para sorteo semanal de 100 🌶️!
              </p>
            </div>
          )}
        </div>

        {/* Cooldown */}
        <div className="mb-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 text-center border border-blue-500/20">
          <p className="text-xs text-white/60 mb-1">⏳ Próximo juego gratis en:</p>
          <p className="text-xl font-black text-cyan-400">{formatTime(4 * 60 * 60)}</p>
        </div>

        {/* Botones */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              claimRewards();
              alert('💰 ¡Recompensas cobradas! (Simulado)');
            }}
            className="w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-3.5 text-sm font-black text-black shadow-lg transition hover:scale-105 hover:shadow-yellow-500/50 active:scale-95"
          >
            💰 Cobrar Recompensas
          </button>
          
          <button
            type="button"
            onClick={() => {
              playDoubleOrNothing();
              router.push('/game');
            }}
            disabled={doubleOrNothingCount >= 3}
            className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105 hover:shadow-purple-500/50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            🎲 Doble o Nada ({3 - doubleOrNothingCount} restantes)
          </button>
          
          <button
            type="button"
            onClick={() => {
              buyGameWithWLD();
              router.push('/game');
            }}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105 hover:shadow-blue-500/50 active:scale-95"
          >
            💎 Jugar ahora (0.001 WLD)
          </button>
          
          <button
            type="button"
            onClick={() => { resetGame(); router.push('/'); }}
            className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/30"
          >
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
