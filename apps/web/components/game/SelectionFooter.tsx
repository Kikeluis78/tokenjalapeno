'use client';

interface SelectionFooterProps {
  selectedIndex: number;
  onSelect: () => void;
}

export const SelectionFooter = ({ selectedIndex, onSelect }: SelectionFooterProps) => {
  return (
    <div className="mt-auto space-y-2.5 pt-1">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
        <p className="text-sm font-medium text-white/80">Tablero seleccionado: #{selectedIndex + 1}</p>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="w-full rounded-2xl bg-emerald-500 px-4 py-3.5 text-sm font-bold text-black transition active:scale-[0.98]"
      >
        Jugar
      </button>
    </div>
  );
};
