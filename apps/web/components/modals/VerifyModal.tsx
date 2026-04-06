'use client';

import { useState } from 'react';

interface VerifyModalProps {
  onVerify: () => void;
}

export const VerifyModal = ({ onVerify }: VerifyModalProps) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simular verificación (2 segundos)
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        {/* Icono World ID */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-4xl">🌍</span>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-black text-gray-900 text-center mb-3">
          Verifica tu Humanidad
        </h2>

        {/* Descripción */}
        <p className="text-gray-600 text-center mb-8">
          Necesitas verificar que eres humano con World ID para jugar y ganar recompensas
        </p>

        {/* Botón de verificación */}
        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-black text-lg py-4 rounded-2xl shadow-lg transition transform hover:scale-105 active:scale-95"
        >
          {isVerifying ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verificando...</span>
            </div>
          ) : (
            'Verificar con World ID'
          )}
        </button>

        {/* Nota */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Powered by World ID
        </p>
      </div>
    </div>
  );
};
