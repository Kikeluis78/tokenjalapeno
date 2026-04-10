'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useGameStore } from '@/lib/game/store';

export function ReferralSystem() {
  const [referralCode, setReferralCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { jalapenoBalance } = useGameStore();

  // Código único del usuario (simulado - TODO: generar desde backend)
  const userReferralCode = 'JAL-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    Swal.fire({
      icon: 'success',
      title: '¡Copiado!',
      text: 'Tu código de referido ha sido copiado',
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleSubmitReferral = async () => {
    if (!referralCode.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa un código de referido',
      });
      return;
    }

    // TODO: Validar código en backend
    // TODO: Verificar que no sea el propio código
    // TODO: Verificar que no haya usado código antes
    // TODO: Agregar 100 jalapeños a ambos usuarios
    // TODO: Registrar referido en base de datos

    // Simulación
    const isValid = referralCode.startsWith('JAL-') && referralCode.length === 10;

    if (isValid) {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        html: `
          <p>Código válido</p>
          <p class="text-2xl font-bold mt-2">+100 🌶️</p>
          <p class="text-sm text-gray-600 mt-2">Tú y tu referidor reciben 100 Jalapeños</p>
        `,
        confirmButtonText: 'Genial',
        confirmButtonColor: '#10b981',
      });
      setReferralCode('');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Código inválido',
        text: 'El código de referido no existe o ya fue usado',
      });
    }
  };

  return (
    <div className="space-y-3 px-2 pb-8">
      {/* Título atractivo */}
      <div className="text-center">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg">
          🎁 ¡Refiere y Gana!
        </h2>
        <p className="text-sm text-white/70 mt-1">Comparte tu código y ambos ganan 100 🌶️</p>
      </div>

      {/* Acordeón */}
      <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-600/20 via-green-600/20 to-teal-600/20 overflow-hidden shadow-xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 flex items-center justify-between text-left transition-all hover:bg-white/5"
        >
          <span className="text-lg font-bold text-white">
            {isOpen ? '📂' : '📁'} Sistema de Referidos
          </span>
          <span className="text-2xl text-white transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="p-6 pt-2 space-y-4 border-t border-white/10">
            {/* Código del usuario */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/80">
                Tu código de referido:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userReferralCode}
                  readOnly
                  className="flex-1 rounded-lg border-2 border-emerald-400/50 bg-black/30 px-4 py-3 text-center text-lg font-bold text-white"
                />
                <button
                  onClick={handleCopyCode}
                  className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  📋
                </button>
              </div>
              <p className="text-xs text-white/60 text-center">
                Comparte tu código y gana 100 🌶️ por cada amigo
              </p>
            </div>

            {/* Input para código de referido */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/80">
                ¿Tienes un código de referido?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="JAL-XXXXXX"
                  className="flex-1 rounded-lg border-2 border-emerald-400/50 bg-black/30 px-4 py-3 text-center text-lg font-bold text-white placeholder:text-white/30"
                  maxLength={10}
                />
                <button
                  onClick={handleSubmitReferral}
                  className="rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  ✓
                </button>
              </div>
              <p className="text-xs text-white/60 text-center">
                Ambos recibirán 100 🌶️ al validar el código
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
