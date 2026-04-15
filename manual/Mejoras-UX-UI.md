# Mejoras de UX/UI - Guía de Onboarding

**Fecha**: 14 de abril de 2026  
**Objetivo**: Crear una ruta clara de onboarding para que cualquier persona nueva pueda jugar sin problemas

---

## 🎯 Mejoras Implementadas

### 1. ✅ Spinner (Pantalla de Carga)
**Estado**: Correcto y funcional

- 3 páginas con transiciones suaves
- Página 1: Logo y título con animaciones
- Página 2: Explicación del juego y recompensas
- Página 3: Reglas de repartición de tokens
- Barra de progreso con colores dinámicos
- Duración total: 18 segundos

---

### 2. ✅ Página Home
**Mejoras aplicadas**:

#### Sección de Instrucciones
- **Agregado**: Caja con instrucciones principales
- Pasos claros:
  - Elige un tablero de 16 cartas
  - Toca las cartas que salgan
  - Completa una línea para ganar
  - Gana tokens en cada partida 🌶️

#### Botón de Juego
- **Mejorado**: Texto más descriptivo
  - Antes: "Entrar al juego"
  - Ahora: "Juega gratis cada 24 horas"
- **Mejorado**: Mensaje de cooldown más claro
  - Antes: "En cooldown. Compra abajo."
  - Ahora: "En cooldown. Compra abajo para jugar ahora."

---

### 3. ✅ Página de Selección de Tableros (BoardCarousel)
**Mejoras aplicadas**:

#### Claridad Visual
- **Agregado**: Texto explicativo en el header
  - "👆 Desliza con las flechas para ver todos los tableros"
  - Fondo negro semi-transparente para mejor legibilidad

#### Botón de Selección
- **Rediseñado**: Botón más grande y claro
  - Color: Verde (antes era azul/cyan)
  - Texto: "✓ Seleccionar este Tablero" (antes solo "Seleccionar")
  - Tamaño: py-5 text-xl (antes py-4 text-lg)
  - Animación: pulse para llamar la atención

- **Agregado**: Texto de ayuda debajo del botón
  - "Presiona el botón verde para confirmar tu elección"
  - Color: blanco/60 para no distraer

---

### 4. ✅ Modal de Instrucciones (TutorialModal)
**Mejoras aplicadas**:

#### Tablero de Ejemplo
- **Mejorado**: Tablero ahora es 4x4 (16 cartas) como el real
  - Antes: 2x2 (4 cartas)
  - Ahora: 4x4 (16 cartas)
- Mantiene la manita animada en la primera carta

#### Instrucciones
- **Rediseñado**: Instrucciones paso a paso numeradas
  1. Las cartas salen automáticamente cada 2 segundos
  2. Cuando salga una carta que tengas, tócala en tu tablero
  3. Completa una línea (horizontal, vertical o diagonal) antes que la IA

- **Agregado**: Sección de objetivo
  - "🏆 Gana tokens al completar líneas y vencer a la IA"
  - Fondo verde con borde para destacar

#### Claridad
- Texto más directo y fácil de entender
- Eliminada ambigüedad sobre cómo funciona el juego
- Énfasis en que las cartas salen automáticamente

---

### 5. ✅ Página del Canvas (GamePlay)
**Mejoras aplicadas**:

#### Botón Play
- **Rediseñado**: Botón más compacto
  - Antes: py-3 con texto vertical
  - Ahora: py-2.5 con texto horizontal
- Icono y texto en línea: "▶️ Play" / "⏸️ Pausa"

#### Manita y Texto de Ayuda
- **Agregado**: Manita grande (👆) a la DERECHA del botón
  - Tamaño: text-4xl (antes text-xl)
  - Posición: Fuera del botón, a la derecha
  - Animación: bounce

- **Agregado**: Texto explicativo junto a la manita
  - "Presiona para iniciar"
  - Fondo negro/80 con texto amarillo
  - Tamaño: text-[9px] para no ocupar mucho espacio

#### Comportamiento
- **Implementado**: La manita y el texto desaparecen al dar Play
  - Estado: `showPlayHint` controla la visibilidad
  - Se oculta al llamar `handleStartGame()`
  - No vuelve a aparecer durante la sesión

---

## 🎨 Mejoras Visuales Generales

### Colores y Contraste
- Botones con gradientes más llamativos
- Textos con mejor contraste sobre fondos oscuros
- Uso de colores semánticos:
  - Verde: Acciones positivas (Seleccionar, Play)
  - Amarillo: Información importante
  - Rojo: Salir/Cancelar

### Animaciones
- Bounce en elementos interactivos
- Pulse en botones importantes
- Transiciones suaves entre estados

### Tipografía
- Tamaños jerárquicos claros
- Font-weight apropiado para cada nivel
- Textos de ayuda en tamaños pequeños pero legibles

---

## 📊 Flujo de Onboarding Completo

```
1. Spinner (18s)
   ↓
2. Modal de Verificación (World ID)
   ↓
3. Home con Instrucciones
   ↓
4. Selección de Tablero (con ayuda visual)
   ↓
5. Modal de Tutorial (opcional, se puede desactivar)
   ↓
6. Juego con Manita y Texto de Ayuda
   ↓
7. Juego en Progreso (ayudas desaparecen)
```

---

## ✅ Checklist de Mejoras

- [x] Spinner correcto y funcional
- [x] Home con instrucciones claras
- [x] Selección de tableros con claridad visual
- [x] Modal de instrucciones con tablero 4x4
- [x] Descripción del tutorial más clara
- [x] Botón Play rediseñado
- [x] Manita grande a la derecha del botón
- [x] Texto explicativo junto a la manita
- [x] Manita y texto desaparecen al dar Play

---

## 🚀 Próximos Pasos (Opcional)

### Mejoras Adicionales Sugeridas
1. **Tooltips contextuales**: Pequeños tooltips que aparezcan al pasar sobre elementos
2. **Tour guiado**: Sistema de pasos que resalte cada elemento en orden
3. **Video tutorial**: Opción de ver un video corto del juego
4. **Modo práctica**: Juego sin cooldown para practicar
5. **Feedback visual**: Más animaciones al marcar cartas correctamente

### Métricas a Monitorear
- Tasa de abandono en cada paso
- Tiempo promedio en cada pantalla
- Porcentaje de usuarios que desactivan el tutorial
- Tasa de comprensión (usuarios que completan su primer juego)

---

## 📝 Notas Técnicas

### Archivos Modificados
1. `apps/web/app/page.tsx` - Home con instrucciones
2. `apps/web/components/game/BoardCarousel.tsx` - Selección de tableros
3. `apps/web/components/modals/TutorialModal.tsx` - Modal de tutorial
4. `apps/web/components/game/GamePlay.tsx` - Juego con manita y texto

### Estados Agregados
- `showPlayHint` en GamePlay - Controla visibilidad de la ayuda del botón Play

### Funciones Agregadas
- `handleStartGame()` en GamePlay - Inicia el juego y oculta la ayuda

---

**Compilación**: ✅ Sin errores  
**Servidor**: ✅ Corriendo en http://localhost:3000
