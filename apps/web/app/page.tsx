'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/spinner';
import { VerifyModal } from '@/components/modals';
import { useGameStore } from '@/lib/game/store';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const { canPlayFree, buyGameWithWLD, updateCooldown } = useGameStore();

  useEffect(() => {
    updateCooldown();
  }, [updateCooldown]);

  if (showSpinner) {
    return <Spinner onComplete={() => setShowSpinner(false)} />;
  }

  if (!isVerified) {
    return <VerifyModal onVerify={() => setIsVerified(true)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e] px-4 py-6">
      {/* Efectos de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -right-20 bottom-40 h-96 w-96 animate-pulse rounded-full bg-red-600/20 blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-amber-500/10 blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col justify-between gap-6">
        <div className="space-y-6">
          <header className="space-y-4 pt-8 text-center">
            <div className="relative mx-auto h-24 w-64">
              <Image
                src="/tituloLoteria.png"
                alt="Lotería Mexicana"
                fill
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>
          </header>

          <section className="space-y-4 px-2">
            <button
              type="button"
              onClick={() => router.push('/game')}
              disabled={!canPlayFree}
              className="group relative w-full overflow-hidden rounded-2xl border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-600/20 via-red-600/20 to-pink-600/20 p-4 text-left shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0">
                  <Image
                    src="/selecionarjuego.png"
                    alt="Seleccionar Juego"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <span className="mb-1 block text-lg font-bold text-white">
                    Humano vs IA {!canPlayFree && '🔒'}
                  </span>
                  <span className="block text-xs text-white/70">
                    {canPlayFree ? 'Entrar al juego y seleccionar tablero.' : 'En cooldown. Compra un juego abajo.'}
                  </span>
                </div>
              </div>
            </button>

            {!canPlayFree && (
              <button
                type="button"
                onClick={() => {
                  buyGameWithWLD();
                  router.push('/game');
                }}
                className="group relative w-full overflow-hidden rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-blue-600/20 p-6 text-left shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <span className="mb-2 block text-xl font-bold text-white">💎 Comprar juego</span>
                  <span className="block text-sm text-white/70">0.001 WLD - Juega inmediatamente</span>
                </div>
              </button>
            )}

            <button
              type="button"
              disabled
              className="relative w-full overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 text-left opacity-50"
            >
              <span className="mb-2 block text-xl font-bold text-white/50">🏆 Torneo semanal</span>
              <span className="block text-sm text-white/40">Disponible después.</span>
            </button>

            <button
              type="button"
              disabled
              className="relative w-full overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 text-left opacity-50"
            >
              <span className="mb-2 block text-xl font-bold text-white/50">🎁 Recompensas</span>
              <span className="block text-sm text-white/40">Se integra al final.</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
