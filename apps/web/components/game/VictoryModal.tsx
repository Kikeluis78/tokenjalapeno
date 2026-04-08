'use client';

import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/game/store';

export const VictoryModal = () => {
  const router = useRouter();
  const { winner, resetGame } = useGameStore();

  const isVictory = winner === 'human';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-[360px] rounded-3xl border border-white/10 bg-[#1f2937] p-6 text-white shadow-2xl">
        <div className="mb-4 text-center text-6xl">{isVictory ? '🎉' : '🤖'}</div>
        <h2 className="mb-2 text-center text-2xl font-bold">
          {isVictory ? 'Ganaste' : 'La IA ganó'}
        </h2>
        <p className="mb-6 text-center text-sm text-white/70">
          {isVictory
            ? 'Completaste tu tablero antes que la IA.'
            : 'La IA completó su tablero primero. Puedes volver a intentarlo.'}
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => { resetGame(); router.push('/game'); }}
            className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold text-black"
          >
            Jugar de nuevo
          </button>
          <button
            type="button"
            onClick={() => { resetGame(); router.push('/'); }}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
