# 🚀 Roadmap de Desarrollo: MVP al Lunes 30 Marzo

## 🎯 Objetivo del MVP

**Demostrar viabilidad técnica y cultural** con:
- Juego funcional de lotería mexicana
- Integración básica con World App
- Modo gratuito operativo
- 20 cartas con contenido cultural
- Sistema de victoria automático

---

## 📅 Timeline: Hoy (26 Marzo) → Lunes (30 Marzo)

### **Jueves 26 Marzo (HOY)** - Decisiones Críticas

#### ✅ Decisiones que Tomar AHORA

1. **¿Artista para cartas?**
   - [ ] ¿Tienes artista? → Contactar hoy
   - [ ] ¿Necesitas buscar? → Opciones:
     - Fiverr (búsqueda: "mexican art", "loteria cards")
     - Behance (portafolios de artistas mexicanos)
     - NFT marketplaces (artistas crypto)
   - **Presupuesto**: 15 WLD (~$30-45 USD) para 20 cartas
   - **Deadline**: Viernes tarde

2. **¿Modo "Escuela" desde día 1?**
   - [ ] SÍ → Diferenciador único, más trabajo
   - [ ] NO → Agregar en Fase 2, lanzar más rápido
   - **Recomendación**: NO para MVP, agregar después

3. **¿Sonido tradicional del cantor?**
   - [ ] SÍ → Más inmersivo, requiere grabación/licencia
   - [ ] NO → Solo visual para MVP
   - **Recomendación**: NO para MVP, agregar después

4. **¿Primera temática?**
   - [ ] Historia prehispánica (Aztecas, Mayas)
   - [ ] Independencia de México (Héroes, batallas)
   - [ ] Gastronomía regional (Platillos, ingredientes)
   - [ ] Día de Muertos (Catrinas, ofrendas)
   - **Recomendación**: **Gastronomía** (universal, atractivo visual, fácil de entender)

---

### **Viernes 27 Marzo** - Setup Técnico

#### Mañana (4 horas)
- [ ] Configurar proyecto base (ya tienes template)
- [ ] Instalar dependencias necesarias
- [ ] Configurar World App integration
- [ ] Setup de base de datos (si es necesario)

#### Tarde (4 horas)
- [ ] Crear estructura de datos para cartas
- [ ] Implementar generación de tablero 4x4
- [ ] Lógica de "cantor" (secuencia de cartas)
- [ ] Sistema de detección de victoria

#### Noche (2 horas)
- [ ] Recibir arte de las 20 cartas
- [ ] Optimizar imágenes para web
- [ ] Crear metadata de cada carta

---

### **Sábado 28 Marzo** - Desarrollo Core

#### Mañana (4 horas)
- [ ] UI del tablero de juego
- [ ] Animación de cartas cantadas
- [ ] Sistema de marcar cartas
- [ ] Feedback visual (hover, click)

#### Tarde (4 horas)
- [ ] Integrar World App authentication
- [ ] Modo gratuito funcional
- [ ] Sistema de puntos JAL (básico)
- [ ] Pantalla de victoria

#### Noche (2 horas)
- [ ] Testing de flujo completo
- [ ] Fix de bugs críticos
- [ ] Ajustes de UX

---

### **Domingo 29 Marzo** - Pulido y Deploy

#### Mañana (3 horas)
- [ ] Agregar contenido educativo a cartas
- [ ] Pantalla de inicio atractiva
- [ ] Instrucciones del juego
- [ ] Responsive design (móvil)

#### Tarde (3 horas)
- [ ] Deploy a staging
- [ ] Setup de ngrok
- [ ] Configurar en Developer Portal
- [ ] Testing en World App real

#### Noche (2 horas)
- [ ] Últimos ajustes
- [ ] Preparar demo
- [ ] Documentar bugs conocidos

---

### **Lunes 30 Marzo** - Lanzamiento Soft

#### Mañana (2 horas)
- [ ] Deploy a producción
- [ ] Verificar todo funciona
- [ ] Crear post de lanzamiento

#### Tarde (2 horas)
- [ ] Compartir con primeros usuarios
- [ ] Monitorear feedback
- [ ] Fix de bugs urgentes

---

## 🛠️ Stack Técnico Recomendado

### Frontend
```
- Next.js 14+ (ya tienes el template)
- React para UI
- TailwindCSS para estilos
- Framer Motion para animaciones (opcional)
```

### World App Integration
```
- @worldcoin/minikit-js
- World ID para autenticación
- World Chain para transacciones (Fase 2)
```

### Backend (Mínimo para MVP)
```
- Next.js API Routes
- Vercel para hosting
- Supabase/Firebase para datos (opcional)
```

### Smart Contracts (Fase 2)
```
- Solidity para contratos
- World Chain testnet
- Hardhat para desarrollo
```

---

## 📦 Funcionalidades del MVP

### ✅ DEBE Tener (Crítico)
- [x] Autenticación con World App
- [x] Tablero 4x4 aleatorio
- [x] Secuencia de cartas cantadas
- [x] Marcar cartas en tablero
- [x] Detección automática de victoria
- [x] Modo gratuito funcional
- [x] 20 cartas con arte e info cultural
- [x] Responsive para móvil

### 🟡 DEBERÍA Tener (Importante)
- [ ] Animaciones suaves
- [ ] Sonidos básicos (click, victoria)
- [ ] Leaderboard simple
- [ ] Compartir victoria en redes

### ⚪ PODRÍA Tener (Nice to have)
- [ ] Modo con WLD
- [ ] NFTs
- [ ] Torneos
- [ ] Modo escuela

---

## 🎨 Diseño de las 20 Cartas Iniciales

### Categoría: Gastronomía Mexicana (Recomendado)

**Cartas Tradicionales Adaptadas (8):**
1. El Gallo → Gallo en mole
2. La Dama → Adelita con tacos
3. El Catrín → Catrín con tequila
4. El Diablo → Chile habanero
5. La Sirena → Ceviche de pescado
6. El Soldado → Soldado con tamales
7. La Estrella → Estrella de anís
8. El Paraguas → Paraguas de papel picado

**Platillos Icónicos (6):**
9. El Taco → Taco al pastor
10. El Mole → Mole poblano
11. El Pozole → Pozole rojo
12. Los Tamales → Tamales verdes
13. Las Enchiladas → Enchiladas suizas
14. El Ceviche → Ceviche de camarón

**Ingredientes Esenciales (6):**
15. El Aguacate → Aguacate hass
16. El Chile → Chile jalapeño
17. El Maíz → Mazorca de maíz
18. El Nopal → Nopal fresco
19. El Jitomate → Jitomate rojo
20. El Cilantro → Manojo de cilantro

---

## 💾 Estructura de Datos de Carta

```json
{
  "id": 1,
  "nombre": "El Aguacate",
  "categoria": "ingrediente",
  "rareza": "comun",
  "imagen": "/cards/aguacate.png",
  "descripcion": "El aguacate es originario de México y ha sido cultivado por más de 10,000 años.",
  "dato_curioso": "México produce el 30% del aguacate mundial.",
  "receta": "Guacamole: Machaca aguacate con jitomate, cebolla, cilantro y limón.",
  "region": "Michoacán",
  "valor_educativo": {
    "historia": "Usado por aztecas como afrodisíaco",
    "nutricion": "Rico en grasas saludables y vitamina E",
    "economia": "Principal exportación agrícola de México"
  }
}
```

---

## 🧪 Plan de Testing

### Testing Manual (Crítico)
- [ ] Juego completo en desktop
- [ ] Juego completo en móvil
- [ ] Autenticación World App
- [ ] Victoria en diferentes configuraciones
- [ ] Múltiples jugadores simultáneos

### Testing Automatizado (Opcional para MVP)
- [ ] Unit tests de lógica de juego
- [ ] Integration tests de API
- [ ] E2E tests con Playwright

---

## 📊 Métricas de Éxito del MVP

### Técnicas
- [ ] Juego funciona sin crashes
- [ ] Tiempo de carga < 3 segundos
- [ ] Responsive en móviles
- [ ] Integración World App exitosa

### Usuario
- [ ] Al menos 10 personas completan un juego
- [ ] Feedback positivo sobre contenido cultural
- [ ] Usuarios entienden las reglas sin ayuda
- [ ] Tiempo promedio de juego: 5-10 minutos

### Negocio
- [ ] Validar interés en modo con WLD
- [ ] Identificar carta más popular
- [ ] Recopilar ideas para mejoras
- [ ] Confirmar viabilidad del concepto

---

## 🚨 Riesgos y Contingencias

| Riesgo | Probabilidad | Impacto | Contingencia |
|--------|--------------|---------|--------------|
| **Artista no entrega a tiempo** | Media | Alto | Usar arte placeholder, contratar backup |
| **Bug crítico en World App** | Baja | Alto | Tener modo demo sin autenticación |
| **Servidor cae en demo** | Media | Alto | Deploy en múltiples plataformas |
| **No hay tiempo para todo** | Alta | Medio | Priorizar funcionalidad core, cortar nice-to-haves |

---

## ✅ Checklist Diario

### Cada Noche Antes de Dormir
- [ ] Commit de código a GitHub
- [ ] Documentar progreso del día
- [ ] Identificar bloqueadores para mañana
- [ ] Actualizar timeline si es necesario

### Cada Mañana al Empezar
- [ ] Revisar checklist del día
- [ ] Priorizar tareas críticas
- [ ] Verificar que ambiente de desarrollo funciona
- [ ] 5 minutos de planning mental
