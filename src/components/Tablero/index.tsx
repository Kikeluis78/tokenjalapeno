interface Card {
  id: number;
  name: string;
  emoji: string;
}

interface TableroProps {
  cartas: Card[];
  seleccionadoIds?: number[];
  cantadasIds?: number[];
  disabled?: boolean;
  onSeleccionar?: (carta: Card) => void;
  showOverlay?: boolean;
  overlayTitle?: string;
  showPeanut?: boolean;
  isIA?: boolean;
}

export function Tablero({ cartas, seleccionadoIds = [], cantadasIds = [], disabled = false, onSeleccionar, showOverlay = false, overlayTitle, showPeanut = false, isIA = false }: TableroProps) {
  const selectedColor = isIA ? 'border-red-600' : 'border-blue-600';
  const selectedBg = isIA ? 'bg-red-600/50' : 'bg-blue-600/50';
  
  return (
    <div className="w-full max-w-md mx-auto bg-linear-to-br from-green-700 to-green-900 p-3 rounded-2xl shadow-2xl relative">
      <div className="bg-green-800 p-2 rounded-xl">
        <div className="grid grid-cols-4 gap-2">
          {cartas.map((carta) => {
            const isSelected = seleccionadoIds.includes(carta.id);
            const isCantada = cantadasIds.includes(carta.id);
            
            return (
              <button
                key={carta.id}
                onClick={() => !disabled && onSeleccionar?.(carta)}
                disabled={disabled}
                className={`
                  aspect-[2/2.5] rounded-xl overflow-hidden bg-white shadow relative
                  ${isSelected ? `border-4 ${selectedColor} shadow-lg` : 'border border-black'}
                  ${disabled ? 'opacity-50 pointer-events-none' : 'active:scale-95'}
                `}
              >
                <div className="w-full h-full flex flex-col items-center justify-center p-1">
                  <div className="text-4xl">{carta.emoji}</div>
                  <div className="text-[8px] text-center font-bold mt-1 leading-tight">{carta.name}</div>
                </div>
                {isCantada && (
                  <div className="absolute inset-0 bg-yellow-400/50 border-2 border-yellow-500 rounded-xl animate-pulse" />
                )}
                {isSelected && (
                  <div className={`absolute inset-0 ${selectedBg} border-2 ${selectedColor} rounded-xl`} />
                )}
                {showPeanut && isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-6xl">🥜</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-black/80 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm">
          {overlayTitle && (
            <div className="text-white font-black text-xl mb-3">{overlayTitle}</div>
          )}
          <div className="text-6xl">🔒</div>
        </div>
      )}
    </div>
  );
}