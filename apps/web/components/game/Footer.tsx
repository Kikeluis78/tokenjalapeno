'use client';

interface FooterProps {
  isPlaying: boolean;
  onPlay: () => void;
}

export const Footer = ({ isPlaying, onPlay }: FooterProps) => {
  return (
    <section className="space-y-2">
      <button
        type="button"
        onClick={onPlay}
        disabled={isPlaying}
        className="w-full transform rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 py-4 text-base font-black text-white shadow-lg transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/60 disabled:hover:scale-100"
      >
        {isPlaying ? '⏸️ Jugando...' : '▶️ Iniciar Juego'}
      </button>

      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <p className="text-center text-[10px] leading-relaxed text-white/60">
          Completa tu tablero antes que la IA
        </p>
      </div>
    </section>
  );
};
