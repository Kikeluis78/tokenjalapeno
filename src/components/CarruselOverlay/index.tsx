
interface CarruselOverlayProps {
  currentIndex: number;
  totalBoards: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: () => void;
}

export function CarruselOverlay({
  currentIndex,
  totalBoards,
  onPrev,
  onNext,
  onSelect,
}: CarruselOverlayProps) {
  return (
    <div className="absolute inset-0 rounded-2xl flex items-center justify-center z-20">
      
      {/* Flechas laterales */}
      <button
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2"
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          color: 'red',
          fontSize: '80px',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          opacity: currentIndex === 0 ? 0.3 : 1,
          zIndex: 30
        }}
      >
        ←
      </button>

      <button
        onClick={onNext}
        disabled={currentIndex === totalBoards - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        style={{
          padding: '0',
          backgroundColor: 'transparent',
          color: 'red',
          fontSize: '80px',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          opacity: currentIndex === totalBoards - 1 ? 0.3 : 1,
          zIndex: 30
        }}
      >
        →
      </button>

      {/* Contenido central sobre el tablero */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center">
        {/* Mano animada con texto junto */}
        <div className="flex items-center gap-3 mb-6 animate-bounce">
          <div className="text-7xl animate-[wiggle_1s_ease-in-out_infinite]">
            👉
          </div>
          <div className="text-white text-lg opacity-80 bg-black/60 px-4 py-2 rounded-lg">
            Desliza
          </div>
        </div>

        {/* Contador */}
        <div className="text-white/70 text-sm mb-4">
          {currentIndex + 1} / {totalBoards}
        </div>

        {/* Título */}
        <div className="mb-6 text-center">
          <h2 className="text-white font-bold text-3xl">
            Elige tu tablero
          </h2>
        </div>

        {/* Botón SELECCIONAR */}
        <button
          onClick={onSelect}
          style={{
            padding: '24px 36px',
            borderRadius: '16px',
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
          }}
        >
          SELECCIONAR
        </button>
      </div>
    </div>
  );
}