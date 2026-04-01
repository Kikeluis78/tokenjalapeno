interface Card {
  id: number;
  name: string;
  emoji: string;
}

interface CartaCantadaProps {
  carta?: Card;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function CartaCantada({ carta, isPlaying, onPlayPause }: CartaCantadaProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-[2/3] bg-linear-to-br from-yellow-300 to-yellow-500 border-4 border-red-500 rounded-xl shadow-2xl flex items-center justify-center">
        {carta ? (
          <div className="flex flex-col items-center justify-center p-2">
            <div className="text-6xl mb-2">{carta.emoji}</div>
            <div className="text-xs font-black text-center">{carta.name}</div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-5xl mb-2">🎴</div>
            <div className="text-xs font-bold">Esperando...</div>
          </div>
        )}
      </div>
      
      <button
        onClick={onPlayPause}
        className="w-full py-3 rounded-lg font-bold text-white text-lg shadow-lg"
        style={{ backgroundColor: isPlaying ? '#ef4444' : '#16a34a' }}
      >
        {isPlaying ? '⏸️ PAUSAR' : '▶️ CANTAR'}
      </button>
    </div>
  );
}
