# Protocolo de Desarrollo - Mini App Jalapeño Lottery

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Flujo de Desarrollo](#flujo-de-desarrollo)
5. [Estándares de Código](#estándares-de-código)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Seguridad](#seguridad)

---

## Introducción

Este documento establece el protocolo completo para el desarrollo de la Mini App "Jalapeño Lottery" en el ecosistema de World App, siguiendo las mejores prácticas y estándares de la plataforma.

## Requisitos Previos

### Herramientas Necesarias

```bash
# Node.js (v18 o superior)
node --version

# npm viene incluido con Node.js

# Foundry (para smart contracts)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Git
git --version
```

### Cuentas y Credenciales

1. **Developer Portal**: [developer.worldcoin.org](https://developer.worldcoin.org)
   - Crear cuenta
   - Registrar nueva app
   - Obtener `app_id`, `rp_id`, `signing_key`

2. **World App**: Descargar e instalar
   - iOS: App Store
   - Android: Google Play

3. **Wallet**: Configurar wallet en World App
   - Fondear con ETH en World Chain Sepolia (testnet)
   - Faucet: [alchemy.com/faucets/world-chain-sepolia](https://www.alchemy.com/faucets/world-chain-sepolia)

## Estructura del Proyecto

### Arquitectura de Carpetas

```
my-first-mini-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   ├── rp-signature/  # Firma RP
│   │   │   ├── verify-proof/  # Verificación World ID
│   │   │   └── airdrop/       # Lógica de airdrop
│   │   ├── lottery/           # Páginas de lotería
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes UI base
│   │   ├── lottery/          # Componentes de lotería
│   │   └── airdrop/          # Componentes de airdrop
│   ├── lib/                   # Utilidades
│   │   ├── worldid.ts        # Helpers World ID
│   │   ├── contracts.ts      # Interacción contratos
│   │   └── utils.ts          # Utilidades generales
│   └── styles/               # Estilos globales
├── contracts/                 # Smart Contracts
│   ├── src/
│   │   ├── JalapenoLottery.sol
│   │   ├── JalapenoAirdrop.sol
│   │   └── JalapenoToken.sol
│   ├── test/                 # Tests de contratos
│   └── script/               # Scripts de deploy
├── public/
│   ├── images/
│   │   ├── jalapeno/         # Assets de mascota
│   │   └── lottery/          # Assets de lotería
│   └── locales/              # Traducciones
├── manual/                    # Documentación
│   ├── Desarrollo.md
│   ├── Especificaciones-Tecnicas.md
│   └── Flujo-Visual.md
├── .env.local                # Variables de entorno
├── .env.example              # Ejemplo de variables
├── next.config.ts            # Configuración Next.js
├── package.json
└── README.md
```

## Flujo de Desarrollo

### 1. Inicialización del Proyecto

```bash
# Clonar template
npx @worldcoin/create-mini-app@latest jalapeno-lottery
cd jalapeno-lottery

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

### 2. Configuración de Variables de Entorno

```env
# .env.local

# World ID
NEXT_PUBLIC_APP_ID=app_xxxxx
NEXT_PUBLIC_RP_ID=rp_xxxxx
RP_SIGNING_KEY=xxxxx  # ⚠️ NUNCA exponer en cliente

# World Chain
NEXT_PUBLIC_CHAIN_ID=4801  # Sepolia testnet
NEXT_PUBLIC_RPC_URL=https://worldchain-sepolia.g.alchemy.com/public

# Contratos (después de deploy)
NEXT_PUBLIC_LOTTERY_CONTRACT=0x...
NEXT_PUBLIC_AIRDROP_CONTRACT=0x...
NEXT_PUBLIC_TOKEN_CONTRACT=0x...

# URLs
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
AUTH_URL=https://tu-app.vercel.app  # Para ngrok en desarrollo
```

### 3. Desarrollo de Smart Contracts

#### Paso 1: Crear Contrato de Lotería

```solidity
// contracts/src/JalapenoLottery.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IWorldID } from "./interfaces/IWorldID.sol";
import { ByteHasher } from "./helpers/ByteHasher.sol";

contract JalapenoLottery {
    using ByteHasher for bytes;
    
    IWorldID internal immutable worldId;
    uint256 internal immutable externalNullifier;
    uint256 internal immutable groupId = 1;
    
    struct LotteryRound {
        uint256 roundId;
        uint256 prizePool;
        uint256 ticketPrice;
        uint256 endTime;
        bool drawn;
        address winner;
    }
    
    mapping(uint256 => LotteryRound) public rounds;
    mapping(uint256 => bool) public nullifierHashes;
    mapping(uint256 => mapping(address => uint256)) public tickets;
    
    event TicketPurchased(uint256 indexed roundId, address indexed player, uint256 ticketCount);
    event WinnerDrawn(uint256 indexed roundId, address indexed winner, uint256 prize);
    
    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }
    
    function buyTicket(
        uint256 roundId,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external payable {
        require(!nullifierHashes[nullifierHash], "Already participated");
        require(msg.value >= rounds[roundId].ticketPrice, "Insufficient payment");
        
        // Verificar World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(msg.sender).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );
        
        nullifierHashes[nullifierHash] = true;
        tickets[roundId][msg.sender]++;
        rounds[roundId].prizePool += msg.value;
        
        emit TicketPurchased(roundId, msg.sender, 1);
    }
}
```

#### Paso 2: Compilar y Testear

```bash
cd contracts

# Compilar
forge build

# Ejecutar tests
forge test -vvv

# Coverage
forge coverage
```

#### Paso 3: Deploy a Testnet

```bash
# Deploy a World Chain Sepolia
forge create src/JalapenoLottery.sol:JalapenoLottery \
  --rpc-url $WORLD_CHAIN_RPC_URL \
  --private-key $PRIVATE_KEY \
  --constructor-args \
    "0x57f928158C3EE7CDad1e4D8642503c4D0201f611" \
    "app_xxxxx" \
    "buy-lottery-ticket"
```

### 4. Desarrollo del Frontend

#### Paso 1: Configurar MiniKit Provider

```tsx
// src/app/layout.tsx
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <MiniKitProvider>
          {children}
        </MiniKitProvider>
      </body>
    </html>
  );
}
```

#### Paso 2: Crear Endpoint de Firma RP

```typescript
// src/app/api/rp-signature/route.ts
import { NextResponse } from 'next/server';
import { signRequest } from '@worldcoin/idkit/signing';

export async function POST(request: Request) {
  const { action } = await request.json();
  
  const signingKey = process.env.RP_SIGNING_KEY!;
  const { sig, nonce, createdAt, expiresAt } = signRequest(action, signingKey);
  
  return NextResponse.json({
    sig,
    nonce,
    created_at: createdAt,
    expires_at: expiresAt,
  });
}
```

#### Paso 3: Implementar Verificación World ID

```typescript
// src/app/api/verify-proof/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { rp_id, idkitResponse } = await request.json();
  
  const response = await fetch(
    `https://developer.worldcoin.org/api/v4/verify/${rp_id}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(idkitResponse),
    }
  );
  
  const payload = await response.json();
  return NextResponse.json(payload, { status: response.status });
}
```

#### Paso 4: Crear Componente de Compra de Boleto

```tsx
// src/components/lottery/BuyTicketButton.tsx
'use client';

import { IDKitRequestWidget, orbLegacy } from '@worldcoin/idkit';
import { useState } from 'react';

export function BuyTicketButton({ roundId }: { roundId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleVerify = async (result: any) => {
    setIsLoading(true);
    
    try {
      // Verificar proof
      const verifyResponse = await fetch('/api/verify-proof', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          rp_id: process.env.NEXT_PUBLIC_RP_ID,
          idkitResponse: result,
        }),
      });
      
      if (!verifyResponse.ok) {
        throw new Error('Verificación falló');
      }
      
      // Comprar boleto en el contrato
      // ... lógica de transacción
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <IDKitRequestWidget
      app_id={process.env.NEXT_PUBLIC_APP_ID!}
      action="buy-lottery-ticket"
      rp_context={/* obtener de API */}
      preset={orbLegacy()}
      handleVerify={handleVerify}
      onSuccess={() => console.log('¡Boleto comprado!')}
    >
      {({ open }) => (
        <button 
          onClick={open}
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? 'Procesando...' : 'Comprar Boleto 🌶️'}
        </button>
      )}
    </IDKitRequestWidget>
  );
}
```

### 5. Testing Local

```bash
# Terminal 1: Iniciar servidor de desarrollo
npm run dev

# Terminal 2: Iniciar ngrok
ngrok http 3000

# Actualizar .env.local con URL de ngrok
AUTH_URL=https://tu-url.ngrok.app

# Agregar URL a allowedDevOrigins en next.config.ts
```

### 6. Testing en World App

1. Abrir Developer Portal
2. Configurar URL de ngrok en tu app
3. Escanear QR code con World App
4. Probar flujo completo

## Estándares de Código

### TypeScript

```typescript
// ✅ Buenas prácticas
interface LotteryTicket {
  roundId: number;
  owner: string;
  purchaseTime: number;
}

// Usar tipos explícitos
const buyTicket = async (roundId: number): Promise<LotteryTicket> => {
  // ...
};

// ❌ Evitar
const buyTicket = async (roundId: any) => {
  // ...
};
```

### Solidity

```solidity
// ✅ Buenas prácticas
// - Usar versión específica de Solidity
// - Documentar con NatSpec
// - Seguir Checks-Effects-Interactions

/// @notice Compra un boleto de lotería
/// @param roundId ID de la ronda actual
function buyTicket(uint256 roundId) external payable {
    // Checks
    require(msg.value >= ticketPrice, "Insufficient payment");
    
    // Effects
    tickets[roundId][msg.sender]++;
    
    // Interactions
    // ...
}
```

### Naming Conventions

- **Componentes React**: PascalCase (`BuyTicketButton.tsx`)
- **Funciones**: camelCase (`buyTicket()`)
- **Constantes**: UPPER_SNAKE_CASE (`TICKET_PRICE`)
- **Contratos**: PascalCase (`JalapenoLottery.sol`)

## Testing

### Tests de Smart Contracts

```solidity
// contracts/test/JalapenoLottery.t.sol
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/JalapenoLottery.sol";

contract JalapenoLotteryTest is Test {
    JalapenoLottery lottery;
    
    function setUp() public {
        lottery = new JalapenoLottery(/* ... */);
    }
    
    function testBuyTicket() public {
        // Arrange
        uint256 roundId = 1;
        
        // Act
        lottery.buyTicket{value: 0.01 ether}(roundId, /* ... */);
        
        // Assert
        assertEq(lottery.tickets(roundId, address(this)), 1);
    }
}
```

### Tests de Integración

```typescript
// __tests__/lottery.test.ts
import { describe, it, expect } from 'vitest';

describe('Lottery Flow', () => {
  it('should allow verified user to buy ticket', async () => {
    // Test completo del flujo
  });
});
```

## Deployment

### Checklist Pre-Deploy

- [ ] Todos los tests pasan
- [ ] Variables de entorno configuradas
- [ ] Smart contracts auditados
- [ ] UI/UX revisado
- [ ] Documentación actualizada
- [ ] Backup de claves privadas

### Deploy a Producción

```bash
# 1. Deploy contratos a World Chain Mainnet
forge create src/JalapenoLottery.sol:JalapenoLottery \
  --rpc-url https://worldchain-mainnet.g.alchemy.com/public \
  --private-key $PRIVATE_KEY \
  --verify

# 2. Deploy frontend a Vercel
vercel --prod

# 3. Actualizar Developer Portal con URL de producción
```

## Seguridad

### Checklist de Seguridad

- [ ] Nunca exponer `RP_SIGNING_KEY` en cliente
- [ ] Validar todos los proofs en backend
- [ ] Usar HTTPS en producción
- [ ] Implementar rate limiting
- [ ] Auditar smart contracts
- [ ] Usar nullifiers para prevenir duplicados
- [ ] Validar inputs del usuario
- [ ] Implementar manejo de errores robusto

### Recursos de Seguridad

- [Smart Contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [World ID Security Guidelines](https://docs.world.org/world-id)

## Recursos Adicionales

- **Documentación**: [docs.world.org](https://docs.world.org)
- **Telegram**: [@worlddevelopersupport](https://t.me/worlddevelopersupport)
- **Discord**: [world.org/discord](https://world.org/discord)
- **GitHub**: [github.com/worldcoin](https://github.com/worldcoin)

---

**Última actualización**: 2025-03-25
