// Sistema de notificaciones para la app

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Este navegador no soporta notificaciones');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/logoSpinner.png',
      badge: '/logoSpinner.png',
      ...options,
    });
  }
};

export const notifyGameReady = () => {
  sendNotification('🎮 ¡Listo para jugar!', {
    body: 'Tu tiempo de espera terminó. ¡Juega ahora y gana tokens! 🌶️',
    tag: 'game-ready',
    requireInteraction: true,
  });
};

export const notifyGameResult = (won: boolean, reward: number) => {
  if (won) {
    sendNotification('🏆 ¡Victoria!', {
      body: `Ganaste ${reward} tokens Jalapeño 🌶️`,
      tag: 'game-result',
    });
  } else {
    sendNotification('🤖 La IA ganó', {
      body: `Premio de consolación: ${reward} tokens 🌶️`,
      tag: 'game-result',
    });
  }
};

export const scheduleNotification = (delayMs: number, callback: () => void) => {
  return setTimeout(callback, delayMs);
};
