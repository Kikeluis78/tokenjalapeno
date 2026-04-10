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
  autoPlay: boolean; // Modo automático
  
  // Cartas cantadas
  currentCard: Card | null;
  calledCards: number[]; // IDs de cartas cantadas
  remainingCards: Card[];
  shakeCardId: number | null; // Carta que debe temblar
  
  // Marcado
  humanMarked: number[]; // IDs marcados por humano
  iaMarked: number[]; // IDs marcados por IA
  
  // Puntuación
  humanScore: number;
  iaScore: number;
  winner: 'human' | 'ia' | null;
  
  // Recompensas
  jalapenoBalance: number;
  lastPlayTime: number | null;
  canPlayFree: boolean;
  cooldownRemaining: number;
  weeklyWins: number;
  totalGames: number;
  currentStreak: number;
  gameStartTime: number | null;
  lastReward: number;
  doubleOrNothingCount: number;
  
  // Acciones
  setCurrentBoardIndex: (index: number) => void;
  selectBoard: () => void;
  startGame: () => void;
  generateBoards: () => void;
  resetGame: () => void;
  startCalling: () => void;
  pauseCalling: () => void;
  callNextCard: () => void;
  markCard: (cardId: number) => void;
  checkVictory: () => void;
  toggleAutoPlay: () => void;
  setShakeCard: (cardId: number | null) => void;
  updateCooldown: () => void;
  claimRewards: () => void;
  playDoubleOrNothing: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  allBoards: [],
  currentBoardIndex: 0,
  selectedBoard: null,
  iaBoard: [],
  gamePhase: 'selection',
  isPlaying: false,
  autoPlay: false,
  currentCard: null,
  calledCards: [],
  remainingCards: [],
  shakeCardId: null,
  humanMarked: [],
  iaMarked: [],
  humanScore: 0,
  iaScore: 0,
  winner: null,
  
  // Recompensas iniciales
  jalapenoBalance: 100, // Bienvenida
  lastPlayTime: null,
  canPlayFree: true,
  cooldownRemaining: 0,
  weeklyWins: 0,
  totalGames: 0,
  currentStreak: 0,
  gameStartTime: null,
  lastReward: 0,
  doubleOrNothingCount: 0,
  
  setCurrentBoardIndex: (index: number) => set({ currentBoardIndex: index }),
  
  toggleAutoPlay: () => set({ autoPlay: !get().autoPlay }),
  
  setShakeCard: (cardId: number | null) => set({ shakeCardId: cardId }),
  
  resetGame: () => {
    set({
      currentBoardIndex: 0,
      selectedBoard: null,
      gamePhase: 'selection',
      isPlaying: false,
      autoPlay: false, // Siempre manual por defecto
      currentCard: null,
      calledCards: [],
      remainingCards: [],
      shakeCardId: null,
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
      isPlaying: false,
      autoPlay: false,
      gameStartTime: Date.now() // Registrar inicio
    });
  },
  
  startCalling: () => {
    set({ isPlaying: true });
  },
  
  pauseCalling: () => {
    set({ isPlaying: false });
  },
  
  callNextCard: () => {
    const { remainingCards, iaBoard, iaMarked, selectedBoard, humanMarked, autoPlay } = get();
    
    if (remainingCards.length === 0) return;
    
    const nextCard = remainingCards[0];
    const newRemaining = remainingCards.slice(1);
    
    // Marcar automáticamente si la IA tiene esta carta
    let newIaMarked = [...iaMarked];
    if (iaBoard.some(card => card.id === nextCard.id) && !iaMarked.includes(nextCard.id)) {
      newIaMarked.push(nextCard.id);
    }
    
    // Si autoPlay está activado, marcar automáticamente para humano también
    let newHumanMarked = [...humanMarked];
    if (autoPlay && selectedBoard?.some(card => card.id === nextCard.id) && !humanMarked.includes(nextCard.id)) {
      newHumanMarked.push(nextCard.id);
    }
    
    set({
      currentCard: nextCard,
      calledCards: [...get().calledCards, nextCard.id],
      remainingCards: newRemaining,
      iaMarked: newIaMarked,
      humanMarked: newHumanMarked,
      shakeCardId: null, // Resetear shake
    });
    
    // Si NO es autoPlay y el humano tiene la carta, activar shake después de 7 segundos
    if (!autoPlay && selectedBoard?.some(card => card.id === nextCard.id) && !humanMarked.includes(nextCard.id)) {
      setTimeout(() => {
        const currentState = get();
        // Solo shake si aún no ha sido marcada
        if (!currentState.humanMarked.includes(nextCard.id)) {
          set({ shakeCardId: nextCard.id });
        }
      }, 7000);
    }
    
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
    const { selectedBoard, humanMarked, iaMarked, gameStartTime, currentStreak } = get();
    
    if (!selectedBoard) return;
    
    const gameDuration = gameStartTime ? (Date.now() - gameStartTime) / 1000 : 0; // segundos
    
    // Verificar si humano ganó (16 cartas marcadas)
    if (humanMarked.length === 16) {
      let reward = 100; // Victoria base
      
      // Bonus por victoria rápida (< 2 minutos)
      if (gameDuration < 120) {
        reward += 25;
      }
      
      set({ 
        winner: 'human',
        gamePhase: 'finished',
        isPlaying: false,
        humanScore: get().humanScore + 1,
        jalapenoBalance: get().jalapenoBalance + reward,
        weeklyWins: get().weeklyWins + 1,
        totalGames: get().totalGames + 1,
        currentStreak: currentStreak + 1,
        lastReward: reward,
        lastPlayTime: Date.now(),
        canPlayFree: false,
        cooldownRemaining: 8 * 60 * 60
      });
      return;
    }
    
    // Verificar si IA ganó
    if (iaMarked.length === 16) {
      const reward = 50; // Premio de consolación
      
      set({ 
        winner: 'ia',
        gamePhase: 'finished',
        isPlaying: false,
        iaScore: get().iaScore + 1,
        jalapenoBalance: get().jalapenoBalance + reward,
        totalGames: get().totalGames + 1,
        currentStreak: 0,
        lastReward: reward,
        lastPlayTime: Date.now(),
        canPlayFree: false,
        cooldownRemaining: 8 * 60 * 60
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
  },
  
  updateCooldown: () => {
    const { lastPlayTime, cooldownRemaining } = get();
    
    if (!lastPlayTime) {
      set({ canPlayFree: true, cooldownRemaining: 0 });
      return;
    }
    
    const elapsed = Math.floor((Date.now() - lastPlayTime) / 1000);
    const remaining = Math.max(0, (8 * 60 * 60) - elapsed);
    
    set({
      cooldownRemaining: remaining,
      canPlayFree: remaining === 0
    });
  },
  
  claimRewards: () => {
    // Simular cobro de recompensas
    // TODO: Integrar con smart contract real
    console.log('💰 Recompensas cobradas:', get().jalapenoBalance);
  },
  
  playDoubleOrNothing: () => {
    const { lastReward, doubleOrNothingCount } = get();
    
    // Máximo 3 doble o nada consecutivos
    if (doubleOrNothingCount >= 3) {
      alert('⚠️ Máximo 3 "Doble o Nada" consecutivos');
      return;
    }
    
    // Resetear juego y permitir jugar inmediatamente
    set({
      currentBoardIndex: 0,
      selectedBoard: null,
      gamePhase: 'selection',
      isPlaying: false,
      autoPlay: false,
      currentCard: null,
      calledCards: [],
      remainingCards: [],
      shakeCardId: null,
      humanMarked: [],
      iaMarked: [],
      winner: null,
      doubleOrNothingCount: doubleOrNothingCount + 1,
      // Mantener cooldown y balance
    });
  }
}));
