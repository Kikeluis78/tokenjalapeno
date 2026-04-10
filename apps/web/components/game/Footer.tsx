'use client';

interface FooterProps {
  humanScore: number;
  iaScore: number;
}

export const Footer = ({ humanScore, iaScore }: FooterProps) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/70 backdrop-blur-sm border-t border-white/10 px-4 py-3">
      <div className="mx-auto flex max-w-[480px] items-center justify-between gap-4">
        {/* Usuario - Izquierda */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {/* Avatar circular */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xl shadow-lg">
              👤
            </div>
            {/* Bandera */}
            <span className="text-2xl">🏳️</span>
          </div>
          
          {/* Victorias del usuario */}
          <div className="flex gap-1">
            {Array.from({ length: humanScore }).map((_, i) => (
              <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-sm">
                🌶️
              </div>
            ))}
            {humanScore === 0 && (
              <span className="text-xs text-white/40">Sin victorias</span>
            )}
          </div>
        </div>

        {/* IA - Derecha */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {/* Bandera México */}
            <span className="text-2xl">🇲🇽</span>
            {/* Avatar circular */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xl shadow-lg">
              🤖
            </div>
          </div>
          
          {/* Victorias de la IA */}
          <div className="flex gap-1">
            {Array.from({ length: iaScore }).map((_, i) => (
              <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-sm">
                🤖
              </div>
            ))}
            {iaScore === 0 && (
              <span className="text-xs text-white/40">Sin victorias</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
