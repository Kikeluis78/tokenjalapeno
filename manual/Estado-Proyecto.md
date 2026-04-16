# Estado del Proyecto - Jalapeño Lottery
**Última actualización**: 15 de abril de 2026, 22:06 CST

---

## 📋 Resumen Ejecutivo

Mini App de lotería mexicana integrada con World ID, desplegada en Vercel. Juego funcional con tableros, carrusel de selección, sistema de marcado con cacahuates, cooldown de 4 horas y notificaciones push.

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
  - Página 1 (4s): Título grande + logo pequeño centrado + textos
  - Página 2 (6s): Imagen juego2.png + overlay + explicación del juego
  - Página 3 (8s): Imagen juego.png + reglas de repartición (inputs transparentes, textos justificados)
  - Barra de progreso sincronizada
- ✅ **Modal World ID** - Verificación de humanidad (simulado)
  - 4 esquinas redondeadas visibles
  - Margen inferior mejorado (pb-16)
- ✅ **Home** - Página principal rediseñada
  - Logo en esquina superior derecha
  - Instrucciones claras "¿Cómo Jugar?"
  - Botón JUGAR AHORA con animación gelatina suave
  - Contador de cooldown (Xh Xm)
  - Botón de notificaciones
  - Sección "Próximamente" elegante
  - Sistema de referidos al final
- ✅ **Carrusel** - Selección de tablero mejorado
  - Instrucciones paso a paso (1, 2, 3)
  - Flechas más pequeñas (10x10)
  - Sin mano animada
  - Botón "JUGAR CON ESTE TABLERO"
- ✅ **CardRain** - Transición con lluvia de cartas
- ✅ **GamePlay** - Juego activo

### 4. Sistema de Cooldown y Recompensas
- ✅ **Cooldown de 4 horas** (antes 24h)
- ✅ **Contador en tiempo real** - Se actualiza cada minuto
- ✅ **Juego gratis cada 4 horas**
- ✅ **Opción de compra** - 0.001 WLD para jugar inmediatamente
- ✅ **Recompensas**:
  - Victoria: 100 tokens + 25 bonus si < 2 min
  - Derrota: 50 tokens de consolación

### 5. Sistema de Notificaciones Push
- ✅ **Botón de activación** - Aparece cuando estás en cooldown
- ✅ **Permiso del navegador** - Solicita autorización
- ✅ **Notificación programada** - Avisa cuando puedes jugar (4h después)
- ✅ **Notificación de resultados** - Al ganar/perder muestra tokens ganados
- ✅ **Icono personalizado** - Usa logoSpinner.png
- ✅ **Actualización automática** - Cooldown se actualiza cada minuto

### 6. Sistema de Juego Implementado
- ✅ **Modal Tutorial** (Primera vez)
- ✅ **Tablero Humano** con marcado de cacahuate 🥜
- ✅ **Carta Actual** con audio Web Speech API
- ✅ **Botón Play/Pause** con mano animada
- ✅ **Contador de Cartas**
- ✅ **Cartas Salidas**
- ✅ **Tablero IA** con marcado automático
- ✅ **Botón Salir**

### 7. Componentes Implementados
```
apps/web/
├── components/
│   ├── spinner/
│   │   └── Spinner.tsx              ✅ (Título grande, logo pequeño)
│   ├── modals/
│   │   ├── VerifyModal.tsx          ✅ (4 esquinas redondeadas)
│   │   └── TutorialModal.tsx        ✅
│   └── game/
│       ├── BoardCarousel.tsx        ✅ (UX mejorada)
│       ├── CardRain.tsx             ✅
│       ├── GamePlay.tsx             ✅ (Con notificaciones)
│       └── [otros componentes]      ✅
├── lib/
│   ├── notifications.ts             ✅ (NUEVO - Sistema de notificaciones)
│   └── game/
│       └── store.ts                 ✅ (Cooldown 4h)
└── app/
    └── page.tsx                     ✅ (Home rediseñado)
```

### 8. Control de Versiones
- ✅ Repositorio: `github.com/Kikeluis78/tokenjalapeno`
- ✅ Branch principal: `main`
- ✅ Último commit: `b77d18e` - "feat: cooldown 4h, notificaciones, logo esquina, animación gelatina"
- ✅ Desplegado en Vercel automáticamente

---

## 📝 Sesión 14 de Abril 2026 - Tarde (19:00-19:22)

### Mejoras Implementadas

#### 1. Spinner - Ajustes de Tamaño
- **Título más grande**: h-64/sm:h-80 (256px/320px)
- **Logo más pequeño**: h-40 w-40 (160px)
- **Posicionamiento absoluto**: Título arriba sin empujar el logo
- **Logo centrado**: Perfectamente en el medio de la pantalla
- **Página 3**: Inputs más transparentes (bg-black/20), textos justificados

#### 2. Modal de Verificación
- **4 esquinas redondeadas**: Cambiado de `rounded-t-3xl` a `rounded-3xl`
- **Más espacio abajo**: `pb-16` para ver todas las esquinas

#### 3. Home - Rediseño Completo
- **Logo en esquina superior derecha**: Más estético y discreto
- **Instrucciones visibles**: Caja con "🎯 ¿Cómo Jugar?" siempre presente
- **Botón JUGAR AHORA**:
  - Animación gelatina suave (3s loop)
  - Texto: "Juega cada 4 horas gratis"
  - Contador en cooldown: "Espera Xh Xm"
- **Botón de notificaciones**: Aparece cuando estás en cooldown
- **Sección Próximamente**: Diseño elegante para features futuras
- **Jerarquía visual clara**: Header → Instrucciones → Jugar → Comprar → Próximamente → Referidos

#### 4. Carrusel - UX Mejorada
- **Instrucciones paso a paso**: 3 pasos numerados
- **Flechas más pequeñas**: 10x10 en lugar de 14x14
- **Sin mano animada**: Eliminada distracción
- **Botón sin pulse infinito**: Solo hover/active effects
- **Ancho optimizado**: max-w-md
- **Espaciado mejorado**: gap-4

#### 5. Sistema de Cooldown (4 horas)
- **Cambio de 24h a 4h**: Más dinámico
- **Contador en tiempo real**: Muestra horas y minutos restantes
- **Actualización automática**: Cada 60 segundos
- **Store actualizado**: Cooldown de 4h en victoria y derrota

#### 6. Sistema de Notificaciones Push
- **Archivo nuevo**: `/lib/notifications.ts`
- **Funciones**:
  - `requestNotificationPermission()` - Solicita permiso
  - `sendNotification()` - Envía notificación
  - `notifyGameReady()` - Avisa cuando puedes jugar
  - `notifyGameResult()` - Muestra resultado del juego
  - `scheduleNotification()` - Programa notificación futura
- **Integración en Home**:
  - Botón "🔔 Activar Notificaciones"
  - Programación automática cuando hay cooldown
  - Notificación al terminar las 4 horas
- **Integración en GamePlay**:
  - Notificación automática al ganar/perder
  - Muestra tokens ganados

#### 7. Mejoras Visuales Generales
- **Uso consistente de bg-linear-to**: En lugar de gradient
- **Animación gelatina**: Efecto suave y profesional
- **Sin imagen de fondo en Home**: Más limpio
- **Textos justificados**: Mejor legibilidad en Spinner página 3

### Archivos Modificados
```
apps/web/
├── app/
│   └── page.tsx                     [MODIFICADO - Home rediseñado]
├── components/
│   ├── spinner/
│   │   └── Spinner.tsx              [MODIFICADO - Tamaños invertidos]
│   ├── modals/
│   │   └── VerifyModal.tsx          [MODIFICADO - 4 esquinas]
│   └── game/
│       ├── BoardCarousel.tsx        [MODIFICADO - UX mejorada]
│       └── GamePlay.tsx             [MODIFICADO - Notificaciones]
└── lib/
    ├── notifications.ts             [NUEVO - Sistema completo]
    └── game/
        └── store.ts                 [MODIFICADO - Cooldown 4h]
```

### Decisiones de Diseño
- **Cooldown 4h**: Balance entre engagement y no saturar
- **Logo en esquina**: Más espacio para contenido principal
- **Animación gelatina**: Sutil, no molesta, llama la atención
- **Notificaciones**: Mejora retención de usuarios
- **Contador en tiempo real**: Transparencia y expectativa clara

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

### 3. Sistema de Recompensas (ALTA PRIORIDAD)
- [ ] Diseñar métrica de recompensas
- [ ] Definir criterios de victoria
- [ ] Sistema de puntos/tokens
- [ ] Integración con Jalapeño Token
- [ ] Distribución de premios

### 4. Notificaciones Avanzadas
- [ ] Service Worker para notificaciones en background
- [ ] Notificaciones de torneos
- [ ] Notificaciones de recompensas especiales
- [ ] Configuración de preferencias de notificaciones

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
│   │   ├── page.tsx           ✅ Home rediseñado con notificaciones
│   │   ├── game/
│   │   │   └── page.tsx       ✅ Lógica de fases del juego
│   │   └── layout.tsx         ✅ Layout principal
│   ├── components/
│   │   ├── spinner/           ✅ Título grande, logo pequeño
│   │   ├── modals/            ✅ Modal World ID + Tutorial
│   │   └── game/              ✅ Todos los componentes de juego
│   ├── hooks/
│   │   └── useSpinner/        ✅ Hook para spinner
│   ├── lib/
│   │   ├── notifications.ts   ✅ Sistema de notificaciones
│   │   ├── cards.ts           ✅ 54 cartas
│   │   └── game/
│   │       └── store.ts       ✅ Zustand store (cooldown 4h)
│   └── public/
│       ├── tituloLoteria.png  ✅
│       ├── tituloLoteria2.png ✅
│       └── logoSpinner.png    ✅
├── packages/ui/               ✅ shadcn/ui components
└── manual/                    📚 Documentación (NO SE SUBE)
    ├── Estado-Proyecto.md     ✅ Este archivo
    ├── Mejoras-UX-UI.md       ✅
    ├── Protocolo-Desarrollo.md
    └── Loteria Mexicana.pdf
```

---

## 🎮 Flujo del Juego Actual

```
1. SPINNER (18s)
   - Página 1: Título grande + logo pequeño
   - Página 2: Explicación del juego
   - Página 3: Reglas de recompensas
   ↓
2. MODAL WORLD ID (verificación simulada)
   ↓
3. HOME (menú principal rediseñado)
   - Logo en esquina superior derecha
   - Instrucciones visibles
   - Botón JUGAR con animación gelatina
   - Contador de cooldown
   - Botón de notificaciones (si en cooldown)
   ↓ [Click "JUGAR AHORA"]
4. CARRUSEL (selección de tablero)
   - Instrucciones paso a paso
   - Flechas pequeñas
   - Botón "JUGAR CON ESTE TABLERO"
   ↓ [Click "JUGAR"]
5. CARD RAIN (transición 3s)
   ↓
6. GAMEPLAY (juego activo)
   - Notificación al terminar
   ↓ [16 cartas marcadas]
7. MODAL VICTORIA
   - Cooldown de 4h activado
   - Notificación programada
   ↓ [Reiniciar o Salir]
```

---

## 📊 Especificaciones Técnicas

### Sistema de Cooldown
- **Duración**: 4 horas (14,400 segundos)
- **Actualización**: Cada 60 segundos
- **Formato**: "Espera Xh Xm"
- **Bypass**: Compra con 0.001 WLD

### Sistema de Notificaciones
- **API**: Web Notifications API
- **Permiso**: Solicitado al usuario
- **Tipos**:
  - Game Ready: Cuando termina cooldown
  - Game Result: Victoria/Derrota con tokens
- **Icono**: /logoSpinner.png
- **Programación**: setTimeout con duración del cooldown

### Velocidad del Juego
- **Intervalo entre cartas**: 2 segundos
- **Duración máxima**: 108 segundos (54 cartas × 2s)
- **Duración mínima para ganar**: 32 segundos (16 cartas × 2s)

### Tableros
- **Cartas por tablero**: 16 (grid 4×4)
- **Total de cartas disponibles**: 54
- **Tableros generados**: 10 para elegir
- **Condición de victoria**: 16 cartas marcadas

---

## 🐛 Problemas Conocidos

### Activos (Para Próxima Sesión)
- ⚠️ Footer: No implementado
- ⚠️ Modal Victoria: Diseño básico
- ⚠️ Service Worker: Notificaciones solo funcionan con app abierta

### Resueltos (Sesión 14 Abril - Tarde)
- ✅ Cooldown: Cambiado a 4 horas
- ✅ Notificaciones: Sistema completo implementado
- ✅ Home: Rediseñado con mejor UX
- ✅ Spinner: Tamaños invertidos (título grande, logo pequeño)
- ✅ Carrusel: UX mejorada sin distracciones
- ✅ Modal Verify: 4 esquinas redondeadas visibles

---

## 📝 Notas Importantes

### Sistema de Notificaciones
- **Requiere HTTPS**: Solo funciona en producción o localhost
- **Permiso del usuario**: Debe aceptar en el navegador
- **Limitaciones**: No funciona si la app está cerrada (sin Service Worker)
- **Próxima mejora**: Implementar Service Worker para notificaciones en background

### Cooldown de 4 Horas
- **Razón**: Balance entre engagement y no saturar
- **Alternativa**: Compra con WLD para jugar inmediatamente
- **Futuro**: Posible ajuste basado en métricas de usuarios

---

## 🎯 Roadmap

### Sesión 14 Abril 2026 - Tarde (Completada)
- ✅ Cooldown de 4 horas con contador en tiempo real
- ✅ Sistema de notificaciones push completo
- ✅ Home rediseñado con mejor jerarquía visual
- ✅ Spinner con tamaños invertidos (título grande, logo pequeño)
- ✅ Carrusel con UX mejorada
- ✅ Modal Verify con 4 esquinas redondeadas
- ✅ Animación gelatina suave en botón JUGAR

### Próxima Sesión
1. **Footer con estadísticas** (wallet, puntaje, victorias)
2. **Modal de victoria mejorado** (animaciones, stats)
3. **Service Worker** (notificaciones en background)
4. **Integración World ID** (verificación real)

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
- **Web Notifications API**: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API

---

**Preparado por**: Kiro AI Assistant  
**Fecha**: 14 de abril de 2026, 19:22 CST

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
