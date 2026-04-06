'use client';

import { useState } from 'react';
import { Spinner } from '@/components/spinner';
import { VerifyModal } from '@/components/modals';

export default function Page() {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleSpinnerComplete = () => {
    setShowSpinner(false);
  };

  const handleVerify = () => {
    setIsVerified(true);
  };

  if (showSpinner) {
    return <Spinner onComplete={handleSpinnerComplete} />;
  }

  if (!isVerified) {
    return <VerifyModal onVerify={handleVerify} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-red-800 to-yellow-700">
      {/* Header con logo */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="text-3xl">🌶️</div>
        <h1 className="text-xl font-black text-red-600 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-tight" style={{ fontFamily: 'var(--font-alfa-slab)' }}>
          JALAPEÑO<br />TOKEN<sup className="text-xs">®</sup>
        </h1>
      </div>

      {/* Menú principal */}
      <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-8">
        <div className="w-full max-w-sm space-y-4">
          {/* Humano vs IA - ACTIVO */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xl py-6 px-6 rounded-2xl shadow-2xl transform transition hover:scale-105 active:scale-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🤖</span>
                <span>HUMANO VS IA</span>
              </div>
              <span className="text-2xl">▶️</span>
            </div>
          </button>

          {/* Torneo Semanal - BLOQUEADO */}
          <button disabled className="w-full bg-gray-700/50 text-gray-400 font-black text-xl py-6 px-6 rounded-2xl shadow-xl opacity-60 cursor-not-allowed">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🏆</span>
                <span>TORNEO SEMANAL</span>
              </div>
              <span className="text-2xl">🔒</span>
            </div>
          </button>

          {/* Torneo Mensual - BLOQUEADO */}
          <button disabled className="w-full bg-gray-700/50 text-gray-400 font-black text-xl py-6 px-6 rounded-2xl shadow-xl opacity-60 cursor-not-allowed">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">👑</span>
                <span>TORNEO MENSUAL</span>
              </div>
              <span className="text-2xl">🔒</span>
            </div>
          </button>

          {/* Zona de Recompensas - BLOQUEADO */}
          <button disabled className="w-full bg-gray-700/50 text-gray-400 font-black text-xl py-6 px-6 rounded-2xl shadow-xl opacity-60 cursor-not-allowed">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🎁</span>
                <span>RECOMPENSAS</span>
              </div>
              <span className="text-2xl">🔒</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
