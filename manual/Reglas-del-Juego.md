# 🎮 Reglas del Juego - Lotería Mexicana by Jalapeño

## 🎯 Objetivo del Juego

Ser el primero en completar las **16 cartas** de tu tablero antes que tu oponente.

---

## 🎲 Modalidades de Juego

### 🤖 Fase Actual: Humano vs Máquina
- **Jugador Humano**: Tablero grande al centro, marca manualmente con touch
- **Máquina (IA)**: Tablero pequeño lado derecho, marca automáticamente
- **Competencia**: Quien complete primero sus 16 cartas gana

### 🏆 Fase 4 (Futuro): Torneo Humano vs Humano
- Multijugador en tiempo real
- Salas de juego
- Ranking y leaderboards

---

## 🃏 Mecánica del Juego

### Generación de Tableros
- Cada jugador recibe un tablero 4x4 (16 cartas)
- Las cartas se seleccionan aleatoriamente de las **55 cartas mexicanas**
- Cada tablero es único por partida

### Sistema de Cantador
- Las **55 cartas** aparecen una por una automáticamente
- **Orden aleatorio** sin repetición por sesión
- **Audio tradicional** + texto por cada carta cantada
- **Velocidad variable** para mantener emoción

### Marcado de Cartas
- **Humano**: Toca la carta en su tablero para marcarla
- **Máquina**: Marca automáticamente (con pequeño delay visual)
- **Validación**: Solo se pueden marcar cartas que coincidan con la cantada

---

## 🏁 Condiciones de Victoria

### Victoria Inmediata
- Completar las **16 cartas** del tablero
- **Efectos de celebración**:
  - 🎊 Confeti animado
  - 🎰 Efectos de casino (luces, sonidos)
  - 🔊 Audio de victoria tradicional mexicano
  - 📢 Anuncio del ganador

### Empate
- Si ambos completan en la misma carta cantada
- Se declara empate con efectos especiales

---

## 🎨 Interfaz del Juego

### Layout Principal
```
┌─────────────────────────────────────┐
│           HEADER (Pendiente)        │
├─────────────────────────────────────┤
│  🎤 CARTA CANTADA ACTUAL (Centro)   │
├─────────────────┬───────────────────┤
│                 │   🤖 MÁQUINA     │
│   👤 HUMANO     │   [Tablero 4x4]  │
│   [Tablero 4x4] │   (Pequeño)      │
│   (Grande)      │                   │
│                 │                   │
└─────────────────┴───────────────────┘
```

### Elementos Visuales
- **Tablero Humano**: Centro, grande, interactivo
- **Tablero Máquina**: Derecha, pequeño, automático
- **Carta Cantada**: Prominente, con audio y texto
- **Header**: Contorno delimitado (contenido pendiente)

---

## 🎵 Experiencia Audiovisual

### Audio Tradicional
- **Cantador**: Voz tradicional mexicana por cada carta
- **Efectos**: Sonidos de feria y festividades
- **Victoria**: Música de celebración
- **Ambiente**: Audio de fondo opcional

### Animaciones de Casino
- **Cartas**: Efectos de flip y brillo
- **Marcado**: Animación de selección
- **Victoria**: Confeti, luces, explosiones
- **Transiciones**: Suaves y profesionales

---

## 🃏 Las 55 Cartas Mexicanas

### Cartas Tradicionales (54)
Incluye todas las cartas clásicas de la lotería mexicana con sus emojis correspondientes.

### Carta Especial (1)
- **🌶️ El Jalapeño**: Carta exclusiva del airdrop
- Efectos especiales cuando aparece

---

## 🎯 Estrategia del Juego

### Para el Humano
- **Velocidad**: Marcar rápidamente las cartas correctas
- **Atención**: No perder ninguna carta cantada
- **Presión**: Competir contra la velocidad de la máquina

### Para la Máquina
- **Delay realista**: No marca instantáneamente
- **Dificultad ajustable**: Velocidad de marcado variable
- **Comportamiento humano**: Simula errores ocasionales

---

## 🏆 Sistema de Puntuación (Futuro)

### Puntos por Victoria
- Victoria rápida: Más puntos
- Victoria ajustada: Puntos normales
- Racha de victorias: Bonificación

### Estadísticas
- Partidas jugadas
- Victorias/Derrotas
- Tiempo promedio
- Cartas favoritas

---

## 🎊 Celebraciones y Efectos

### Victoria del Humano
- 🎊 Confeti dorado cayendo
- 🎰 Luces de casino parpadeando
- 🔊 "¡LOTERÍA!" con voz tradicional
- 📱 Vibración de celebración

### Victoria de la Máquina
- 🤖 Efectos más sutiles
- 💭 Mensaje motivacional para reintentar
- 🎯 Estadísticas de la partida

---

## 📱 Controles del Juego

### Acciones Principales
- **Touch**: Marcar carta en tablero
- **Botón Nuevo Juego**: Reiniciar partida
- **Botón Pausa**: Pausar cantador (opcional)
- **Botón Audio**: Activar/desactivar sonidos

### Navegación
- **Volver**: Regresar al menú principal
- **Configuración**: Ajustes de audio y dificultad

---

## 🚀 Roadmap de Desarrollo

### ✅ Implementado
- Tableros 4x4 con 55 cartas
- Sistema de cantador básico
- Marcado manual vs automático
- Detección de victoria

### 🔄 En Desarrollo
- Audio tradicional mexicano
- Efectos de casino y confeti
- Interfaz mejorada con header
- Animaciones profesionales

### 📋 Pendiente
- Sistema de puntuación
- Dificultad ajustable
- Estadísticas personales
- Modo torneo humano vs humano

---

*Documento creado: 30 de Marzo, 2026*
*Versión: 1.0*
*Proyecto: Lotería Mexicana by Jalapeño*
