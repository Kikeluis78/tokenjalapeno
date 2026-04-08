'use client';

interface FooterProps {
  isPlaying: boolean;
  onPlay: () => void;
}

export const Footer = ({ isPlaying, onPlay }: FooterProps) => {
  return (
    <section className="mt-auto space-y-2.5 pt-1">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
        <h3 className="mb-1 text-xs font-bold text-white">🏆 Premios / Info</h3>
        <p className="text-[11px] leading-relaxed text-white/70">
          Completa tu tablero antes que la IA. Solo puedes marcar cartas que ya hayan salido.
        </p>
      </div>

      <button
        type="button"
        onClick={onPlay}
        disabled={isPlaying}
        className="w-full rounded-2xl bg-emerald-500 px-4 py-3.5 text-sm font-bold text-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/60"
      >
        {isPlaying ? 'Jugando...' : '▶️ Play'}
      </button>
    </section>
  );
};
