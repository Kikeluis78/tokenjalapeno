'use client';

import { useState } from 'react';
import { Spinner } from '@/components/spinner';

export default function Page() {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);

  const handleSpinnerComplete = () => {
    setShowSpinner(false);
  };

  if (showSpinner) {
    return <Spinner onComplete={handleSpinnerComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-red-800 to-yellow-700">
      {/* Título con icono en esquina superior izquierda */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="text-5xl">🌶️</div>
        <h1 className="font-[family-name:var(--font-alfa-slab)] text-3xl md:text-4xl text-red-600 drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]">
          JALAPEÑO TOKEN<sup className="text-lg">®</sup>
        </h1>
      </div>

      {/* Contenido central */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-2xl text-yellow-300 font-bold">
            ¡Bienvenido al juego!
          </p>
        </div>
      </div>
    </div>
  );
}
