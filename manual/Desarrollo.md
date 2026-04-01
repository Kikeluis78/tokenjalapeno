# Desarrollo - Juego de Lotería

## Descripción del Proyecto

Este documento describe el desarrollo de un juego de lotería como Mini App para World App.

## Objetivo

Crear una aplicación de lotería interactiva que permita a los usuarios participar en sorteos utilizando la plataforma de World App.

## Tecnologías

- Next.js
- Minikit (World App SDK)
- Next-auth (Autenticación)
- Mini Apps UI Kit
- **Konva.js** (Canvas interactivo)
- **Framer Motion** (Animaciones)
- **React-Konva** (Integración React)

## Funcionalidades Planificadas

1. Sistema de autenticación con World ID
2. Interfaz de usuario para selección de números
3. Sistema de compra de boletos
4. Visualización de sorteos activos
5. Historial de participaciones
6. Notificaciones de resultados

## Estado Actual

### Sesión 1 - 25/03/2026

**Implementado:**

1. **Spinner de Carga** (`/src/components/LoadingSpinner/index.tsx`)
   - Progreso de 0 a 100%
   - Se ejecuta al iniciar la aplicación
   - Transición suave al completar

2. **Página Home** (`/src/app/page.tsx`)
   - Muestra spinner de carga inicial
   - Presentación del juego de lotería
   - Botón de navegación "Jugar" hacia el canvas

3. **Página del Juego** (`/src/app/game/page.tsx`)
   - Ruta `/game` creada
   - Canvas placeholder preparado para desarrollo
   - Estructura básica lista

**Navegación establecida:**
- Home (/) → Spinner → Presentación → Botón "Jugar" → Canvas (/game)

### Sesión 2 - 27/03/2026

**Implementado:**

1. **Sistema de Autenticación Completo**
   - Botón de autenticación con Wallet (`/src/components/AuthButton/index.tsx`)
   - Integración con next-auth y MiniKit
   - Auto-autenticación al cargar MiniKit
   - Flujo: No autenticado → "Login with Wallet" → Autenticado → "🎮 Iniciar Juego"

2. **Canvas Interactivo Profesional** (`/src/components/GameCanvas/index.tsx`)
   - **Konva.js** para renderizado 2D de alta performance
   - Tabla de lotería 4x4 (16 cartas) generada aleatoriamente
   - Cartas clickeables con marcado visual (verde)
   - Sistema de cantador con carta actual
   - Animaciones con **Framer Motion**

3. **Mecánicas de Juego Completas**
   - Generación aleatoria de tabla del jugador
   - Sistema de cantador que anuncia cartas
   - Marcado interactivo de cartas (click para marcar/desmarcar)
   - Detección automática de victoria (16 cartas marcadas)
   - Controles: Iniciar juego, siguiente carta, declarar lotería, nueva tabla

4. **55 Cartas de Lotería Mexicana**
   - Todas las cartas tradicionales con emojis
   - Incluye "El Jalapeño" 🌶️ como carta especial del airdrop
   - Diseño visual mexicano (colores rojo, verde, amarillo)

5. **Experiencia Visual Mejorada**
   - Animaciones de entrada y transiciones suaves
   - Carta del cantador con efecto flip (rotateY)
   - Colores y estética mexicana tradicional
   - Interfaz responsive y profesional

**Navegación actualizada:**
- Home (/) → Spinner → AuthButton → "🎮 Iniciar Juego" → Canvas Interactivo (/game)

---

## FASES DE DESARROLLO

### ✅ FASE 1: FUNDAMENTOS (COMPLETADA)
**Objetivo:** Establecer estructura base y navegación

**Implementado:**
- ✅ Spinner de carga inicial
- ✅ Página home con presentación
- ✅ Sistema de autenticación con Wallet
- ✅ Navegación básica (Home → Game)
- ✅ Canvas interactivo con Konva.js
- ✅ 55 cartas de lotería mexicana
- ✅ Mecánicas de juego completas (marcar, cantador, victoria)

### Sesión 3 - 28/03/2026

**Implementado:**

1. **Protocolo de Worldcoin Aplicado desde el Inicio**
   - Instalado `@worldcoin/mini-apps-ui-kit-react`
   - CSS con variables de espaciado oficial (24px, 32px, 16px)
   - Prevención de scroll bounce en iOS
   - Clases CSS `.worldcoin-container`, `.worldcoin-section`, `.worldcoin-content`

2. **Reestructuración de Páginas según Protocolo**
   - **Home (`/src/app/page.tsx`):**
     - Padding base de 24px
     - Secciones separadas por 32px
     - Botón CTA anclado y siempre visible
     - Bottom safe area de 24px
   
   - **Game (`/src/app/game/page.tsx`):**
     - Mismo protocolo de espaciado
     - Botón "Volver" anclado
     - Estructura mobile-first

3. **CSS Global (`/src/app/globals.css`):**
   - Variables CSS para espaciado consistente
   - Prevención de scroll bounce iOS
   - Clases reutilizables del protocolo

**Navegación actualizada:**
- Home (/) → Spinner → Presentación (protocolo Worldcoin) → "🎮 Iniciar Juego" → Canvas (/game con protocolo)

### Sesión 4 - 29/03/2026

**Implementado:**

1. **Navegación Directa al Juego**
   - Simplificado `AuthButton` para navegación inmediata
   - Eliminada autenticación compleja temporalmente
   - Botón "🎮 Jugar Lotería" navega directamente a `/game`
   - Flujo simplificado: Home → Click botón → Página de juego

2. **Página de Juego Actualizada**
   - Título prominente: "🎮 JUEGO DE LOTERÍA"
   - Mensaje de bienvenida mejorado
   - Indicador de desarrollo: "🚧 En desarrollo - Próximamente componentes de juego"
   - Botón de regreso funcional

### Sesión 5 - 30/03/2026

**Implementado:**

1. **Rediseño Completo de Home**
   - Título 3D "LOTERÍA MEXICANA" con letras gruesas tipo globo
   - Subtítulo "Jalapeño" en rojo más pequeño
   - Elementos flotantes animados (🎰🎲🃏💰⭐🌶️₿ΞΞ◎💎🪙)
   - Fondo degradado púrpura-rosa-naranja estilo casino

2. **Sistema de Juego Completo**
   - Header con contadores Humano vs IA + Premio 10 WLD
   - Layout optimizado: tableros izquierda, carta cantada derecha
   - Carrusel de 10 tableros aleatorios únicos
   - Sistema de overlays condicionales

3. **Overlays Inteligentes**
   - **Overlay Humano**: Selección de tablero con flechas flotantes azules, botón "SELECCIONAR"
   - **Overlay IA**: Bloqueado con candado 🔒 hasta iniciar juego
   - Títulos eliminados para ahorrar espacio móvil

4. **Optimización Móvil Completa**
   - Carta cantada: ancho fijo 96px (igual al cuadro del header)
   - Controles Play/Pause debajo de carta
   - Layout vertical compacto para pantallas 7"
   - Keys únicos para evitar errores DOM

5. **Diseño Estilo Casino Profesional**
   - Cartas con sombras y bordes estilo solitario
   - Fondo verde mesa de casino
   - Animaciones Framer Motion suaves
   - Efectos 3D y degradados

**Estado actual:**
- ✅ Juego completamente funcional (Humano vs IA)
- ✅ UI profesional estilo casino moderno
- ✅ 54/55 cartas implementadas (falta El Jalapeño 🌶️)
- ✅ Animaciones y efectos completos
- ✅ Responsive design optimizado
- 🔄 Audio simulado (🔊 "Nombre de carta")
- 📋 Pendiente: Audio real + integración Worldcoin completa

**Navegación actual:**
- Home (/) → Spinner → Presentación 3D → "🎮 Jugar Lotería" → Juego completo (/game)

### Sesión 7 - 31/03/2026 (SESIÓN FINAL)

**CORRECCIONES CRÍTICAS IMPLEMENTADAS:**

1. **Sistema de Tableros Corregido - CRÍTICO RESUELTO**
   - ✅ Corregido: Tableros ahora tienen 16 cartas aleatorias (no 55 completas)
   - ✅ Función `generateRandomBoard()` implementada correctamente
   - ✅ 10 tableros únicos generados al inicio
   - ✅ Tablero IA también con 16 cartas aleatorias
   - ✅ Eliminado problema de cartas infinitas

2. **Sistema de Cantador con Voz Real - NUEVO**
   - ✅ Web Speech API integrada
   - ✅ Voz en español mexicano (es-MX)
   - ✅ Velocidad 0.9 para claridad
   - ✅ Canta nombre de cada carta automáticamente
   - ✅ Intervalo de 3 segundos entre cartas

3. **Modos de Juego Implementados - NUEVO**
   - ✅ **Modo Automático**: Cartas se marcan automáticamente al ser cantadas
   - ✅ **Modo Manual**: Usuario marca con cacahuate 🥜, solo cartas cantadas
   - ✅ Tablero humano x4 más grande en modo manual
   - ✅ Tablero IA x3 más pequeño en modo manual
   - ✅ Transiciones suaves entre modos

4. **Marcado Visual Avanzado - NUEVO**
   - ✅ Overlay amarillo pulsante en cartas cantadas
   - ✅ Emoji cacahuate 🥜 en cartas seleccionadas (modo manual)
   - ✅ Marcado automático para IA siempre
   - ✅ Estados visuales claros y diferenciados

5. **Detección de Victoria Automática - NUEVO**
   - ✅ Juego se detiene al completar 16 cartas
   - ✅ Modal de victoria con confeti (solo humano)
   - ✅ Opciones de reinicio: Nuevo tablero vs Mismo tablero
   - ✅ Puntuación automática (humano vs IA)

6. **Carrusel de Tableros Rediseñado - MEJORADO**
   - ✅ Flechas laterales sin fondo (solo flechas grandes)
   - ✅ Contenido centrado sobre el tablero
   - ✅ Botón "SELECCIONAR" con fondo rojo
   - ✅ Mejor visibilidad y usabilidad

7. **Controles de UI Informativos - MEJORADO**
   - ✅ Botón de modo visible desde el inicio
   - ✅ Información completa: emoji + título + descripción
   - ✅ Botón CANTAR/PAUSAR con colores dinámicos
   - ✅ Overlay IA se desbloquea al presionar CANTAR

8. **Layout Responsivo Optimizado - MEJORADO**
   - ✅ Padding aumentado (pb-24) para ver footer completo
   - ✅ Scroll mejorado en móviles
   - ✅ Tablero IA visible completamente
   - ✅ Footer accesible sin cortes

**ARQUITECTURA FINAL IMPLEMENTADA:**

```typescript
// Estados completos del GameCanvas
interface GameState {
  // Control de juego
  gameStarted: boolean;
  isPlaying: boolean;
  isManualMode: boolean;
  isPaused: boolean;
  
  // Puntuación
  humanScore: number;
  iaScore: number;
  
  // Cartas y tableros
  currentCard: Card | null;
  currentBoardIndex: number;
  allBoards: Card[][]; // 10 tableros de 16 cartas
  iaCards: Card[]; // Tablero IA de 16 cartas
  remainingCards: Card[]; // Cartas por cantar
  
  // Marcado
  selectedIds: number[]; // Cartas marcadas por usuario
  iaSelectedIds: number[]; // Cartas marcadas por IA
  cantadasIds: number[]; // Cartas ya cantadas
  
  // Modal
  showVictoryModal: boolean;
  winner: 'human' | 'ia' | null;
}
```

**FLUJO DE JUEGO COMPLETO:**
1. **Selección**: Carrusel de 10 tableros + elección de modo
2. **Inicio**: Botón "SELECCIONAR" inicia el juego
3. **Cantador**: Botón "CANTAR" inicia voz automática
4. **Marcado**: Automático o manual según modo elegido
5. **Victoria**: Modal con confeti y opciones de reinicio
6. **Reinicio**: Nuevo tablero o continuar con el mismo

**LIBRERÍAS AGREGADAS:**
- ✅ `canvas-confetti` para efectos de victoria
- ✅ Web Speech API (nativa del navegador)

**REPOSITORIOS CREADOS:**
- ✅ https://github.com/Kikeluis78/Loteria.git (inicial)
- ✅ https://github.com/Kikeluis78/Jalapeno.git (limpio)
- 🔄 https://github.com/SanJuanOnline/TokenJalapeno.git (para Vercel)

**CONFIGURACIÓN GIT:**
```bash
git config user.name "Kikeluis78"
git config user.email "enriquegv078@gmail.com"
```

**ESTADO FINAL:**
- ✅ **Juego 100% funcional** con todas las mecánicas tradicionales
- ✅ **Dos modos de juego** perfectamente implementados
- ✅ **Voz sintética** en español mexicano
- ✅ **Detección de victoria** automática con modal
- ✅ **UI/UX profesional** optimizada para móviles
- ✅ **Código limpio** con TypeScript y buenas prácticas
- ✅ **Repositorio en GitHub** listo para deployment

**PRÓXIMO PASO INMEDIATO:**
- 🔄 **Deployment en Vercel** (resolver conexión GitHub)
- 📋 **Testing en dispositivos reales**
- 📋 **Integración Worldcoin** (Fase 2)

---

### 🔄 FASE 2: PROTOCOLO WORLDCOIN (EN PROGRESO)
**Objetivo:** Adaptar UI al protocolo oficial de Worldcoin Mini Apps

**Tareas:**

#### 2.1 Sistema de Espaciado
- [x] Aplicar padding de 24px en contenedores principales
- [x] Espaciado de 16px entre header y contenido
- [x] Espaciado de 32px entre secciones
- [x] Revisar espaciado en página home
- [x] Revisar espaciado en página game

#### 2.2 Navegación Mobile-First
- [x] Anclar botones importantes (no en scroll)
- [x] Eliminar scroll innecesario
- [x] Asegurar CTAs siempre visibles
- [x] Prevenir scroll bounce en iOS
- [ ] Implementar tab navigation (si aplica)

#### 2.3 UI Kit de Worldcoin
- [x] Instalar `@worldcoin/mini-apps-ui-kit-react`
- [ ] Reemplazar botones con componentes del UI Kit
- [ ] Usar componentes de cards del UI Kit
- [ ] Implementar estados de carga del UI Kit
- [ ] Revisar Storybook para componentes adicionales

#### 2.4 Comando Verify
- [ ] Crear acción "play-game" en Developer Portal
- [ ] Implementar botón de verificación antes de jugar
- [ ] Crear endpoint `/api/verify` en backend
- [ ] Integrar `verifyCloudProof` en backend
- [ ] Mostrar drawer de verificación de World App
- [ ] Marcar usuario como verificado en sesión
- [ ] Prevenir juego sin verificación (anti-bots)

#### 2.5 Optimización de Carga
- [ ] Medir tiempo de carga inicial (objetivo: < 3s)
- [ ] Optimizar bundle de JavaScript
- [ ] Lazy loading de componentes pesados
- [ ] Feedback visual durante todas las cargas
- [ ] Optimizar imágenes y assets

#### 2.6 Branding y Assets
- [ ] Crear app icon cuadrado (fondo no blanco)
- [ ] Crear content card 345x240px (94px inferiores libres)
- [ ] Asegurar no usar término "official"
- [ ] Asegurar no usar logo de World
- [ ] Mantener identidad de marca "Jalapeño"

---

### 📋 FASE 3: EXPERIENCIA DE USUARIO
**Objetivo:** Mejorar interacción y feedback visual

**Tareas:**
- [ ] Sonidos mexicanos tradicionales
- [ ] Efectos de sonido al marcar carta
- [ ] Música de fondo (opcional, con control)
- [ ] Animaciones mejoradas con Framer Motion
- [ ] Haptic feedback (vibración en móvil)
- [ ] Toasts para notificaciones
- [ ] Estados de error claros
- [ ] Tutorial interactivo para nuevos usuarios

---

### 🌐 FASE 4: MULTIJUGADOR
**Objetivo:** Sistema de juego en tiempo real

**Tareas:**
- [ ] Investigar WebSockets vs Server-Sent Events
- [ ] Diseñar arquitectura de salas de juego
- [ ] Implementar sistema de matchmaking
- [ ] Sincronización de cantador entre jugadores
- [ ] Chat en tiempo real (opcional)
- [ ] Sistema de espera de jugadores
- [ ] Detección de ganador en tiempo real
- [ ] Manejo de desconexiones

---

### 🏆 FASE 5: ECONOMÍA Y PREMIOS
**Objetivo:** Integración con tokens y sistema de recompensas

**Tareas:**
- [ ] Investigar integración con World Chain
- [ ] Sistema de compra de boletos
- [ ] Pool de premios
- [ ] Distribución automática de premios
- [ ] Historial de transacciones
- [ ] Sistema de comisiones
- [ ] Integración con comando Pay de MiniKit
- [ ] Wallet balance display

---

### 📊 FASE 6: ESTADÍSTICAS Y GAMIFICACIÓN
**Objetivo:** Retención y engagement de usuarios

**Tareas:**
- [ ] Sistema de estadísticas personales
- [ ] Leaderboard global
- [ ] Sistema de logros/achievements
- [ ] Racha de victorias (streaks)
- [ ] Perfil de usuario
- [ ] Historial de partidas
- [ ] Compartir victorias (comando Share)
- [ ] Sistema de niveles/experiencia

---

### 🌍 FASE 7: LOCALIZACIÓN
**Objetivo:** Soporte multi-idioma

**Tareas:**
- [ ] Configurar Next.js Internationalization
- [ ] Traducir a español (prioritario)
- [ ] Traducir a inglés
- [ ] Traducir a portugués
- [ ] Detectar idioma con Accept-Language
- [ ] Selector de idioma en settings
- [ ] Nombres de cartas localizados

---

### 🔔 FASE 8: NOTIFICACIONES Y RETENCIÓN
**Objetivo:** Mantener usuarios activos

**Tareas:**
- [ ] Solicitar permisos de notificación
- [ ] Notificaciones de nuevas partidas
- [ ] Notificaciones de premios ganados
- [ ] Notificaciones de eventos especiales
- [ ] Personalización con ${username}
- [ ] Optimizar open rate (objetivo: 25%)
- [ ] Badges en home screen (15% open rate)

---

### 📱 FASE 9: OPTIMIZACIÓN MÓVIL
**Objetivo:** Experiencia perfecta en dispositivos móviles

**Tareas:**
- [ ] Testing en iOS (Safari)
- [ ] Testing en Android (Chrome)
- [ ] Optimizar touch targets (mínimo 44x44px)
- [ ] Optimizar para una mano
- [ ] Orientación portrait forzada
- [ ] Optimizar para pantallas pequeñas
- [ ] Optimizar para pantallas grandes
- [ ] Performance en dispositivos de gama baja

---

### 🚀 FASE 10: LANZAMIENTO
**Objetivo:** Publicar en World App Store

**Tareas:**
- [ ] Revisar App Review Guidelines
- [ ] Preparar descripción de la app
- [ ] Preparar screenshots
- [ ] Configurar Developer Portal
- [ ] Testing exhaustivo
- [ ] Beta testing con usuarios reales
- [ ] Corrección de bugs críticos
- [ ] Enviar a revisión
- [ ] Marketing y promoción

---

## PRIORIDAD INMEDIATA (FASE 2)

**Siguiente sesión debe enfocarse en:**

1. **Instalar UI Kit de Worldcoin**
   ```bash
   npm install @worldcoin/mini-apps-ui-kit-react
   ```

2. **Implementar comando Verify**
   - Crear acción en Developer Portal
   - Botón de verificación antes de jugar
   - Backend para verificar proof

3. **Ajustar espaciados según protocolo**
   - 24px padding base
   - 32px entre secciones
   - Anclar botones

4. **Prevenir scroll bounce iOS**
   - Agregar CSS específico

5. **Optimizar tiempos de carga**
   - Medir performance actual
   - Lazy loading donde sea necesario
