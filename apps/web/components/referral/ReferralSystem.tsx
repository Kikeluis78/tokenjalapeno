'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useGameStore } from '@/lib/game/store';

export function ReferralSystem() {
  const [referralCode, setReferralCode] = useState('');
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
    <div className="space-y-4 px-2">
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-600/20 via-green-600/20 to-teal-600/20 p-6 shadow-xl">
        <h3 className="mb-4 text-center text-xl font-bold text-white">
          🎁 Sistema de Referidos
        </h3>

        {/* Código del usuario */}
        <div className="mb-4 space-y-2">
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
    </div>
  );
}
