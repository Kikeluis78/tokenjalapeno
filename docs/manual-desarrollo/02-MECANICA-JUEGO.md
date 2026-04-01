# 🎴 Mecánica del Juego: Lotería Mexicana

## Reglas Tradicionales Adaptadas

### Elementos del Juego

| Elemento | Implementación Digital |
|----------|------------------------|
| **54 cartas** | NFTs coleccionables (El Gallo, La Dama, El Catrín, etc.) |
| **Tablero 4x4** | Grid digital que el usuario completa |
| **Cantor (caller)** | Audio/animación de cartas cantadas |
| **Victoria** | 4 en línea (horizontal, vertical, diagonal) |

---

## 🎮 Modos de Juego

| Modo | Costo | Premio | Duración |
|------|-------|--------|----------|
| **Clásica** | Gratis | Puntos JAL | 5-10 min |
| **Rápida** | 0.1 WLD | WLD acumulado | 2 min |
| **Torneo** | 0.5 WLD | Jackpot + NFT raro | 30 min |
| **Especial** | 1 WLD | Evento temático (Día de Muertos, etc) | Variable |

### Modo Clásica (Gratis)
- Sin costo de entrada
- Gana puntos JAL (token de utilidad)
- Perfecto para nuevos usuarios
- Educativo y sin riesgo

### Modo Rápida
- Entrada: 0.1 WLD
- Pool acumulado entre jugadores
- Ganador se lleva 80% del pool
- 20% va a treasury del proyecto

### Modo Torneo
- Entrada: 0.5 WLD
- Múltiples rondas eliminatorias
- Premios: WLD + NFT exclusivo
- Evento programado (ej: cada sábado)

### Modo Especial
- Eventos temáticos culturales
- Día de Muertos, Independencia, etc.
- Cartas exclusivas del evento
- Colaboraciones con marcas/instituciones

---

## 📚 Contenido Educativo Integrado

### Cada Carta = Mini-Historia

**Ejemplo: "El Nopal"**
```
├── Imagen: Nopal con tunas (arte mexicano)
├── Info: "Símbolo nacional desde 1821, representa resistencia..."
├── Receta: "Ensalada de nopal con jitomate..."
├── Dato curioso: "México produce 900,000 toneladas anuales"
└── Quiz: "¿En qué estado crece más?" → Puntos extra
```

### Modo Escuela (Educativo)

**Características:**
- Sin apuestas ni WLD
- Profesor crea sala privada con código
- Estudiantes se unen con el código
- Aprenden historia/cultura jugando
- Leaderboard educativo por clase
- Dashboard para profesores con estadísticas

**Casos de Uso:**
- Clases de español como segunda lengua
- Historia de México
- Estudios culturales latinoamericanos
- Programas de intercambio cultural

---

## 🎯 Flujo de Juego (MVP)

### Paso a Paso

1. **Usuario entra con World App**
   - Autenticación automática con World ID
   - Verificación de humanidad (anti-bots)

2. **Elige modo de juego**
   - Modo Gratis o Modo WLD
   - Confirma entrada (si es modo pagado)

3. **Recibe tablero 4x4 aleatorio**
   - 16 cartas aleatorias de las 54 disponibles
   - Cada jugador tiene tablero diferente

4. **"Cantor" va sacando cartas**
   - Animación de carta revelándose
   - Audio tradicional (opcional)
   - Nombre de la carta en pantalla

5. **Usuario marca si tiene la carta**
   - Click/tap en la carta de su tablero
   - Validación automática

6. **Primero en línea de 4 = gana**
   - Horizontal, vertical o diagonal
   - Sistema detecta victoria automáticamente
   - Validación en blockchain

7. **Reclama premio**
   - Puntos JAL (modo gratis)
   - WLD (modo pagado)
   - NFT (torneos especiales)

---

## 🎨 Arte Inicial (20 Cartas para MVP)

### Cartas Tradicionales Esenciales
1. El Gallo
2. El Diablo
3. La Dama
4. El Catrín
5. El Paraguas
6. La Sirena
7. El Soldado
8. La Estrella

### Cartas Culturales Mexicanas
9. El Nopal
10. El Tequila
11. El Mariachi
12. La Bandera
13. El Águila
14. La Corona
15. El Sombrero
16. La Guitarra

### Cartas Gastronómicas
17. El Taco
18. El Chile
19. El Mole
20. El Aguacate

---

## 🔊 Elementos de Audio (Opcional Fase 2)

- Voz del "cantor" tradicional
- Música de fondo mexicana sutil
- Efectos de sonido al marcar carta
- Celebración al ganar

---

## 🎲 Mecánica Anti-Trampa

1. **Tableros generados server-side**: No manipulables por cliente
2. **Secuencia de cartas pre-determinada**: Hash verificable en blockchain
3. **Validación de victoria**: Smart contract verifica línea ganadora
4. **World ID obligatorio**: Un humano = una cuenta
