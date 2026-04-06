# 🌶️ Token Jalapeño - Documentación Técnica

## 📋 Información General del Token

### Datos Básicos
- **Nombre**: Jalapeño Token
- **Símbolo**: JALA
- **Blockchain**: World Chain (Optimism L2)
- **Estándar**: ERC-20
- **Decimales**: 18
- **Supply Total**: 1,000,000,000 JALA (1 billón)
- **Tipo**: Utility Token + Governance

---

## 🎯 Utilidad del Token

### 1. **Moneda del Juego**
- Pagar entry fees para torneos
- Comprar tableros especiales
- Desbloquear cartas exclusivas
- Acceder a modos premium

### 2. **Recompensas**
- Ganar tokens por victorias
- Completar desafíos diarios
- Rachas de victorias
- Participación en torneos

### 3. **Staking**
- Stakear JALA para obtener beneficios
- Multiplicadores de recompensas
- Acceso VIP a eventos
- Participación en governance

### 4. **Governance**
- Votar en propuestas de la comunidad
- Decidir nuevas features
- Ajustar recompensas
- Seleccionar cartas especiales

---

## 💰 Distribución del Token

```
Total Supply: 1,000,000,000 JALA

├─ 40% (400M) - Recompensas de Juego
│  ├─ Victorias diarias
│  ├─ Desafíos completados
│  ├─ Torneos
│  └─ Eventos especiales
│
├─ 20% (200M) - Airdrop Inicial
│  ├─ Early adopters
│  ├─ World ID verificados
│  └─ Comunidad inicial
│
├─ 15% (150M) - Liquidez
│  ├─ DEX pools
│  └─ Market making
│
├─ 10% (100M) - Equipo & Desarrollo
│  ├─ Vesting: 2 años
│  └─ Cliff: 6 meses
│
├─ 10% (100M) - Marketing & Partnerships
│  ├─ Influencers
│  ├─ Colaboraciones
│  └─ Campañas
│
└─ 5% (50M) - Reserva del Tesoro
   └─ Emergencias y futuro desarrollo
```

---

## 🎮 Sistema de Recompensas

### Recompensas por Victoria
```javascript
// Humano vs Máquina
Victoria rápida (< 5 min): 100 JALA
Victoria normal (5-10 min): 75 JALA
Victoria lenta (> 10 min): 50 JALA

// Humano vs Humano
Victoria: 200 JALA
Empate: 50 JALA cada uno
```

### Desafíos Diarios
```javascript
Completar 3 partidas: 50 JALA
Ganar sin perder: 100 JALA
Racha de 5 victorias: 250 JALA
Jugar 10 partidas: 150 JALA
```

### Bonos por Racha
```javascript
3 victorias seguidas: +50 JALA
5 victorias seguidas: +150 JALA
10 victorias seguidas: +500 JALA
20 victorias seguidas: +1,500 JALA
```

### Torneos
```javascript
1er lugar: 10,000 JALA
2do lugar: 5,000 JALA
3er lugar: 2,500 JALA
Top 10: 1,000 JALA
Participación: 100 JALA
```

---

## 🔐 Smart Contract - Funciones Principales

### Contrato ERC-20 Base
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JalapenoToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;
    
    mapping(address => bool) public gameContracts;
    
    constructor() ERC20("Jalapeno Token", "JALA") {
        _mint(msg.sender, MAX_SUPPLY);
    }
    
    function addGameContract(address _contract) external onlyOwner {
        gameContracts[_contract] = true;
    }
    
    function removeGameContract(address _contract) external onlyOwner {
        gameContracts[_contract] = false;
    }
    
    modifier onlyGame() {
        require(gameContracts[msg.sender], "Not authorized");
        _;
    }
}
```

### Contrato de Recompensas
```solidity
contract LoteriaRewards is Ownable {
    JalapenoToken public token;
    
    mapping(address => uint256) public totalWins;
    mapping(address => uint256) public currentStreak;
    mapping(address => uint256) public lastPlayTime;
    
    event RewardClaimed(address indexed player, uint256 amount, string reason);
    
    function claimVictoryReward(address player, uint256 gameTime) external onlyGame {
        uint256 reward;
        
        if (gameTime < 300) { // < 5 min
            reward = 100 * 10**18;
        } else if (gameTime < 600) { // 5-10 min
            reward = 75 * 10**18;
        } else {
            reward = 50 * 10**18;
        }
        
        // Bonus por racha
        currentStreak[player]++;
        if (currentStreak[player] >= 3) {
            reward += 50 * 10**18;
        }
        if (currentStreak[player] >= 5) {
            reward += 100 * 10**18;
        }
        
        totalWins[player]++;
        token.transfer(player, reward);
        
        emit RewardClaimed(player, reward, "Victory");
    }
    
    function claimDailyChallenge(address player, string memory challenge) external onlyGame {
        // Implementar lógica de desafíos
    }
}
```

---

## 🚀 Roadmap de Implementación

### Fase 1 - MVP (Actual)
- [x] Diseño del tokenomics
- [ ] Deploy del token en testnet
- [ ] Integración con juego básico
- [ ] Sistema de recompensas simple

### Fase 2 - Mainnet Launch
- [ ] Auditoría de smart contracts
- [ ] Deploy en World Chain mainnet
- [ ] Airdrop inicial
- [ ] Liquidez en DEX

### Fase 3 - Expansión
- [ ] Staking contract
- [ ] Governance implementation
- [ ] Torneos con premios
- [ ] Marketplace de NFTs

### Fase 4 - Ecosistema
- [ ] Cross-chain bridge
- [ ] Partnerships
- [ ] Mobile app nativa
- [ ] Expansión internacional

---

## 📊 Métricas y KPIs

### Métricas de Juego
- Partidas jugadas por día
- Usuarios activos diarios (DAU)
- Tasa de retención
- Tiempo promedio de juego

### Métricas de Token
- Holders totales
- Volumen de trading
- Tokens en circulación
- Tokens stakeados
- Burn rate

### Métricas de Economía
- Tokens distribuidos por día
- Ratio entrada/salida de tokens
- Precio promedio
- Market cap
- Liquidez disponible

---

## 🔒 Seguridad

### Auditorías Requeridas
- [ ] OpenZeppelin Defender
- [ ] CertiK
- [ ] Trail of Bits
- [ ] Internal security review

### Medidas de Seguridad
- Rate limiting en claims
- Anti-bot mechanisms
- Multi-sig wallet para treasury
- Timelock en funciones críticas
- Emergency pause function

---

## 💡 Casos de Uso Futuros

### NFTs de Cartas
- Cartas coleccionables únicas
- Skins especiales de tableros
- Avatares personalizados
- Efectos de victoria exclusivos

### Marketplace
- Compra/venta de cartas NFT
- Trading de tableros raros
- Alquiler de items premium
- Subastas de cartas legendarias

### Social Features
- Clanes y equipos
- Torneos privados
- Apuestas entre jugadores
- Regalos de tokens

---

## 📝 Consideraciones Legales

### Compliance
- No es security token
- Utility token puro
- No promesas de retorno
- Descentralizado y comunitario

### Regulaciones
- Cumplir con regulaciones locales
- KYC/AML para montos grandes
- Reportes de transparencia
- Auditorías públicas

---

## 🌐 Recursos

### Contratos
- Token: `0x...` (Pendiente deploy)
- Rewards: `0x...` (Pendiente deploy)
- Staking: `0x...` (Pendiente deploy)

### Links
- Website: https://loteria-jalapeno.world
- Docs: https://docs.loteria-jalapeno.world
- GitHub: https://github.com/jalapeno/loteria
- Discord: https://discord.gg/jalapeno

### Redes Sociales
- Twitter: @LoteriaJalapeno
- Telegram: t.me/LoteriaJalapeno
- Medium: medium.com/@loteria-jalapeno

---

*Documento creado: 30 de Marzo, 2026*
*Versión: 1.0*
*Proyecto: Lotería Mexicana by Jalapeño*
