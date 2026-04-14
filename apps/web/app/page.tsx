'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/spinner';
import { VerifyModal } from '@/components/modals';
import { useGameStore } from '@/lib/game/store';
import { ReferralSystem } from '@/components/referral/ReferralSystem';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const { canPlayFree, buyGameWithWLD, updateCooldown } = useGameStore();

  // ✅ Solo una vez
  useEffect(() => {
    updateCooldown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e]">

      {/* 🌄 Fondo mejorado - más arriba */}
      <div className="absolute top-0 left-0 right-0 h-[50%] flex items-start justify-center pt-8">
        <div className="relative h-full w-[70%]">
          <Image
            src="/juego2.png"
            alt="Fondo"
            fill
            className="object-contain opacity-30"
            priority
          />
        </div>
      </div>

      {/* ✨ Efectos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -right-20 bottom-40 h-96 w-96 animate-pulse rounded-full bg-red-600/20 blur-3xl" />
      </div>

      {/* 📦 Contenido */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-120 flex-col justify-center gap-4 px-4 py-6">

        <section className="space-y-3">

          {/* 🎮 Jugar */}
          <button
            onClick={() => router.push('/game')}
            disabled={!canPlayFree}
            className="w-full rounded-xl bg-linear-to-br from-yellow-500 to-red-500 p-4 text-left font-bold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50"
          >
            <div className="text-lg">🎮 Humano vs IA {!canPlayFree && '🔒'}</div>
            <div className="text-xs mt-1 opacity-80">
              {canPlayFree
                ? 'Entrar al juego.'
                : 'En cooldown. Compra abajo.'}
            </div>
          </button>

          {/* 💎 Comprar */}
          {!canPlayFree && (
            <button
              onClick={() => {
                buyGameWithWLD();
                router.push('/game');
              }}
              className="w-full rounded-xl bg-linear-to-br from-cyan-500 to-purple-500 p-4 text-left font-bold text-white shadow-lg transition hover:scale-[1.02]"
            >
              <div className="text-lg">💎 Comprar juego</div>
              <div className="text-xs mt-1 opacity-80">0.001 WLD</div>
            </button>
          )}

          <button
            type="button"
            disabled
            className="relative w-full overflow-hidden rounded-xl border-2 border-purple-500/30 bg-linear-to-br from-purple-600/30 via-pink-600/30 to-red-600/30 p-4 text-left opacity-60"
          >
            <div className="text-lg font-bold text-white/70">🏆 Torneo semanal</div>
            <div className="text-xs text-white/50">Disponible después.</div>
          </button>

          <button
            type="button"
            disabled
            className="relative w-full overflow-hidden rounded-xl border-2 border-green-500/30 bg-linear-to-br from-green-600/30 via-emerald-600/30 to-teal-600/30 p-4 text-left opacity-60"
          >
            <div className="text-lg font-bold text-white/70">🎁 Recompensas</div>
            <div className="text-xs text-white/50">Se integra al final.</div>
          </button>

        </section>

        {/* Sistema de Referidos */}
        <ReferralSystem />
      </div>

      {/* 🌀 Spinner como overlay */}
      {showSpinner && (
        <div className="fixed inset-0 z-50">
          <Spinner onComplete={() => setShowSpinner(false)} />
        </div>
      )}

      {/* 🔐 Verify como modal real */}
      {!isVerified && !showSpinner && (
        <VerifyModal onVerify={() => setIsVerified(true)} />
      )}
    </div>
  );
}

