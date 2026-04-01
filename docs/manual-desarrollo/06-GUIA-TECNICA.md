# 🔧 Guía Técnica de Implementación

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────┐
│           World App (Cliente Móvil)             │
│  - Wallet integrada (WLD/USDC)                  │
│  - World ID (verificación humana)               │
└─────────────────┬───────────────────────────────┘
                  │
                  │ HTTPS
                  ↓
┌─────────────────────────────────────────────────┐
│         Frontend (Next.js + MiniKit)            │
│  - UI del juego                                 │
│  - Lógica de cliente                            │
│  - Animaciones                                  │
└─────────────────┬───────────────────────────────┘
                  │
                  │ API Calls
                  ↓
┌─────────────────────────────────────────────────┐
│         Backend (Next.js API Routes)            │
│  - Generación de tableros                       │
│  - Validación de victorias                      │
│  - Gestión de sesiones                          │
└─────────────────┬───────────────────────────────┘
                  │
                  │ (Fase 2)
                  ↓
┌─────────────────────────────────────────────────┐
│         Smart Contracts (World Chain)           │
│  - Token JAL                                    │
│  - NFTs de cartas                               │
│  - Pool de premios                              │
└─────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Proyecto

```
my-first-mini-app/
├── app/
│   ├── page.tsx                 # Página principal
│   ├── game/
│   │   └── page.tsx            # Pantalla de juego
│   ├── api/
│   │   ├── game/
│   │   │   ├── start/route.ts  # Iniciar juego
│   │   │   ├── mark/route.ts   # Marcar carta
│   │   │   └── check/route.ts  # Verificar victoria
│   │   └── auth/
│   │       └── [...nextauth]/route.ts
│   └── layout.tsx
├── components/
│   ├── GameBoard.tsx           # Tablero 4x4
│   ├── Card.tsx                # Carta individual
│   ├── Caller.tsx              # Cantor de cartas
│   ├── WinModal.tsx            # Modal de victoria
│   └── CardInfo.tsx            # Info educativa
├── lib/
│   ├── game-logic.ts           # Lógica del juego
│   ├── cards-data.ts           # Datos de las 54 cartas
│   └── minikit.ts              # Configuración MiniKit
├── public/
│   └── cards/                  # Imágenes de cartas
│       ├── aguacate.png
│       ├── taco.png
│       └── ...
├── docs/
│   └── manual-desarrollo/      # Esta documentación
└── package.json
```

---

## 🎮 Lógica del Juego

### 1. Iniciar Juego

**Endpoint**: `POST /api/game/start`

```typescript
// Request
{
  "userId": "world_id_hash",
  "mode": "free" | "wld"
}

// Response
{
  "gameId": "uuid",
  "board": [1, 5, 12, 23, ...], // 16 IDs de cartas
  "sequence": "hash_of_sequence", // Para verificación
  "timestamp": 1234567890
}
```

**Lógica Server-Side:**
```typescript
function generateBoard(): number[] {
  // Seleccionar 16 cartas aleatorias de las 54
  const allCards = Array.from({length: 54}, (_, i) => i + 1);
  return shuffleArray(allCards).slice(0, 16);
}

function generateSequence(): number[] {
  // Orden en que se cantarán las cartas
  const allCards = Array.from({length: 54}, (_, i) => i + 1);
  return shuffleArray(allCards);
}
```

### 2. Cantar Cartas

**Lógica Client-Side:**
```typescript
function callNextCard(sequence: number[], index: number) {
  const cardId = sequence[index];
  const card = getCardById(cardId);
  
  // Mostrar animación
  showCardAnimation(card);
  
  // Esperar 5 segundos
  setTimeout(() => {
    callNextCard(sequence, index + 1);
  }, 5000);
}
```

### 3. Marcar Carta

**Endpoint**: `POST /api/game/mark`

```typescript
// Request
{
  "gameId": "uuid",
  "cardId": 12,
  "position": 5 // Posición en el tablero (0-15)
}

// Response
{
  "valid": true,
  "marked": [0, 3, 5, 8] // Posiciones marcadas
}
```

**Validación Server-Side:**
```typescript
function validateMark(gameId: string, cardId: number, position: number): boolean {
  const game = getGame(gameId);
  
  // Verificar que la carta está en esa posición
  if (game.board[position] !== cardId) return false;
  
  // Verificar que la carta ya fue cantada
  const calledCards = game.sequence.slice(0, game.currentIndex);
  if (!calledCards.includes(cardId)) return false;
  
  return true;
}
```

### 4. Verificar Victoria

**Endpoint**: `POST /api/game/check`

```typescript
// Request
{
  "gameId": "uuid",
  "marked": [0, 1, 2, 3] // Posiciones marcadas
}

// Response
{
  "winner": true,
  "pattern": "horizontal_top", // Tipo de línea
  "prize": 100 // Puntos JAL
}
```

**Lógica de Victoria:**
```typescript
const WINNING_PATTERNS = [
  // Horizontales
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // Verticales
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // Diagonales
  [0, 5, 10, 15],
  [3, 6, 9, 12]
];

function checkWin(marked: number[]): boolean {
  return WINNING_PATTERNS.some(pattern => 
    pattern.every(pos => marked.includes(pos))
  );
}
```

---

## 🎨 Componentes React

### GameBoard.tsx

```typescript
'use client';

import { useState, useEffect } from 'react';
import Card from './Card';

interface GameBoardProps {
  board: number[];
  calledCards: number[];
  onMark: (position: number) => void;
}

export default function GameBoard({ board, calledCards, onMark }: GameBoardProps) {
  const [marked, setMarked] = useState<number[]>([]);

  const handleCardClick = (position: number) => {
    const cardId = board[position];
    
    // Solo marcar si la carta ya fue cantada
    if (!calledCards.includes(cardId)) return;
    
    // Toggle marca
    if (marked.includes(position)) {
      setMarked(marked.filter(p => p !== position));
    } else {
      setMarked([...marked, position]);
      onMark(position);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {board.map((cardId, position) => (
        <Card
          key={position}
          cardId={cardId}
          isMarked={marked.includes(position)}
          isCalled={calledCards.includes(cardId)}
          onClick={() => handleCardClick(position)}
        />
      ))}
    </div>
  );
}
```

### Card.tsx

```typescript
'use client';

import Image from 'next/image';
import { getCardData } from '@/lib/cards-data';

interface CardProps {
  cardId: number;
  isMarked: boolean;
  isCalled: boolean;
  onClick: () => void;
}

export default function Card({ cardId, isMarked, isCalled, onClick }: CardProps) {
  const card = getCardData(cardId);

  return (
    <div
      onClick={onClick}
      className={`
        relative aspect-square rounded-lg overflow-hidden cursor-pointer
        transition-all duration-200
        ${isCalled ? 'ring-2 ring-yellow-400' : ''}
        ${isMarked ? 'opacity-50' : 'hover:scale-105'}
      `}
    >
      <Image
        src={card.imagen}
        alt={card.nombre}
        fill
        className="object-cover"
      />
      
      {isMarked && (
        <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
          <span className="text-6xl">✓</span>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
        <p className="text-white text-sm font-bold text-center">
          {card.nombre}
        </p>
      </div>
    </div>
  );
}
```

### Caller.tsx

```typescript
'use client';

import { useState, useEffect } from 'react';
import { getCardData } from '@/lib/cards-data';

interface CallerProps {
  sequence: number[];
  onCardCalled: (cardId: number) => void;
}

export default function Caller({ sequence, onCardCalled }: CallerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentIndex >= sequence.length) return;

    const timer = setTimeout(() => {
      const cardId = sequence[currentIndex];
      setIsAnimating(true);
      onCardCalled(cardId);
      
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(currentIndex + 1);
      }, 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, sequence, onCardCalled]);

  const currentCard = getCardData(sequence[currentIndex]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-purple-600 to-transparent p-4 z-50">
      <div className={`
        max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6
        transition-all duration-500
        ${isAnimating ? 'scale-110' : 'scale-100'}
      `}>
        <h2 className="text-2xl font-bold text-center mb-4">
          ¡{currentCard.nombre}!
        </h2>
        <Image
          src={currentCard.imagen}
          alt={currentCard.nombre}
          width={200}
          height={200}
          className="mx-auto rounded-lg"
        />
        <p className="text-center mt-4 text-gray-600">
          {currentCard.descripcion}
        </p>
      </div>
    </div>
  );
}
```

---

## 🔐 Integración con World App

### Configuración MiniKit

```typescript
// lib/minikit.ts
import { MiniKit } from '@worldcoin/minikit-js';

export const initMiniKit = () => {
  MiniKit.install(process.env.NEXT_PUBLIC_APP_ID!);
};

export const authenticateUser = async () => {
  const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
    nonce: generateNonce(),
    requestId: generateRequestId(),
    expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    notBefore: new Date(),
    statement: 'Autenticarse en Jalapeño Lotería',
  });

  return finalPayload;
};
```

### Verificación World ID (Fase 2)

```typescript
export const verifyWorldId = async (proof: any) => {
  const response = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ proof }),
  });

  return response.json();
};
```

---

## 📊 Base de Datos (Opcional para MVP)

### Schema Mínimo

```sql
-- Tabla de juegos activos
CREATE TABLE games (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  board INTEGER[] NOT NULL,
  sequence INTEGER[] NOT NULL,
  current_index INTEGER DEFAULT 0,
  marked INTEGER[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de usuarios (opcional)
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  world_id VARCHAR(255) UNIQUE,
  jal_points INTEGER DEFAULT 0,
  games_played INTEGER DEFAULT 0,
  games_won INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Alternativa Sin Base de Datos (MVP):**
- Usar estado en memoria (Redis/Vercel KV)
- Sesiones temporales
- No persistir historial

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Variables de entorno necesarias
NEXT_PUBLIC_APP_ID=your_world_app_id
AUTH_SECRET=your_auth_secret
AUTH_URL=https://your-domain.vercel.app
```

### Ngrok (Testing Local)

```bash
# Instalar ngrok
npm install -g ngrok

# Exponer puerto 3000
ngrok http 3000

# Copiar URL y configurar en Developer Portal
```

---

## 🧪 Testing

### Test de Lógica de Juego

```typescript
// __tests__/game-logic.test.ts
import { checkWin, generateBoard } from '@/lib/game-logic';

describe('Game Logic', () => {
  test('detecta victoria horizontal', () => {
    const marked = [0, 1, 2, 3];
    expect(checkWin(marked)).toBe(true);
  });

  test('genera tablero de 16 cartas únicas', () => {
    const board = generateBoard();
    expect(board.length).toBe(16);
    expect(new Set(board).size).toBe(16);
  });
});
```

---

## 📦 Dependencias Necesarias

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "@worldcoin/minikit-js": "latest",
    "next-auth": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "@types/react": "^18.0.0"
  }
}
```

---

## ⚡ Optimizaciones

### Performance
- Lazy loading de imágenes de cartas
- Preload de cartas del tablero
- Memoización de componentes
- Debounce de clicks

### UX
- Loading states
- Error boundaries
- Offline detection
- Animaciones suaves

### SEO (Menos crítico para Mini App)
- Metadata básico
- Open Graph tags
- Descripción del juego
