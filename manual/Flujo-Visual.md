# Flujo Visual - Arquitectura Jalapeño Lottery

## Diagrama de Arquitectura General

```mermaid
graph TB
    subgraph "Usuario"
        U[👤 Usuario con World App]
    end
    
    subgraph "Frontend - Mini App"
        UI[🎨 Interfaz de Usuario]
        MK[📱 MiniKit SDK]
        WC[🔗 Web3 Components]
    end
    
    subgraph "Backend - Next.js API"
        API[⚙️ API Routes]
        RPS[🔐 RP Signature Service]
        VER[✅ Proof Verification]
        DB[(📊 Database)]
    end
    
    subgraph "World ID Protocol"
        WID[🌍 World ID]
        DEV[🔧 Developer Portal]
    end
    
    subgraph "Blockchain - World Chain"
        SC[📜 Smart Contracts]
        WCH[⛓️ World Chain Network]
    end
    
    U --> UI
    UI --> MK
    MK --> API
    API --> RPS
    API --> VER
    VER --> DEV
    API --> SC
    SC --> WCH
    MK --> WID
    API --> DB
    
    style U fill:#FFD700
    style UI fill:#FF6B6B
    style MK fill:#4ECDC4
    style API fill:#95E1D3
    style WID fill:#F38181
    style SC fill:#AA96DA
```

## Flujo de Usuario Completo

```mermaid
sequenceDiagram
    actor Usuario
    participant App as Mini App
    participant WorldApp as World App
    participant Backend as API Backend
    participant WorldID as World ID
    participant Contract as Smart Contract
    participant Chain as World Chain

    Note over Usuario,Chain: 1. INICIO DE SESIÓN
    Usuario->>App: Abre Mini App
    App->>Backend: Solicita firma RP
    Backend->>Backend: Genera firma con signing_key
    Backend-->>App: Retorna firma RP
    App->>WorldApp: Solicita autenticación
    WorldApp->>Usuario: Muestra modal de verificación
    Usuario->>WorldApp: Completa verificación
    WorldApp->>WorldID: Envía proof
    WorldID-->>WorldApp: Valida proof
    WorldApp-->>App: Retorna proof + wallet
    App->>Backend: Verifica proof
    Backend->>WorldID: POST /v4/verify
    WorldID-->>Backend: Proof válido ✅
    Backend-->>App: Usuario autenticado
    
    Note over Usuario,Chain: 2. RECLAMAR AIRDROP
    Usuario->>App: Click "Reclamar Airdrop"
    App->>Backend: Solicita elegibilidad
    Backend->>Backend: Verifica nullifier
    Backend-->>App: Usuario elegible
    App->>WorldApp: Solicita proof de airdrop
    WorldApp->>Usuario: Confirma acción
    Usuario->>WorldApp: Aprueba
    WorldApp-->>App: Retorna proof
    App->>Contract: claimAirdrop(proof)
    Contract->>Chain: Verifica proof on-chain
    Chain-->>Contract: Proof válido
    Contract->>Contract: Transfiere tokens
    Contract-->>App: Transacción exitosa
    App->>Usuario: Muestra tokens recibidos 🎉
    
    Note over Usuario,Chain: 3. COMPRAR BOLETO DE LOTERÍA
    Usuario->>App: Selecciona números
    App->>Backend: Solicita precio de boleto
    Backend-->>App: Precio: 0.01 ETH
    Usuario->>App: Confirma compra
    App->>WorldApp: Solicita proof + pago
    WorldApp->>Usuario: Confirma transacción
    Usuario->>WorldApp: Aprueba
    WorldApp-->>App: Proof + firma de pago
    App->>Contract: buyTicket(proof) + 0.01 ETH
    Contract->>Chain: Verifica proof
    Contract->>Contract: Registra boleto
    Contract->>Contract: Incrementa prize pool
    Contract-->>App: Boleto comprado
    App->>Usuario: Muestra boleto 🎫
    
    Note over Usuario,Chain: 4. SORTEO Y GANADOR
    Backend->>Contract: drawWinner() [Automatizado]
    Contract->>Contract: Genera número aleatorio
    Contract->>Contract: Selecciona ganador
    Contract->>Contract: Transfiere premio
    Contract-->>Backend: Evento WinnerDrawn
    Backend->>App: Notifica ganador
    App->>Usuario: Push notification 🏆
```

## Arquitectura de Componentes

```mermaid
graph LR
    subgraph "Capa de Presentación"
        A[Home Page] --> B[Lottery Page]
        A --> C[Airdrop Page]
        A --> D[Profile Page]
        
        B --> B1[Ticket Selector]
        B --> B2[Buy Button]
        B --> B3[My Tickets]
        
        C --> C1[Claim Button]
        C --> C2[Tier Display]
        
        D --> D1[Wallet Info]
        D --> D2[Transaction History]
    end
    
    subgraph "Capa de Lógica"
        E[World ID Hook]
        F[Wallet Hook]
        G[Contract Hook]
        
        B2 --> E
        B2 --> F
        B2 --> G
        
        C1 --> E
        C1 --> G
    end
    
    subgraph "Capa de Datos"
        H[API Client]
        I[Contract ABI]
        J[Local Storage]
        
        E --> H
        F --> H
        G --> I
    end
    
    style A fill:#FFE66D
    style B fill:#FF6B6B
    style C fill:#4ECDC4
    style D fill:#95E1D3
```

## Flujo de Smart Contracts

```mermaid
graph TD
    subgraph "Contratos Principales"
        A[JalapenoToken.sol]
        B[JalapenoAirdrop.sol]
        C[JalapenoLottery.sol]
        D[WorldIDRouter.sol]
    end
    
    subgraph "Interfaces"
        E[IWorldID]
        F[IERC20]
    end
    
    subgraph "Helpers"
        G[ByteHasher]
        H[SafeMath]
    end
    
    B --> A
    C --> A
    B --> D
    C --> D
    D --> E
    A --> F
    B --> G
    C --> G
    C --> H
    
    style A fill:#FFD93D
    style B fill:#6BCF7F
    style C fill:#4D96FF
    style D fill:#FF6B9D
```

## Estados de la Aplicación

```mermaid
stateDiagram-v2
    [*] --> NoAutenticado
    
    NoAutenticado --> Autenticando: Usuario inicia sesión
    Autenticando --> Autenticado: Proof válido
    Autenticando --> NoAutenticado: Proof inválido
    
    Autenticado --> VerAirdrop: Navega a airdrop
    Autenticado --> VerLoteria: Navega a lotería
    
    VerAirdrop --> ReclamandoAirdrop: Click reclamar
    ReclamandoAirdrop --> AirdropReclamado: Transacción exitosa
    ReclamandoAirdrop --> VerAirdrop: Error
    AirdropReclamado --> Autenticado: Continuar
    
    VerLoteria --> SeleccionandoNumeros: Selecciona números
    SeleccionandoNumeros --> ComprandoBoleto: Confirma compra
    ComprandoBoleto --> BoletoComprado: Transacción exitosa
    ComprandoBoleto --> VerLoteria: Error
    BoletoComprado --> EsperandoSorteo: Esperar sorteo
    EsperandoSorteo --> Ganador: Es ganador
    EsperandoSorteo --> NoGanador: No es ganador
    Ganador --> Autenticado: Reclamar premio
    NoGanador --> VerLoteria: Intentar de nuevo
```

## Flujo de Datos

```mermaid
graph LR
    subgraph "Input"
        A[Usuario] --> B[Acción]
    end
    
    subgraph "Procesamiento"
        B --> C{Requiere World ID?}
        C -->|Sí| D[Generar Proof]
        C -->|No| E[Procesar Directo]
        D --> F[Verificar Proof]
        F --> G{Válido?}
        G -->|Sí| H[Ejecutar en Blockchain]
        G -->|No| I[Rechazar]
        E --> H
    end
    
    subgraph "Output"
        H --> J[Actualizar UI]
        I --> K[Mostrar Error]
        J --> L[Notificar Usuario]
        K --> L
    end
    
    style A fill:#FFD93D
    style D fill:#6BCF7F
    style H fill:#4D96FF
    style J fill:#FF6B9D
```

## Estructura de Base de Datos

```mermaid
erDiagram
    USERS ||--o{ TICKETS : owns
    USERS ||--o{ AIRDROP_CLAIMS : claims
    USERS {
        string wallet_address PK
        string world_id_nullifier UK
        timestamp created_at
        timestamp last_login
    }
    
    LOTTERY_ROUNDS ||--o{ TICKETS : contains
    LOTTERY_ROUNDS {
        int round_id PK
        decimal prize_pool
        decimal ticket_price
        timestamp start_time
        timestamp end_time
        string winner_address FK
        boolean drawn
    }
    
    TICKETS {
        int ticket_id PK
        int round_id FK
        string owner_address FK
        string numbers
        timestamp purchase_time
        string tx_hash
    }
    
    AIRDROP_CLAIMS {
        int claim_id PK
        string wallet_address FK
        string nullifier_hash UK
        string tier
        decimal amount
        timestamp claimed_at
        string tx_hash
    }
    
    TRANSACTIONS {
        int tx_id PK
        string tx_hash UK
        string from_address
        string to_address
        string type
        decimal amount
        timestamp timestamp
        string status
    }
```

## Ciclo de Vida de una Ronda de Lotería

```mermaid
timeline
    title Ciclo de Vida de Ronda de Lotería
    
    section Preparación
        Día 1 : Crear nueva ronda
              : Configurar parámetros
              : Publicar en app
    
    section Venta de Boletos
        Día 2-6 : Usuarios compran boletos
                : Prize pool crece
                : Mostrar estadísticas
    
    section Sorteo
        Día 7 : Cerrar venta
              : Ejecutar sorteo
              : Seleccionar ganador
    
    section Finalización
        Día 7 : Transferir premio
              : Notificar ganador
              : Publicar resultados
              : Preparar siguiente ronda
```

## Integración con World ID

```mermaid
graph TB
    subgraph "Mini App"
        A[IDKit Widget]
        B[Proof Handler]
    end
    
    subgraph "World App"
        C[Biometric Verification]
        D[Proof Generation]
    end
    
    subgraph "Backend"
        E[RP Signature]
        F[Proof Verification]
    end
    
    subgraph "World ID Protocol"
        G[Developer Portal API]
        H[Merkle Tree]
    end
    
    A --> C
    C --> D
    D --> B
    B --> F
    E --> A
    F --> G
    G --> H
    
    style A fill:#FF6B6B
    style C fill:#4ECDC4
    style E fill:#95E1D3
    style G fill:#F38181
```

## Flujo de Seguridad

```mermaid
graph TD
    A[Request] --> B{HTTPS?}
    B -->|No| C[Rechazar]
    B -->|Sí| D{Autenticado?}
    D -->|No| E[Solicitar Auth]
    D -->|Sí| F{World ID Válido?}
    F -->|No| G[Rechazar]
    F -->|Sí| H{Nullifier Usado?}
    H -->|Sí| I[Rechazar - Duplicado]
    H -->|No| J{Rate Limit OK?}
    J -->|No| K[Rechazar - Too Many Requests]
    J -->|Sí| L[Procesar Request]
    L --> M{Transacción Exitosa?}
    M -->|No| N[Rollback]
    M -->|Sí| O[Guardar Nullifier]
    O --> P[Retornar Success]
    
    style C fill:#FF6B6B
    style G fill:#FF6B6B
    style I fill:#FF6B6B
    style K fill:#FF6B6B
    style N fill:#FF6B6B
    style P fill:#4ECDC4
```

## Deployment Pipeline

```mermaid
graph LR
    A[Código Local] --> B[Git Push]
    B --> C[GitHub Actions]
    C --> D{Tests Pass?}
    D -->|No| E[Notificar Error]
    D -->|Sí| F[Build]
    F --> G{Lint OK?}
    G -->|No| E
    G -->|Sí| H[Deploy Contratos]
    H --> I[Verificar Contratos]
    I --> J[Deploy Frontend]
    J --> K[Vercel Production]
    K --> L[Actualizar Dev Portal]
    L --> M[Notificar Éxito]
    
    style E fill:#FF6B6B
    style M fill:#4ECDC4
```

## Monitoreo y Analytics

```mermaid
graph TB
    subgraph "Eventos de Usuario"
        A[Page View]
        B[Button Click]
        C[Transaction Start]
        D[Transaction Complete]
    end
    
    subgraph "Eventos de Blockchain"
        E[Ticket Purchased]
        F[Airdrop Claimed]
        G[Winner Drawn]
    end
    
    subgraph "Analytics Platform"
        H[Mixpanel/Amplitude]
        I[Custom Dashboard]
    end
    
    subgraph "Alertas"
        J[Error Monitoring]
        K[Performance Alerts]
    end
    
    A --> H
    B --> H
    C --> H
    D --> H
    E --> I
    F --> I
    G --> I
    H --> J
    I --> K
    
    style H fill:#FFD93D
    style I fill:#6BCF7F
    style J fill:#FF6B6B
    style K fill:#4D96FF
```

## Resumen de Tecnologías

```mermaid
mindmap
  root((Jalapeño Lottery))
    Frontend
      Next.js 15
      TypeScript
      TailwindCSS
      MiniKit SDK
    Backend
      Next.js API Routes
      World ID Verification
      Database PostgreSQL
    Blockchain
      Solidity
      Foundry
      World Chain
      World ID Router
    DevOps
      Vercel
      GitHub Actions
      Monitoring
    Seguridad
      World ID
      Nullifier Tracking
      Rate Limiting
      HTTPS
```

---

## Leyenda de Colores

- 🟡 **Amarillo**: Componentes de Usuario
- 🔴 **Rojo**: Componentes de Frontend
- 🔵 **Azul**: Componentes de Backend
- 🟢 **Verde**: Componentes de Blockchain
- 🟣 **Morado**: Servicios Externos

---

**Nota**: Todos estos diagramas son visualizaciones de alto nivel. Para detalles de implementación específicos, consultar los documentos de Especificaciones Técnicas y Protocolo de Desarrollo.
