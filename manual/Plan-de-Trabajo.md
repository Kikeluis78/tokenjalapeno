# Plan de Trabajo - Jalapeño Lottery

## 📋 Reglas de Oro

### ❌ NO TOCAR
- **Sistema de autenticación** (Auth buttons y lógica)
- **MiniKit Provider** y configuración
- **World ID integration** existente

### ✅ Filosofía de la App
- **Acceso público**: Cualquier persona puede jugar
- **Recompensas mejoradas**: Usuarios verificados con World ID obtienen mejores premios
- **Ambiente**: Mini App dentro de World App

---

## 🗂️ Fase 1: Limpieza y Restructuración

### 1.1 Limpieza de `/public`
- [ ] Eliminar imágenes no necesarias
- [ ] Mantener solo assets esenciales
- [ ] Crear estructura para assets de Jalapeño

### 1.2 Limpieza de `/src/app`
- [ ] Revisar páginas existentes
- [ ] Eliminar código de ejemplo no necesario
- [ ] Mantener estructura de autenticación intacta

### 1.3 Limpieza de `/src/components`
- [ ] Identificar componentes reutilizables
- [ ] Eliminar componentes de ejemplo
- [ ] Mantener componentes de Auth

---

## 🎮 Fase 2: Estructura de la Lotería

### 2.1 Páginas Principales
```
/                    → Landing page (público)
/lottery             → Juego de lotería (público)
/my-tickets          → Mis boletos (requiere wallet)
/results             → Resultados de sorteos
/airdrop             → Reclamar airdrop (requiere World ID)
```

### 2.2 Componentes Nuevos
```
components/
├── lottery/
│   ├── TicketSelector.tsx      → Seleccionar números
│   ├── BuyTicketButton.tsx     → Comprar boleto
│   ├── TicketCard.tsx          → Mostrar boleto
│   └── DrawResults.tsx         → Resultados del sorteo
├── airdrop/
│   ├── ClaimButton.tsx         → Reclamar airdrop
│   └── TierDisplay.tsx         → Mostrar tier de usuario
└── ui/
    └── JalapenoMascot.tsx      → Mascota animada
```

---

## 🌶️ Fase 3: Temática Mexicana

### 3.1 Assets Necesarios
- [ ] Jalapeño mascota (normal, feliz, triste)
- [ ] Iconos de chiles (bronze, silver, gold, platinum)
- [ ] Patrón de sarape mexicano
- [ ] Colores: Verde (#006847), Blanco (#FFFFFF), Rojo (#CE1126)

### 3.2 Tipografía y Estilo
- [ ] Fuente principal: Sans-serif moderna
- [ ] Fuente de acento: Estilo mexicano (opcional)
- [ ] Paleta de colores definida

---

## 💰 Fase 4: Sistema de Recompensas

### 4.1 Usuarios NO Verificados
- Pueden jugar lotería
- Premios estándar
- Sin acceso a airdrop

### 4.2 Usuarios Verificados (World ID)
- Premios 2x en lotería
- Acceso a airdrop exclusivo
- Badges especiales
- Prioridad en sorteos

### 4.3 Tiers de Airdrop
```
Bronze   → 100 tokens  (Solo World ID)
Silver   → 250 tokens  (World ID + 5 transacciones)
Gold     → 500 tokens  (World ID + 20 transacciones)
Platinum → 1000 tokens (World ID + Early Adopter)
```

---

## 🔧 Fase 5: Smart Contracts

### 5.1 Contratos Necesarios
- [ ] `JalapenoToken.sol` - Token ERC20
- [ ] `JalapenoLottery.sol` - Lógica de lotería
- [ ] `JalapenoAirdrop.sol` - Sistema de airdrop

### 5.2 Funciones Principales
```solidity
// Lotería
- createRound()
- buyTicket(verified: bool)
- drawWinner()
- claimPrize()

// Airdrop
- claimAirdrop(proof)
- checkEligibility(address)
- getTier(address)
```

---

## 📊 Fase 6: Base de Datos (Opcional)

### 6.1 Tablas Necesarias
```sql
users
- wallet_address (PK)
- world_id_nullifier (UK)
- is_verified (boolean)
- created_at

lottery_tickets
- ticket_id (PK)
- round_id (FK)
- owner_address (FK)
- numbers (array)
- is_verified_purchase (boolean)

airdrop_claims
- claim_id (PK)
- wallet_address (FK)
- nullifier_hash (UK)
- tier
- amount
```

---

## 🎯 Fase 7: Funcionalidades Core

### 7.1 Lotería
- [ ] Seleccionar 6 números (1-49)
- [ ] Comprar boleto (0.01 ETH)
- [ ] Ver mis boletos
- [ ] Ver resultados
- [ ] Reclamar premio si gano

### 7.2 Airdrop
- [ ] Verificar elegibilidad
- [ ] Mostrar tier disponible
- [ ] Reclamar tokens
- [ ] Ver historial de claims

### 7.3 Perfil
- [ ] Ver wallet conectado
- [ ] Ver estado de verificación
- [ ] Ver balance de tokens
- [ ] Ver historial de juegos

---

## 🚀 Orden de Implementación

### Sprint 1 (Esta sesión)
1. ✅ Limpiar `/public`
2. ✅ Limpiar código innecesario
3. ✅ Crear estructura base de páginas
4. ⏳ Diseñar landing page simple

### Sprint 2
1. Crear componentes de lotería
2. Implementar selección de números
3. Integrar compra de boletos (sin blockchain)

### Sprint 3
1. Desarrollar smart contracts
2. Deploy a testnet
3. Integrar contratos con frontend

### Sprint 4
1. Sistema de airdrop
2. Verificación de tiers
3. Integración completa

### Sprint 5
1. Testing exhaustivo
2. Ajustes de UI/UX
3. Preparar para producción

---

## 📝 Notas Importantes

### Prioridades
1. **Funcionalidad básica** antes que diseño elaborado
2. **Seguridad** en verificaciones de World ID
3. **UX simple** para usuarios no-crypto

### Consideraciones Técnicas
- Gas fees cubiertos para usuarios verificados
- Rate limiting en backend
- Validación de proofs en servidor
- Nullifier tracking para prevenir duplicados

### Métricas de Éxito
- [ ] Usuario puede jugar sin verificación
- [ ] Usuario verificado obtiene beneficios claros
- [ ] Airdrop funciona correctamente
- [ ] No hay duplicación de claims
- [ ] UI es intuitiva y rápida

---

## 🔗 Referencias Rápidas

- **Docs World ID**: https://docs.world.org/world-id
- **MiniKit SDK**: https://docs.world.org/mini-apps
- **World Chain**: https://docs.world.org/world-chain
- **UI Kit**: https://github.com/worldcoin/mini-apps-ui-kit

---

**Inicio del proyecto**: 2026-03-25
**Estado actual**: Fase 1 - Limpieza
**Próximo paso**: Limpiar carpeta `/public`
