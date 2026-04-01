import { useCallback } from 'react';

// Hook personalizado para manejar audio
export const useAudio = () => {
  const playCardAudio = useCallback((cardId: number) => {
    try {
      // Por ahora usamos Text-to-Speech del navegador como fallback
      const cardName = getCardName(cardId);
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(cardName);
        utterance.lang = 'es-MX';
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
      }
      
      // TODO: Reemplazar con archivos de audio reales cuando estén disponibles
      // const audio = new Audio(`/audio/cards/card-${cardId}.mp3`);
      // audio.play().catch(console.error);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }, []);

  const playEffect = useCallback((effect: 'victory' | 'cardMark' | 'gameStart') => {
    try {
      // Efectos de sonido simples por ahora
      if (effect === 'victory') {
        // Crear sonido de victoria con Web Audio API
        const audioContext = new (window.AudioContext || (window as AudioContext).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }
    } catch (error) {
      console.error('Error playing effect:', error);
    }
  }, []);

  return { playCardAudio, playEffect };
};

// Función auxiliar para obtener el nombre de la carta
const getCardName = (cardId: number): string => {
  const cardNames: Record<number, string> = {
    1: 'El Gallo',
    2: 'El Diablito',
    3: 'La Dama',
    4: 'El Catrín',
    5: 'El Paraguas',
    6: 'La Sirena',
    7: 'La Escalera',
    8: 'La Botella',
    9: 'El Barril',
    10: 'El Árbol',
    11: 'El Melón',
    12: 'El Valiente',
    13: 'El Gorrito',
    14: 'La Muerte',
    15: 'La Pera',
    16: 'La Bandera',
    17: 'El Bandolón',
    18: 'El Violoncello',
    19: 'La Garza',
    20: 'El Pájaro',
    21: 'La Mano',
    22: 'La Bota',
    23: 'La Luna',
    24: 'El Cotorro',
    25: 'El Borracho',
    26: 'El Negrito',
    27: 'El Corazón',
    28: 'La Sandía',
    29: 'El Tambor',
    30: 'El Camarón',
    31: 'Las Jaras',
    32: 'El Músico',
    33: 'La Araña',
    34: 'El Soldado',
    35: 'La Estrella',
    36: 'El Cazo',
    37: 'El Mundo',
    38: 'El Apache',
    39: 'El Nopal',
    40: 'El Alacrán',
    41: 'La Rosa',
    42: 'La Calavera',
    43: 'La Campana',
    44: 'El Cantarito',
    45: 'El Venado',
    46: 'El Sol',
    47: 'La Corona',
    48: 'La Chalupa',
    49: 'El Pino',
    50: 'El Pescado',
    51: 'La Palma',
    52: 'La Maceta',
    53: 'El Arpa',
    54: 'La Rana',
    55: 'El Jalapeño',
  };
  
  return cardNames[cardId] || 'Carta desconocida';
};
