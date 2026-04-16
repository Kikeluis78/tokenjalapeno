'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/spinner';
import { VerifyModal } from '@/components/modals';
import { useGameStore } from '@/lib/game/store';
import { ReferralSystem } from '@/components/referral/ReferralSystem';
import { requestNotificationPermission, notifyGameReady, scheduleNotification } from '@/lib/notifications';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const { canPlayFree, buyGameWithWLD, updateCooldown, cooldownRemaining } = useGameStore();

  // ✅ Solo una vez
  useEffect(() => {
    updateCooldown();
    
    // Actualizar cooldown cada minuto
    const interval = setInterval(() => {
      updateCooldown();
    }, 60000);
    
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Programar notificación cuando termine el cooldown
  useEffect(() => {
    if (!notificationsEnabled || canPlayFree || cooldownRemaining === 0) return;

    const timeoutId = scheduleNotification(cooldownRemaining * 1000, () => {
      notifyGameReady();
    });

    return () => clearTimeout(timeoutId);
  }, [cooldownRemaining, canPlayFree, notificationsEnabled]);

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
    
    if (granted) {
      alert('✅ Notificaciones activadas! Te avisaremos cuando puedas jugar.');
    } else {
      alert('❌ Necesitas permitir notificaciones en tu navegador.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#1a0b2e] via-[#2d1b3d] to-[#1a0b2e]">

      {/* ✨ Efectos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -right-20 bottom-40 h-96 w-96 animate-pulse rounded-full bg-red-600/20 blur-3xl" />
      </div>

      {/* 📦 Contenido */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6">

        {/* 🎨 Header - Logo/Título en esquina superior derecha */}
        <div className="absolute right-4 top-4 z-10">
          <div className="relative h-16 w-32">
            <Image
              src="/tituloLoteria.png"
              alt="Lotería Mexicana"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Espaciador para el logo */}
        <div className="h-20" />

        {/* 🎮 Botón Principal - JUGAR con animación gelatina MEJORADA */}
        <button
          onClick={() => router.push('/game')}
          disabled={!canPlayFree}
          className="mb-4 w-full transform rounded-2xl bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-6 text-center font-black text-white shadow-2xl transition hover:scale-110 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 animate-[jelly_2s_ease-in-out_infinite]"
          style={{
            boxShadow: canPlayFree 
              ? '0 0 40px rgba(251, 146, 60, 0.6), 0 0 80px rgba(251, 146, 60, 0.3)' 
              : undefined
          }}
        >
          <div className="text-3xl mb-2">🎮</div>
          <div className="text-2xl">JUGAR AHORA</div>
          <div className="mt-2 text-sm font-normal opacity-90">
            {canPlayFree
              ? '✨ ¡Juego disponible!'
              : `🔒 Espera ${Math.floor(cooldownRemaining / 3600)}h ${Math.floor((cooldownRemaining % 3600) / 60)}m`}
          </div>
        </button>

        {/* 💎 Botón Secundario - Comprar */}
        {!canPlayFree && (
          <button
            onClick={() => {
              buyGameWithWLD();
              router.push('/game');
            }}
            className="mb-4 w-full transform rounded-2xl bg-linear-to-br from-cyan-500 to-purple-600 p-4 text-center font-bold text-white shadow-xl transition hover:scale-105 active:scale-95"
          >
            <div className="text-lg">💎 Comprar Juego Ahora</div>
            <div className="mt-1 text-xs opacity-80">Solo 0.001 WLD</div>
          </button>
        )}

        {/* 🔔 Botón de Notificaciones */}
        {!canPlayFree && !notificationsEnabled && (
          <button
            onClick={handleEnableNotifications}
            className="mb-6 w-full transform rounded-xl border-2 border-blue-500/40 bg-linear-to-br from-blue-600/20 to-indigo-600/20 p-3 text-center font-bold text-white backdrop-blur-sm transition hover:scale-105 active:scale-95"
          >
            <div className="text-sm">🔔 Activar Notificaciones</div>
            <div className="mt-1 text-xs opacity-80">Te avisaremos cuando puedas jugar</div>
          </button>
        )}

        {/* 🔮 Sección Próximamente */}
        <div className="mb-6 space-y-3">
          <h3 className="text-center text-sm font-bold text-white/60">
            🚀 Próximamente
          </h3>
          
          <div className="rounded-xl border border-purple-500/20 bg-linear-to-br from-purple-600/10 via-pink-600/10 to-red-600/10 p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white/70">🏆 Torneo Semanal</div>
                <div className="text-xs text-white/50">Compite y gana premios</div>
              </div>
              <div className="rounded-lg bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300">
                Pronto
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-linear-to-br from-green-600/10 via-emerald-600/10 to-teal-600/10 p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white/70">🎁 Recompensas Diarias</div>
                <div className="text-xs text-white/50">Bonos y sorpresas</div>
              </div>
              <div className="rounded-lg bg-green-500/20 px-3 py-1 text-xs font-bold text-green-300">
                Pronto
              </div>
            </div>
          </div>
        </div>

        {/* 👥 Sistema de Referidos */}
        <div className="mt-auto">
          <ReferralSystem />
        </div>
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

      {/* Animación gelatina MEJORADA */}
      <style jsx>{`
        @keyframes jelly {
          0%, 100% {
            transform: scale(1, 1);
          }
          25% {
            transform: scale(0.95, 1.05);
          }
          50% {
            transform: scale(1.05, 0.95);
          }
          75% {
            transform: scale(0.97, 1.03);
          }
        }
      `}</style>
    </div>
  );
}

