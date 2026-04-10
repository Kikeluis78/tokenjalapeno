# Sistema de Recompensas - Jalapeño Lottery 🌶️

**Última actualización**: 09 de abril de 2026

---

## 📋 Resumen Ejecutivo

Sistema de recompensas competitivo basado en Jalapeño Token, integrado con World ID y WLD, diseñado para maximizar engagement y crear una economía sostenible dentro del ecosistema World App.

---

## 🎮 Mecánica de Juego

### Reglas Básicas

**Frecuencia de Juego:**
- Usuario puede jugar **gratis cada 8 horas**
- Cooldown se reinicia después de cada juego
- Timer visible en UI mostrando tiempo restante

**Recompensas por Partida:**
- 🥈 **Derrota**: 50 Jalapeños
- 🥇 **Victoria**: 100 Jalapeños
- 🔥 **Victoria rápida** (< 2 min): +25 Jalapeños bonus
- ⚡ **Primera victoria del día**: +25 Jalapeños bonus

**Objetivo Semanal:**
- Acumular **7 victorias** en la semana
- Califica automáticamente para sorteo semanal
- Contador visible: "Victorias: X/7"

---

## 💎 Doble o Nada

**Mecánica:**
- Disponible después de cada partida (victoria o derrota)
- Usuario apuesta los Jalapeños ganados en esa partida
- Si gana: **Duplica** los Jalapeños apostados
- Si pierde: **Pierde** los Jalapeños apostados
- Permite jugar inmediatamente (sin esperar 8 horas)

**Ejemplo:**
```
Partida 1: Victoria → 100 Jalapeños
↓
[Doble o Nada]
↓
Partida 2: Victoria → 200 Jalapeños (100 + 100)
Partida 2: Derrota → 0 Jalapeños (pierde los 100)
```

**Límites:**
- Máximo 3 "Doble o Nada" consecutivos
- Después debe esperar cooldown normal (8 horas)

---

## 💰 Compra de Juegos

**Precio:**
- **0.001 WLD** = 1 juego adicional
- Sin límite de compras
- No afecta cooldown de juegos gratis

**Beneficios:**
- Juega inmediatamente
- Acumula victorias para sorteo semanal
- Mismas recompensas que juego gratis

**Integración:**
- Pago con MiniKit (World App)
- Transacción en World Chain
- Confirmación instantánea

---

## 🏆 Sorteo Semanal

**Requisitos de Participación:**
- Mínimo **7 victorias** en la semana
- Verificación con World ID (1 entrada por persona)
- Semana: Lunes 00:00 - Domingo 18:59 (hora México)

**Evento:**
- **Fecha**: Todos los domingos
- **Hora**: 7:00 PM (hora México / CST)
- **Duración**: 30 minutos
- **Premio**: 1000 Jalapeños

**Mecánica del Sorteo:**
- Todos los calificados (7+ victorias) entran automáticamente
- Sorteo aleatorio verificable on-chain
- Ganador anunciado en vivo
- Premio depositado automáticamente en wallet

**Bonus Adicionales:**
- 🥇 **1er lugar**: 1000 Jalapeños
- 🥈 **2do lugar**: 500 Jalapeños (si hay 50+ participantes)
- 🥉 **3er lugar**: 250 Jalapeños (si hay 100+ participantes)

---

## 🪙 Jalapeño Token

### Tokenomics (Simulado)

**Creación Inicial:**
- Token creado en **Puff** (plataforma de tokens gratuitos)
- Supply inicial: **Por definir** (depende de creación gratuita)
- Opción: Pagar WLD para crear más supply

**Utilidad:**
- Recompensa por jugar
- Convertible a WLD dentro del ecosistema
- Participación en sorteos
- Futuro: Staking, governance, NFTs

**Conversión (Propuesta):**
- 1000 Jalapeños = 0.01 WLD (ratio inicial)
- Ratio ajustable según demanda
- Conversión disponible en World App

### Distribución

```
Total Supply: 1,000,000 Jalapeños (ejemplo)

├── 60% Recompensas de juego (600,000)
├── 20% Sorteos semanales (200,000)
├── 10% Equipo/Desarrollo (100,000)
├── 5% Marketing/Airdrops (50,000)
└── 5% Reserva/Liquidez (50,000)
```

---

## 🎯 Flujo de Usuario

### Primera Vez

```
1. Usuario abre app
2. Verificación World ID
3. Recibe 100 Jalapeños de bienvenida
4. Tutorial interactivo
5. Primera partida gratis
```

### Juego Regular

```
1. Usuario entra a app
2. Ve timer de cooldown o "Jugar Ahora"
3. Selecciona tablero
4. Juega partida (Humano vs IA)
5. Resultado:
   ├── Victoria: +100 Jalapeños
   └── Derrota: +50 Jalapeños
6. Modal con opciones:
   ├── [Cobrar] → Envía a wallet
   ├── [Doble o Nada] → Nueva partida
   └── [Comprar juego] → 0.001 WLD
```

### Sorteo Semanal

```
1. Usuario acumula 7+ victorias
2. Domingo 7:00 PM: Notificación push
3. Entra a app para ver sorteo en vivo
4. Ganador anunciado
5. Premio depositado automáticamente
6. Contador de victorias se reinicia
```

---

## 📊 Métricas a Implementar

### En Store (Zustand)

```typescript
interface RewardsState {
  // Balance
  jalapenoBalance: number;
  
  // Cooldown
  lastPlayTime: number | null;
  canPlayFree: boolean;
  cooldownRemaining: number; // segundos
  
  // Victorias semanales
  weeklyWins: number;
  weeklyTarget: 7;
  qualifiedForRaffle: boolean;
  
  // Racha
  currentStreak: number;
  bestStreak: number;
  
  // Historial
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  
  // Doble o Nada
  doubleOrNothingCount: number;
  canDoubleOrNothing: boolean;
}
```

### En UI

**Header:**
- Balance de Jalapeños
- Timer de cooldown
- Victorias semanales (X/7)

**Footer:**
- Victorias totales (usuario vs IA)
- Racha actual

**Modal Victoria/Derrota:**
- Jalapeños ganados
- Balance total
- Victorias para sorteo
- Botones de acción

---

## 🔐 Integración World ID

### Verificación

```typescript
// Verificar humanidad (1 vez)
const verifyHuman = async () => {
  const proof = await IDKit.verify({
    action: "play-lottery",
    signal: userAddress,
  });
  
  // Enviar proof al backend
  const response = await fetch("/api/verify-proof", {
    method: "POST",
    body: JSON.stringify(proof),
  });
  
  return response.ok;
};
```

### Prevención de Duplicados

- Nullifier hash único por usuario
- 1 entrada por sorteo semanal
- Verificación on-chain

---

## 💳 Integración WLD (MiniKit)

### Compra de Juegos

```typescript
// Pagar 0.001 WLD por juego
const buyGame = async () => {
  const payment = await MiniKit.commandsAsync.pay({
    reference: `game-${Date.now()}`,
    to: TREASURY_ADDRESS,
    tokens: [
      {
        symbol: "WLD",
        token_amount: "0.001",
      },
    ],
  });
  
  if (payment.status === "success") {
    // Habilitar juego inmediato
    enableGame();
  }
};
```

### Cobro de Jalapeños

```typescript
// Enviar Jalapeños a wallet del usuario
const claimRewards = async (amount: number) => {
  // Llamar smart contract
  const tx = await jalapenoContract.transfer(
    userAddress,
    amount
  );
  
  await tx.wait();
  return tx.hash;
};
```

---

## 🎨 Diseño de Modales

### Modal Victoria

```
┌─────────────────────────────┐
│     🎉 ¡VICTORIA! 🎉        │
│                             │
│   +100 🌶️ Jalapeños        │
│                             │
│   Balance: 350 🌶️          │
│   Victorias: 4/7 🏆         │
│                             │
│  ┌─────────────────────┐   │
│  │   💰 Cobrar         │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │   🎲 Doble o Nada   │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 💎 Comprar juego    │   │
│  │   (0.001 WLD)       │   │
│  └─────────────────────┘   │
│                             │
│  Próximo juego gratis:      │
│  ⏱️ 7h 45m                  │
└─────────────────────────────┘
```

### Modal Derrota

```
┌─────────────────────────────┐
│     😔 Derrota              │
│                             │
│   +50 🌶️ Jalapeños         │
│   (Premio de consolación)   │
│                             │
│   Balance: 300 🌶️          │
│   Victorias: 3/7 🏆         │
│                             │
│  ┌─────────────────────┐   │
│  │   💰 Cobrar         │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │   🎲 Doble o Nada   │   │
│  │   (Recupera 100!)   │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 💎 Comprar juego    │   │
│  │   (0.001 WLD)       │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
```

---

## 🚀 Roadmap de Implementación

### Fase 1: Sistema Base (Actual)
- ✅ Juego funcional (Humano vs IA)
- ✅ Contador de victorias
- ✅ Footer con scores
- ⏳ Modal Victoria/Derrota mejorado
- ⏳ Sistema de cooldown (8 horas)
- ⏳ Balance de Jalapeños (simulado)

### Fase 2: Recompensas Simuladas
- ⏳ Doble o Nada
- ⏳ Contador de victorias semanales (0/7)
- ⏳ Historial de juegos
- ⏳ Racha de victorias

### Fase 3: Integración World ID
- ⏳ Verificación de humanidad
- ⏳ Prevención de duplicados
- ⏳ Wallet ID en UI

### Fase 4: Token Real
- ⏳ Crear Jalapeño Token en Puff
- ⏳ Smart contract de distribución
- ⏳ Integración con World Chain
- ⏳ Sistema de cobro real

### Fase 5: Compra con WLD
- ⏳ Integración MiniKit Pay
- ⏳ Compra de juegos (0.001 WLD)
- ⏳ Treasury wallet

### Fase 6: Sorteo Semanal
- ⏳ Sistema de calificación (7 victorias)
- ⏳ Smart contract de sorteo
- ⏳ Evento en vivo
- ⏳ Distribución automática de premios

### Fase 7: Features Avanzados
- ⏳ Leaderboard
- ⏳ Achievements/Badges
- ⏳ Staking de Jalapeños
- ⏳ Marketplace de tableros NFT

---

## 📈 KPIs y Métricas

### Engagement
- DAU (Daily Active Users)
- Retention (D1, D7, D30)
- Tiempo promedio de sesión
- Juegos por usuario/día

### Economía
- Jalapeños distribuidos/día
- Conversión Jalapeño → WLD
- Compras de juegos (0.001 WLD)
- Participación en sorteos

### Competitividad
- % usuarios con 7+ victorias
- Racha promedio
- Tasa de victoria (Humano vs IA)
- Uso de "Doble o Nada"

---

## 🔒 Seguridad

### Prevención de Abuso
- World ID: 1 cuenta por persona
- Nullifier hash único
- Rate limiting en API
- Cooldown obligatorio

### Smart Contracts
- Auditoría antes de mainnet
- Multisig para treasury
- Timelock para cambios críticos
- Emergency pause

### Backend
- Validación de proofs
- Logs de transacciones
- Monitoreo de anomalías
- Backup de datos

---

## 💡 Notas Importantes

### Jalapeño Token (Puff)
- **Creación gratuita**: Supply limitado
- **Opción de pago**: Crear más tokens pagando WLD
- **Ratio de conversión**: Por definir según supply
- **Mantener confidencial**: No subir detalles a GitHub

### Consideraciones Legales
- No es gambling (siempre ganas algo)
- Verificación de edad con World ID
- Términos y condiciones claros
- Cumplimiento con regulaciones locales

### Escalabilidad
- Diseñar para 10,000+ usuarios
- Optimizar gas fees en World Chain
- Cache de datos frecuentes
- CDN para assets

---

## 📞 Recursos

- **World Docs**: https://docs.world.org
- **MiniKit Docs**: https://docs.world.org/minikit
- **Puff**: https://puff.world (creación de tokens)
- **World Chain**: https://worldchain.org

---

**Preparado por**: Kiro AI Assistant  
**Fecha**: 09 de abril de 2026, 18:50 CST
