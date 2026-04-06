import { create } from 'zustand';
import { Card } from '@/lib/cards';

interface GameState {
  // Tableros
  allBoards: Card[][];
  currentBoardIndex: number;
  selectedBoard: Card[] | null;
  iaBoard: Card[];
  
  // Estado del juego
  gamePhase: 'selection' | 'transition' | 'playing';
  
  // Acciones
  setCurrentBoardIndex: (index: number) => void;
  selectBoard: () => void;
  startGame: () => void;
  generateBoards: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  allBoards: [],
  currentBoardIndex: 0,
  selectedBoard: null,
  iaBoard: [],
  gamePhase: 'selection',
  
  setCurrentBoardIndex: (index: number) => set({ currentBoardIndex: index }),
  
  selectBoard: () => {
    const { allBoards, currentBoardIndex } = get();
    set({ 
      selectedBoard: allBoards[currentBoardIndex],
      gamePhase: 'transition'
    });
  },
  
  startGame: () => set({ gamePhase: 'playing' }),
  
  generateBoards: () => {
    const { LOTTERY_CARDS } = require('@/lib/cards');
    
    // Generar 10 tableros aleatorios
    const boards: Card[][] = [];
    for (let i = 0; i < 10; i++) {
      const shuffled = [...LOTTERY_CARDS].sort(() => Math.random() - 0.5);
      boards.push(shuffled.slice(0, 16));
    }
    
    // Generar tablero de IA
    const iaShuffled = [...LOTTERY_CARDS].sort(() => Math.random() - 0.5);
    const iaBoard = iaShuffled.slice(0, 16);
    
    set({ allBoards: boards, iaBoard });
  }
}));
