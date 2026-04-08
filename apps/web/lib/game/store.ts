import { create } from 'zustand';
import { Card, LOTTERY_CARDS } from '@/lib/cards';

interface GameState {
  // Tableros
  allBoards: Card[][];
  currentBoardIndex: number;
  selectedBoard: Card[] | null;
  iaBoard: Card[];
  
  // Estado del juego
  gamePhase: 'selection' | 'transition' | 'playing' | 'finished';
  isPlaying: boolean;
  
  // Cartas cantadas
  currentCard: Card | null;
  calledCards: number[]; // IDs de cartas cantadas
  remainingCards: Card[];
  
  // Marcado
  humanMarked: number[]; // IDs marcados por humano
  iaMarked: number[]; // IDs marcados por IA
  
  // Puntuación
  humanScore: number;
  iaScore: number;
  winner: 'human' | 'ia' | null;
  
  // Acciones
  setCurrentBoardIndex: (index: number) => void;
  selectBoard: () => void;
  startGame: () => void;
  generateBoards: () => void;
  resetGame: () => void;
  startCalling: () => void;
  callNextCard: () => void;
  markCard: (cardId: number) => void;
  checkVictory: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  allBoards: [],
  currentBoardIndex: 0,
  selectedBoard: null,
  iaBoard: [],
  gamePhase: 'selection',
  isPlaying: false,
  currentCard: null,
  calledCards: [],
  remainingCards: [],
  humanMarked: [],
  iaMarked: [],
  humanScore: 0,
  iaScore: 0,
  winner: null,
  
  setCurrentBoardIndex: (index: number) => set({ currentBoardIndex: index }),
  
  resetGame: () => {
    set({
      currentBoardIndex: 0,
      selectedBoard: null,
      gamePhase: 'selection',
      isPlaying: false,
      currentCard: null,
      calledCards: [],
      remainingCards: [],
      humanMarked: [],
      iaMarked: [],
      winner: null,
    });
  },

  selectBoard: () => {
    const { allBoards, currentBoardIndex } = get();
    set({ 
      selectedBoard: allBoards[currentBoardIndex],
      gamePhase: 'transition'
    });
  },
  
  startGame: () => {
    // Preparar cartas para cantar (barajadas)
    const shuffled = [...LOTTERY_CARDS].sort(() => Math.random() - 0.5);
    set({ 
      gamePhase: 'playing',
      remainingCards: shuffled,
      isPlaying: false
    });
  },
  
  startCalling: () => {
    set({ isPlaying: true });
  },
  
  callNextCard: () => {
    const { remainingCards, iaBoard, iaMarked } = get();
    
    if (remainingCards.length === 0) return;
    
    const nextCard = remainingCards[0];
    const newRemaining = remainingCards.slice(1);
    
    // Marcar automáticamente si la IA tiene esta carta
    let newIaMarked = [...iaMarked];
    if (iaBoard.some(card => card.id === nextCard.id) && !iaMarked.includes(nextCard.id)) {
      newIaMarked.push(nextCard.id);
    }
    
    set({
      currentCard: nextCard,
      calledCards: [...get().calledCards, nextCard.id],
      remainingCards: newRemaining,
      iaMarked: newIaMarked
    });
    
    // Verificar victoria después de marcar
    setTimeout(() => get().checkVictory(), 100);
  },
  
  markCard: (cardId: number) => {
    const { calledCards, humanMarked, selectedBoard } = get();
    
    // Solo puede marcar si la carta fue cantada y está en su tablero
    if (!calledCards.includes(cardId)) return;
    if (!selectedBoard?.some(card => card.id === cardId)) return;
    if (humanMarked.includes(cardId)) return;
    
    set({ humanMarked: [...humanMarked, cardId] });
    
    // Verificar victoria
    setTimeout(() => get().checkVictory(), 100);
  },
  
  checkVictory: () => {
    const { selectedBoard, iaBoard, humanMarked, iaMarked } = get();
    
    if (!selectedBoard) return;
    
    // Verificar si humano ganó (16 cartas marcadas)
    if (humanMarked.length === 16) {
      set({ 
        winner: 'human',
        gamePhase: 'finished',
        isPlaying: false,
        humanScore: get().humanScore + 1
      });
      return;
    }
    
    // Verificar si IA ganó
    if (iaMarked.length === 16) {
      set({ 
        winner: 'ia',
        gamePhase: 'finished',
        isPlaying: false,
        iaScore: get().iaScore + 1
      });
    }
  },
  
  generateBoards: () => {
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
