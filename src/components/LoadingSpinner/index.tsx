'use client';

import { useEffect, useState } from 'react';

export function LoadingSpinner({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      {/* Título en la parte superior */}
      <div className="pt-12 px-6 text-center">
        <h1 className="text-6xl font-black text-red-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900 }}>
          JALAPEÑO
        </h1>
      </div>

      {/* Emoji de jalapeño centrado que ocupa toda la pantalla */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[20rem] leading-none">
          🌶️
        </div>
      </div>

      {/* Barra de progreso en la parte inferior */}
      <div className="pb-12 px-6">
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white mt-4 text-xl font-mono text-center">{progress}%</p>
      </div>
    </div>
  );
}
