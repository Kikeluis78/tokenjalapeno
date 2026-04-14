# Estado del Proyecto - Jalapeño Lottery
**Última actualización**: 14 de abril de 2026, 12:44 CST

---

## 📋 Resumen Ejecutivo

Mini App de lotería mexicana integrada con World ID, desplegada en Vercel. Juego funcional con tableros, carrusel de selección, y sistema de marcado con cacahuates.

---

## ✅ Completado

### 1. Configuración Inicial del Proyecto
- ✅ Monorepo configurado con Turbo
- ✅ Next.js 16.2.2 con App Router + Turbopack
- ✅ TypeScript configurado
- ✅ Tailwind CSS + shadcn/ui
- ✅ Estructura de carpetas establecida
- ✅ Desplegado en Vercel exitosamente

### 2. Gestión de Dependencias
- ✅ npm como gestor de paquetes
- ✅ Dependencias instaladas:
  - `framer-motion@^11.15.0` - Animaciones
  - `zustand@^5.0.2` - Manejo de estado
  - `lucide-react@^1.7.0` - Iconos
  - `next-themes@^0.4.6` - Temas

### 3. Flujo de Navegación Completo
- ✅ **Spinner** - Carrusel automático de presentación (18s)
  - Página 1 (4s): Logo tituloLoteria.png + logo spinner con animación
  - Página 2 (6s): Imagen juego2.png + overlay + explicación del juego
  - Página 3 (8s): Imagen juego.png + reglas de repartición de tokens
  - Barra de progreso sincronizada
- ✅ **Modal World ID** - Verificación de humanidad (simulado)
  - Margen inferior mejorado
- ✅ **Home** - Página principal con diseño mejorado
  - Fondo degradado con efectos animados
  - Botón "Humano vs IA" con gradiente y animaciones
  - Logo del título
- ✅ **Carrusel** - Selección de tablero
  - Título mejorado: "¡Elige tu Tablero de la Suerte! 🍀"
  - Tablero verde con borde blanco
  - 16 cartas sin espacios (gap: 0)
  - Flechas rojas/naranjas atractivas
  - Mano animada indicando swipe (3s)
  - Botón "Seleccionar" con gradiente animado
- ✅ **CardRain** - Transición con lluvia de cartas
  - 60 cartas distribuidas horizontalmente (0-100%)
  - Opacidad 0.4 (más transparentes)
  - Logo tituloLoteria2.png en el centro
- ✅ **GamePlay** - Juego activo

### 4. Sistema de Juego Implementado
- ✅ **Modal Tutorial** (Primera vez)
  - Aparece antes de empezar el juego
  - Tablero de ejemplo con mano animada
  - Explica cómo tocar las cartas
  - Checkbox "No mostrar más" (localStorage)
  - Diseño atractivo con instrucciones claras
- ✅ **Tablero Humano**
  - Fondo verde sin borde blanco
  - 16 cartas en grid 4x4 sin espacios
  - Cartas más grandes para interacción táctil
  - Marcado con cacahuate 🥜
  - Solo permite marcar cartas cantadas
  - Estados: Normal (gris) → Cantada (amarilla) → Marcada (verde + 🥜)
  - **Animación de ayuda**: Pulso cada 12 segundos en TODAS las cartas no marcadas
- ✅ **Carta Actual**
  - Muestra solo emoji + nombre
  - **Audio mejorado**: Reproduce nombre inmediatamente con Web Speech API
  - Cancela audio anterior antes de reproducir nuevo
  - Compacta en columna derecha
- ✅ **Botón Play/Pause**
  - Icono de mano animada 👆 cuando está pausado
  - Texto "Toca para empezar"
  - Debajo del tablero IA
  - Inicia/pausa el juego
- ✅ **Contador de Cartas**
  - Muestra restantes/total (ej: 40/54)
- ✅ **Cartas Salidas**
  - Lista de últimas 8 cartas cantadas
- ✅ **Tablero IA**
  - Marcado automático
  - Mismo estilo que humano
- ✅ **Botón Salir**
  - "← Salir del juego" arriba izquierda
  - Regresa al Home

### 5. Lógica de Juego
- ✅ Generación de 10 tableros aleatorios
- ✅ Selección de tablero por usuario
- ✅ Generación de tablero IA aleatorio
- ✅ Sistema de cantado de cartas (cada 2 segundos)
- ✅ Marcado automático de IA
- ✅ Marcado manual de usuario (solo cartas cantadas)
- ✅ Verificación de victoria (16 cartas marcadas)
- ✅ Modal de victoria
- ✅ 54 cartas únicas con emoji, nombre y phrase

### 6. Componentes Implementados
```
apps/web/components/
├── spinner/
│   └── Spinner.tsx              ✅ (Carrusel 3 páginas)
├── modals/
│   ├── VerifyModal.tsx          ✅
│   └── TutorialModal.tsx        ✅ (Nuevo)
└── game/
    ├── BoardCarousel.tsx        ✅
    ├── CardRain.tsx             ✅
    ├── GamePlay.tsx             ✅ (Con tutorial)
    ├── HeaderCarrusel.tsx       ✅ (Audio mejorado)
    ├── TableroUsuario.tsx       ✅ (Pulso cada 12s)
    ├── TableroIA.tsx            ✅
    ├── ContadorCartas.tsx       ✅
    ├── CartasSalidas.tsx        ✅
    ├── SelectionFooter.tsx      ✅
    └── VictoryModal.tsx         ✅
```

### 7. Control de Versiones
- ✅ Repositorio: `github.com/Kikeluis78/tokenjalapeno`
- ✅ Branch principal: `main`
- ✅ Último commit: `8f8dbd9` - "Modal tutorial, botón play mejorado, audio inmediato y pulso cada 12s"
- ✅ Desplegado en Vercel automáticamente

---

## 📝 Sesión 14 de Abril 2026

### Mejoras Implementadas

#### 1. Carrusel de Presentación (Spinner)
- **Duración total**: 18 segundos
- **Página 1** (0-4s): Home con título y logo
- **Página 2** (4-10s): Imagen juego2.png + explicación del juego
  - Overlay negro 60%
  - Texto: "Diviértete jugando el tradicional juego de lotería mexicana"
  - "¡Hasta 30,000 tokens Jalapeño! 🌶️"
- **Página 3** (10-18s): Imagen juego.png + reglas de repartición
  - Overlay negro 70%
  - Recompensas:
    - 🎮 Avances a la IA: 3 jalapeños
    - 🤖 Gana la IA: 1 jalapeño
    - 🏆 Torneo semanal: 100 jalapeños
    - 👑 Torneo mensual: 1000 jalapeños
- Transiciones suaves con fadeIn
- Barra de progreso sincronizada

#### 2. Modal Tutorial Interactivo
- Aparece la primera vez que entras al juego
- Tablero de ejemplo (2x2) con 4 cartas
- Mano animada 👆 señalando la primera carta
- Instrucciones claras: "Cuando salga una carta, toca la imagen en tu tablero"
- Objetivo: "Completa una línea para ganar"
- Checkbox "No mostrar más" con localStorage
- Botón "¡Entendido! 🚀"

#### 3. Mejoras en Botón Play
- Icono de mano animada 👆 cuando está pausado
- Texto "Toca para empezar" en dos líneas
- Solo visible cuando el juego no está corriendo
- Diseño más intuitivo

#### 4. Sistema de Audio Mejorado
- Reproduce nombre de carta inmediatamente al salir
- Cancela audio anterior antes de reproducir nuevo
- Usa `useRef` para evitar repeticiones
- Delay de 50ms para limpieza
- Web Speech API con voz es-MX

#### 5. Animación de Ayuda Inteligente
- Pulsa TODAS las cartas cantadas pero no marcadas
- Activación cada 12 segundos
- Solo cuando el juego está corriendo
- Animación de pulso con sombra amarilla
- Se repite 2 veces y dura 2 segundos total
- Ayuda visual para no perder cartas

#### 6. Mejoras Visuales Menores
- Título selector de tablero: "¡Elige tu Tablero de la Suerte! 🍀"
- Modal de verificación con más margen inferior
- Clase Tailwind optimizada: `max-w-120` en lugar de `max-w-[480px]`

### Archivos Modificados
```
apps/web/
├── components/
│   ├── modals/
│   │   ├── TutorialModal.tsx        [NUEVO]
│   │   ├── VerifyModal.tsx          [MODIFICADO]
│   │   └── index.ts                 [MODIFICADO]
│   └── game/
│       ├── BoardCarousel.tsx        [MODIFICADO]
│       ├── GamePlay.tsx             [MODIFICADO]
│       ├── HeaderCarrusel.tsx       [MODIFICADO]
│       └── TableroUsuario.tsx       [MODIFICADO]
├── hooks/
│   └── useSpinner/
│       └── index.ts                 [MODIFICADO]
└── app/
    └── page.tsx                     [MODIFICADO]
```

### Decisiones de Diseño
- **18 segundos** para presentación: Balance entre informativo y no tedioso
- **Tutorial obligatorio primera vez**: Reduce confusión de nuevos usuarios
- **Pulso cada 12 segundos**: Suficiente tiempo para pensar, no molesto
- **Audio inmediato**: Mejor experiencia, más realista
- **Mano en botón Play**: Guía visual clara para iniciar

---

## 🚧 Pendiente para Próxima Sesión

### 1. Mejoras Visuales (ALTA PRIORIDAD)
- [ ] **Footer** - Implementar barra inferior
  - Datos de usuario (wallet ID de Worldcoin)
  - Datos de IA
  - Puntaje acumulado
  - Recompensas
  - Contador de victorias
- [ ] **Modal de Victoria** - Mejorar diseño
  - Más atractivo visualmente
  - Animaciones
  - Mostrar estadísticas

### 2. Integración World ID (ALTA PRIORIDAD)
- [ ] Configurar cuenta en Developer Portal
- [ ] Obtener credenciales (`app_id`, `rp_id`, `signing_key`)
- [ ] Implementar `MiniKitProvider` en layout
- [ ] Crear endpoint `/api/rp-signature`
- [ ] Crear endpoint `/api/verify-proof`
- [ ] Integrar verificación real (actualmente simulada)
- [ ] Mostrar wallet ID en footer

### 4. Sistema de Recompensas (ALTA PRIORIDAD)
- [ ] Diseñar métrica de recompensas
- [ ] Definir criterios de victoria
- [ ] Sistema de puntos/tokens
- [ ] Integración con Jalapeño Token
- [ ] Distribución de premios

### 5. Jalapeño Token (NO SUBIR A GIT)
- [ ] Documentación de tokenomics
- [ ] Smart contract del token
- [ ] Sistema de distribución
- [ ] Integración con juego
- [ ] **IMPORTANTE**: Mantener en local, no subir a repositorio

---

## 🏗️ Arquitectura Actual

```
Loteria Mexicana/
├── apps/web/
│   ├── app/
│   │   ├── page.tsx           ✅ Home con Spinner + Modal + Menú
│   │   ├── game/
│   │   │   └── page.tsx       ✅ Lógica de fases del juego
│   │   └── layout.tsx         ✅ Layout principal
│   ├── components/
│   │   ├── spinner/           ✅ Animación inicial
│   │   ├── modals/            ✅ Modal World ID
│   │   └── game/              ✅ Todos los componentes de juego
│   ├── hooks/
│   │   └── useSpinner/        ✅ Hook para spinner
│   ├── lib/
│   │   ├── cards.ts           ✅ 54 cartas con emoji/nombre/phrase
│   │   └── game/
│   │       └── store.ts       ✅ Zustand store completo
│   └── public/
│       ├── tituloLoteria.png  ✅
│       ├── tituloLoteria2.png ✅
│       └── logoSpinner.png    ✅
├── packages/ui/               ✅ shadcn/ui components
└── manual/                    📚 Documentación
    ├── Estado-Proyecto.md     ✅ Este archivo
    ├── Protocolo-Desarrollo.md
    ├── Loteria Mexicana.pdf
    └── page-2.png             ✅ Referencia de diseño
```

---

## 🎮 Flujo del Juego Actual

```
1. SPINNER (2.5s)
   ↓
2. MODAL WORLD ID (verificación simulada)
   ↓
3. HOME (menú principal)
   ↓ [Click "Humano vs IA"]
4. CARRUSEL (selección de tablero)
   - 10 tableros disponibles
   - Flechas para navegar
   - Mano animada (3s)
   ↓ [Click "Seleccionar"]
5. CARD RAIN (transición 3s)
   ↓
6. GAMEPLAY (juego activo)
   - Carta actual (cada 2s)
   - Tablero humano (marcado manual con 🥜)
   - Tablero IA (marcado automático)
   - Contador de cartas
   - Cartas salidas
   ↓ [16 cartas marcadas]
7. MODAL VICTORIA
   ↓ [Reiniciar o Salir]
```

---

## 📊 Especificaciones Técnicas

### Velocidad del Juego
- **Intervalo entre cartas**: 2 segundos (2000ms)
- **Duración máxima**: 108 segundos (54 cartas × 2s)
- **Duración mínima para ganar**: 32 segundos (16 cartas × 2s)

### Tableros
- **Cartas por tablero**: 16 (grid 4×4)
- **Total de cartas disponibles**: 54
- **Tableros generados**: 10 para elegir
- **Condición de victoria**: 16 cartas marcadas

### Estados de Cartas
1. **Normal**: Gris oscuro (no cantada)
2. **Cantada**: Amarilla (puede marcarse)
3. **Marcada**: Verde + 🥜 cacahuate

---

## 🐛 Problemas Conocidos

### Activos (Para Próxima Sesión)
- ⚠️ Footer: No implementado
- ⚠️ Modal Victoria: Diseño básico

### Resueltos (Sesión 14 Abril)
- ✅ Spinner: Ahora es carrusel informativo de 3 páginas
- ✅ Tutorial: Modal implementado con checkbox localStorage
- ✅ Audio: Reproduce inmediatamente sin repetir
- ✅ Ayuda visual: Pulso cada 12s en todas las cartas no marcadas
- ✅ Botón Play: Mano animada y texto indicativo
- ✅ Título selector: Más atractivo y motivador

### Resueltos (Sesiones Anteriores)
- ✅ Flujo de navegación completo
- ✅ Cartas sin espacios en tablero
- ✅ Marcado con cacahuate
- ✅ Velocidad de juego ajustada
- ✅ Botón salir con texto claro

---

## 📝 Notas Importantes

### Token WGoal (WordGoal2026)
- **Contract Address**: `0x1a1e80a27093665a2e6e7f3af3b69bb64fe79cd7`
- **Supply Total**: 100,000,000 tokens
- **Red**: World Chain (Puf)
- **Creado**: Hace 5 meses
- **Estado**: Sin liquidez inicial (gratis)
- **Plan**: Integrar después de Jalapeño para circulación
- **Uso futuro**: Sección de recompensas especiales, torneos premium

### Liquidez en Puf.world
- **Token gratis (0 WLD)**: Sin liquidez, depende de compras
- **Token con liquidez (6+ WLD)**: Tradeable inmediatamente
- **Recomendado para Jalapeño**: 50+ WLD para buena circulación
- **Beneficios**: Más liquidez = más confianza = más trading = más fees

---

## 📝 Notas de Desarrollo

### Decisiones Técnicas
- **Gestor de paquetes**: npm
- **Framework**: Next.js 16.2.2 con Turbopack
- **Estado**: Zustand (ligero y simple)
- **Animaciones**: Framer Motion
- **Estilos**: Tailwind CSS + shadcn/ui
- **Monorepo**: Turborepo
- **Deploy**: Vercel (automático en push)

### Diseño UX
- **Interacción táctil**: Cartas grandes para tocar con dedo
- **Marcado físico**: Cacahuate 🥜 simula juego real
- **Feedback visual**: Estados claros (gris → amarillo → verde)
- **Velocidad**: 2s entre cartas (ritmo cómodo)

### Pendientes de Integración
- **Audio**: phrase se reproducirá antes de mostrar carta
- **World ID**: Verificación real (actualmente simulada)
- **Wallet**: Mostrar ID en footer
- **Recompensas**: Sistema de tokens/premios

---

## 🎯 Roadmap

### Sesión 14 Abril 2026 (Completada)
- ✅ Carrusel de presentación con 3 páginas (18s)
- ✅ Modal tutorial interactivo con localStorage
- ✅ Sistema de audio mejorado (inmediato, sin repetir)
- ✅ Animación de ayuda cada 12s en todas las cartas
- ✅ Botón Play con mano animada e indicaciones
- ✅ Mejoras visuales (título selector, margen modal)

### Sesión Anterior (Completada)
- ✅ Flujo completo de navegación
- ✅ Sistema de juego funcional
- ✅ Diseño visual mejorado
- ✅ Interacción táctil con cacahuate

### Próxima Sesión
1. **Footer con estadísticas** (wallet, puntaje, victorias)
2. **Modal de victoria mejorado** (animaciones, stats)
3. **Integración World ID** (verificación real)

### Sesiones Futuras
1. **Sistema de recompensas** (Jalapeño Token)
2. **Integración WGoal** (sección especial)
3. **Smart Contracts** (distribución de tokens)
4. **Backend/API** (gestión de rondas y premios)
5. **Testing** (unitarios, integración, E2E)
6. **Optimización** (performance, SEO, PWA)

---

## 📞 Recursos

- **Repositorio**: https://github.com/Kikeluis78/tokenjalapeno
- **Vercel**: https://vercel.com/dashboard
- **World Developer Portal**: https://developer.worldcoin.org
- **Documentación World**: https://docs.world.org

---

**Preparado por**: Kiro AI Assistant  
**Fecha**: 14 de abril de 2026, 12:44 CST
