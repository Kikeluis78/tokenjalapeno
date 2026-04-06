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
      {/* Título con icono en esquina superior izquierda - Optimizado móvil */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="text-3xl">🌶️</div>
        <h1 className="text-xl font-black text-red-600 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-tight" style={{ fontFamily: 'var(--font-alfa-slab)' }}>
          JALAPEÑO<br />TOKEN<sup className="text-xs">®</sup>
        </h1>
      </div>

      {/* Contenido central */}
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center">
          <p className="text-2xl text-yellow-300 font-bold">
            ¡Bienvenido al juego!
          </p>
        </div>
      </div>
    </div>
  );
}
