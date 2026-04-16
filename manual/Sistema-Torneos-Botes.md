# 🏆 Sistema de Torneos y Botes - Jalapeño Lottery

**Última actualización**: 15 de abril de 2026, 22:48 CST  
**Estado**: Diseño inicial - Por implementar

---

## 📋 Índice

1. [Torneo Semanal](#torneo-semanal)
2. [Torneo Mensual](#torneo-mensual)
3. [Sistema de Botes](#sistema-de-botes)
4. [Reglas Generales](#reglas-generales)
5. [Smart Contracts](#smart-contracts)
6. [Roadmap de Implementación](#roadmap)

---

## 🎮 Torneo Semanal

### Requisitos de Calificación
```
✅ Mínimo 7 victorias en la semana
✅ Verificación con World ID
✅ Sin costo de inscripción (GRATIS)
```

### Premios
```
1er lugar:  100 JAL
2do lugar:   50 JAL
3er lugar:   30 JAL
4to-10mo:    10 JAL c/u
```

### Mecánica
- **Inicio**: Lunes 00:00 UTC
- **Fin**: Domingo 23:59 UTC
- **Sorteo**: Entre todos los calificados (7+ victorias)
- **Anuncio**: Lunes siguiente
- **Distribución**: Automática vía smart contract

### Calificación para Torneo Mensual
```
🏆 Top 3 del torneo semanal:
└─ Entrada GRATIS al torneo mensual
```

---

## 🔥 Torneo Mensual - Sistema de Botes

### 💰 Estructura del Bote

#### Bote Inicial
```
40 WLD (de staking del proyecto)
+ APY acumulado en tiempo real
+ 70% de inscripciones (1 WLD c/u)
= BOTE TOTAL
```

#### Ejemplo Mes 1 (90 inscritos)
```
40 WLD (inicial)
+ 63 WLD (70% de 90 inscripciones)
+ 0.42 WLD (APY del mes ~5% anual)
= 103.42 WLD (~$310 USD)
```

### 📅 Calendario y Inscripciones

#### Fechas
```
Día 1 del mes:  Apertura de inscripciones
Día 28-30:      Cierre de inscripciones (23:59 UTC)
Día 1 siguiente: Torneo se realiza
Día 2 siguiente: Anuncio de ganadores
```

#### Inscripción
```
Top 3 torneos semanales del mes: GRATIS (automático)
Resto de jugadores: 1 WLD

Límite: 100 jugadores totales
├─ 90 humanos (máximo)
└─ 10 IA (completan espacios vacíos)
```

### 🏆 Distribución de Premios

#### Si HUMANO gana
```
1er lugar: 50% del bote + 1,000 JAL
2do lugar: 30% del bote + 500 JAL
3er lugar: 20% del bote + 300 JAL

Ejemplo con bote de 103 WLD:
├─ 1er: 51.5 WLD + 1,000 JAL
├─ 2do: 30.9 WLD + 500 JAL
└─ 3er: 20.6 WLD + 300 JAL
```

#### Si IA gana
```
🤖 BOTE SE ACUMULA para el siguiente mes

Ejemplo:
Mes 1: IA gana → 103 WLD acumulan
Mes 2: Bote inicial = 103 + 40 = 143 WLD
       + inscripciones + APY
       = ~206 WLD total 🚀
```

### 📊 Contador en Tiempo Real

#### Visualización
```
┌─────────────────────────────────┐
│  🏆 BOTE MENSUAL                │
│                                 │
│  💰 127.42 WLD                  │
│     ~$382 USD                   │
│                                 │
│  📈 +0.0001 WLD/minuto (APY)    │
│  👥 67/90 inscritos             │
│  ⏰ Cierra en: 12d 5h 23m       │
└─────────────────────────────────┘
```

#### Actualización
- Cada minuto: +APY acumulado
- Cada inscripción: +0.7 WLD al bote
- Tiempo real en la app

---

## 🤖 Sistema de IA

### Función de la IA

#### Completar Espacios
```
Si al cierre de inscripciones hay < 100 jugadores:
└─ IA completa hasta 100 (GRATIS, sin pagar)

Ejemplo:
- 75 humanos inscritos
- 25 IA se agregan automáticamente
- Total: 100 jugadores
```

#### Ventajas
✅ Torneo SIEMPRE se realiza (garantizado)
✅ Bote completo disponible
✅ Competencia justa
✅ No se desperdicia el bote

### Si IA Gana

#### Acumulación del Bote
```
Mes 1: IA gana → 103 WLD acumulan
Mes 2: Bote = 143 WLD (103 + 40 nuevo)
       IA gana → 206 WLD acumulan
Mes 3: Bote = 246 WLD (206 + 40 nuevo)
       IA gana → 309 WLD acumulan 🤯
```

#### Límite de Acumulación
```
⚠️ Si IA gana 3 meses consecutivos:
└─ Sorteo especial entre TODOS los participantes
   de los 3 meses (proporcional a partidas jugadas)

Razón:
- Evita bote "imposible" de ganar
- Mantiene engagement
- Recompensa participación constante
```

---

## 💸 Flujo del WLD

### Inscripciones (1 WLD c/u)

```
100% (1 WLD) recibido:
├─ 70% (0.7 WLD) → Bote del torneo
├─ 20% (0.2 WLD) → Pool de liquidez JAL/WLD
└─ 10% (0.1 WLD) → Desarrollo y marketing
```

### Ejemplo con 90 Inscripciones
```
90 WLD recaudados:
├─ 63 WLD → Bote (40 + 63 = 103 WLD)
├─ 18 WLD → Liquidez (aumenta valor de JAL)
└─ 9 WLD → Desarrollo (servidores, mejoras)
```

### Staking del Bote Inicial
```
40 WLD iniciales en staking:
├─ APY: ~5% anual
├─ Genera: ~0.005 WLD/día
└─ Acumulado mensual: ~0.15 WLD

Ventajas:
✅ Bote crece automáticamente
✅ Genera interés compuesto
✅ Transparente on-chain
```

---

## 📜 Reglas Generales

### Elegibilidad

#### Requisitos Obligatorios
```
✅ Verificación con World ID (1 cuenta por humano)
✅ Mínimo 1 partida jugada en el mes
✅ No estar baneado por fraude
✅ Wallet conectado y verificado
```

#### Descalificación Automática
```
❌ Multi-cuentas detectadas
❌ Uso de bots o scripts
❌ Exploits o hacks
❌ Comportamiento fraudulento
```

### Transparencia

#### Información Pública
```
✅ Bote actual en tiempo real
✅ Número de inscritos
✅ Historial de ganadores
✅ Smart contract verificado
✅ Transacciones on-chain
```

#### Auditoría
```
✅ Código open-source (smart contracts)
✅ Verificable en World Chain Explorer
✅ Logs de todas las transacciones
✅ Sistema de reportes de usuarios
```

---

## 🔐 Smart Contracts

### Contratos Necesarios

#### 1. TournamentManager.sol
```solidity
// Gestión de torneos
- Registro de participantes
- Validación de World ID
- Distribución de premios
- Acumulación de botes
```

#### 2. PrizePool.sol
```solidity
// Gestión del bote
- Recepción de inscripciones
- Staking del bote inicial
- Cálculo de APY en tiempo real
- Distribución de premios
```

#### 3. AIManager.sol
```solidity
// Gestión de IA
- Completar espacios vacíos
- Acumulación si IA gana
- Sorteo especial (3 meses)
```

### Seguridad

#### Medidas Implementadas
```
✅ Auditoría de smart contracts
✅ Timelock en cambios críticos
✅ Multi-sig para fondos
✅ Pausable en emergencias
✅ Rate limiting
```

---

## 📊 Proyecciones y Ejemplos

### Escenario 1: Crecimiento Normal

```
MES 1:
- 90 inscritos × 1 WLD = 90 WLD
- Bote: 40 + 63 = 103 WLD
- Humano gana → Reparte 103 WLD

MES 2:
- 120 inscritos (más interés)
- Bote: 40 + 84 = 124 WLD
- Humano gana → Reparte 124 WLD
```

### Escenario 2: IA Gana 2 Meses

```
MES 1:
- Bote: 103 WLD
- IA gana → Acumula

MES 2:
- Bote: 103 + 40 + 63 = 206 WLD
- IA gana → Acumula

MES 3:
- Bote: 206 + 40 + 63 = 309 WLD (~$927 USD) 🔥
- HYPE masivo
- Más inscripciones
- Marketing viral
```

### Escenario 3: IA Gana 3 Meses (Sorteo Especial)

```
MES 1: IA gana → 103 WLD
MES 2: IA gana → 206 WLD
MES 3: IA gana → 309 WLD

SORTEO ESPECIAL:
- Participan: TODOS los jugadores de los 3 meses
- Peso: Proporcional a partidas jugadas
- Premio: 309 WLD repartido entre Top 10
  ├─ 1er: 40% (123.6 WLD)
  ├─ 2do: 25% (77.25 WLD)
  ├─ 3er: 15% (46.35 WLD)
  └─ 4to-10mo: 20% (61.8 WLD / 7 = 8.8 WLD c/u)
```

---

## 🎯 Estrategias de Marketing

### Mensajes Clave

#### Bote Normal
```
"💰 Bote mensual: 103 WLD (~$310 USD)
 👥 67/90 lugares ocupados
 ⏰ Inscripciones cierran en 12 días
 💎 Solo 1 WLD para entrar"
```

#### Bote Acumulado
```
"🔥 IA ha ganado 2 meses seguidos!
 💰 Bote acumulado: 206 WLD (~$618 USD)
 🏆 ¿Serás tú quien rompa la racha?
 ⚠️ Si IA gana de nuevo: SORTEO ESPECIAL"
```

#### Sorteo Especial
```
"🚨 SORTEO ESPECIAL ACTIVADO
 💰 309 WLD en juego (~$927 USD)
 👥 Participan TODOS los jugadores de 3 meses
 🎲 Proporcional a tu participación
 📅 Sorteo: [Fecha]"
```

---

## 🚀 Roadmap de Implementación

### Fase 1: Diseño y Documentación ✅
- [x] Definir reglas de torneos
- [x] Diseñar sistema de botes
- [x] Calcular proyecciones
- [x] Documentar todo

### Fase 2: Smart Contracts (Próxima)
- [ ] Desarrollar TournamentManager.sol
- [ ] Desarrollar PrizePool.sol
- [ ] Desarrollar AIManager.sol
- [ ] Auditoría de seguridad
- [ ] Deploy en testnet

### Fase 3: Integración Frontend
- [ ] UI de inscripción al torneo
- [ ] Contador de bote en tiempo real
- [ ] Historial de ganadores
- [ ] Sistema de notificaciones
- [ ] Dashboard de estadísticas

### Fase 4: Testing
- [ ] Testnet con usuarios reales
- [ ] Simulación de torneos
- [ ] Pruebas de estrés
- [ ] Ajustes finales

### Fase 5: Lanzamiento
- [ ] Deploy en mainnet (World Chain)
- [ ] Primer torneo semanal
- [ ] Primer torneo mensual
- [ ] Marketing y promoción

---

## 📝 Notas Importantes

### Consideraciones Legales
```
⚠️ Verificar regulaciones locales sobre:
- Juegos de azar
- Premios en criptomonedas
- KYC/AML (World ID ayuda con esto)
- Impuestos sobre premios
```

### Consideraciones Técnicas
```
⚠️ Implementar:
- Sistema de respaldo (backup)
- Monitoreo 24/7
- Alertas de anomalías
- Plan de contingencia
```

### Ajustes Futuros
```
📊 Según métricas:
- Ajustar costo de inscripción (1 WLD → 0.5 o 2 WLD)
- Ajustar bote inicial (40 WLD → más o menos)
- Ajustar distribución de premios
- Ajustar límite de jugadores (100 → más)
```

---

## 🎮 Integración con World ID

### Verificación de Participantes
```typescript
// Verificar que el usuario es humano único
const { proof, merkle_root, nullifier_hash } = await MiniKit.verify({
  action: 'tournament-registration',
  signal: tournamentId
});

// Validar en backend
const isValid = await verifyProof(proof);
if (!isValid) throw new Error('Verificación fallida');

// Registrar participante
await registerParticipant(nullifier_hash, tournamentId);
```

### Pago de Inscripción
```typescript
// Cobrar 1 WLD para inscripción
const payment = await MiniKit.commandsAsync.pay({
  reference: `tournament-${tournamentId}-${userId}`,
  to: TOURNAMENT_WALLET,
  tokens: [{
    symbol: 'WLD',
    token_amount: '1'
  }],
  description: 'Inscripción Torneo Mensual'
});

if (payment.status === 'success') {
  await confirmRegistration(userId, tournamentId);
}
```

---

## 📞 Recursos

- **World Chain Explorer**: https://worldscan.org
- **MiniKit Docs**: https://docs.world.org/minikit
- **Puf.world**: https://puf.world
- **Smart Contract Templates**: Por definir

---

**Preparado por**: Kiro AI Assistant  
**Fecha**: 15 de abril de 2026, 22:48 CST  
**Estado**: Diseño inicial - Listo para implementación

---

## ⚠️ IMPORTANTE - NO SUBIR A GIT

Este archivo contiene información estratégica sobre torneos y botes.  
Mantener en carpeta `manual/` (ya está en .gitignore)

---

## 🎯 Próximos Pasos (Mañana)

1. ✅ Subir URL a Worldcoin Developer Portal
2. ✅ Configurar como app en desarrollo
3. ✅ Obtener credenciales (app_id, rp_id)
4. ✅ Probar en tiempo real con World ID
5. ✅ Preparar para crear token (Sábado)
6. ✅ Juntar WLD para liquidez (10+ WLD ideal)

**¡Éxito con el lanzamiento!** 🚀🌶️
