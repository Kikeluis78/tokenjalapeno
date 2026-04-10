'use client';

import { useState } from 'react';

interface VerifyModalProps {
  onVerify: () => void;
}

export const VerifyModal = ({ onVerify }: VerifyModalProps) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simular verificación (aquí irá la lógica de World ID)
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gradient-to-br from-black/90 via-purple-900/30 to-black/90 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 pb-6 shadow-2xl animate-[slideUp_0.4s_ease-out]">
        {/* Efectos de fondo */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-10 -top-10 h-40 w-40 animate-pulse rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 animate-pulse rounded-full bg-purple-400/20 blur-3xl" style={{ animationDelay: '1s' }} />
        </div>

        {/* Contenido */}
        <div className="relative z-10">
          {/* Icono World ID */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 animate-pulse">
              <span className="text-5xl">🌍</span>
            </div>
          </div>

          {/* Título */}
          <h2 className="mb-3 text-center text-3xl font-black text-gray-900">
            Verifica tu Humanidad
          </h2>

          {/* Descripción */}
          <p className="mb-8 text-center text-gray-600">
            Usa World ID para verificar que eres humano y acceder al juego con recompensas
          </p>

          {/* Botón de verificación */}
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full transform rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-black text-white shadow-lg shadow-blue-500/30 transition hover:scale-105 hover:from-blue-700 hover:to-purple-700 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isVerifying ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent" />
                <span>Verificando...</span>
              </div>
            ) : (
              '🔐 Verificar con World ID'
            )}
          </button>

          {/* Nota */}
          <p className="mt-4 text-center text-xs text-gray-400">
            Powered by Worldcoin
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
