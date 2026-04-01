# 📋 RESUMEN EJECUTIVO: Protocolo Worldcoin para Mini Apps

## 🎯 HALLAZGOS CLAVE

### 1. TODAS LAS MINI APPS USAN EL MISMO MODAL DE VERIFICACIÓN

**✅ Confirmado:** El modal/drawer de verificación NO es personalizable.

- Es un **componente nativo de World App**
- Se activa con el comando `MiniKit.commandsAsync.verify()`
- Diseño consistente en todas las Mini Apps
- El desarrollador solo configura:
  - `action`: ID de la acción (del Developer Portal)
  - `signal`: Datos adicionales opcionales
  - `verification_level`: Orb o Device

**Flujo estándar:**
```
Usuario hace click en botón → 
Mini App llama MiniKit.verify() → 
World App muestra drawer nativo → 
Usuario confirma → 
World App devuelve proof → 
Backend verifica proof
```

---

## 🎨 PROTOCOLO DE DISEÑO OBLIGATORIO

### Espaciados Estándar
| Elemento | Medida |
|----------|--------|
| Padding base | 24px |
| Header → Contenido | 16px |
| Entre secciones | 32px |
| Botones → Teclado | 24px |
| Tab bar → Bottom | 12px |

### Reglas de Oro
1. **Mobile-first obligatorio** - No footers, no sidebars, no scroll largo
2. **Navegación por tabs** - No menús hamburguesa
3. **Botones anclados** - CTAs siempre visibles
4. **Tiempos de carga** - Máximo 3s inicial, 1s subsecuente
5. **Usernames siempre** - Nunca mostrar wallet addresses

---

## 🛠️ HERRAMIENTAS OFICIALES

### UI Kit de Worldcoin
```bash
npm install @worldcoin/mini-apps-ui-kit-react
```

**Incluye:**
- Botones estandarizados
- Cards
- Inputs
- Modales
- Estados de carga
- Navegación

**Recursos:**
- Storybook: https://mini-apps-ui-kit.world.org
- NPM: https://www.npmjs.com/package/@worldcoin/mini-apps-ui-kit-react

⚠️ **Nota:** No auditado para seguridad, uso en producción desaconsejado hasta auditoría.

---

## 🔐 COMANDO VERIFY (ANTI-BOTS)

### Implementación Mínima

**Frontend:**
```typescript
import { MiniKit, VerifyCommandInput, VerificationLevel } from '@worldcoin/minikit-js'

const verifyPayload: VerifyCommandInput = {
  action: 'play-game', // Del Developer Portal
  verification_level: VerificationLevel.Orb,
}

const handleVerify = async () => {
  const {finalPayload} = await MiniKit.commandsAsync.verify(verifyPayload)
  
  if (finalPayload.status === 'error') return
  
  // Enviar a backend para verificar
  await fetch('/api/verify', {
    method: 'POST',
    body: JSON.stringify({ payload: finalPayload, action: 'play-game' }),
  })
}
```

**Backend:**
```typescript
import { verifyCloudProof } from '@worldcoin/minikit-js'

export async function POST(req: NextRequest) {
  const { payload, action } = await req.json()
  const app_id = process.env.APP_ID as `app_${string}`
  
  const verifyRes = await verifyCloudProof(payload, app_id, action)
  
  if (verifyRes.success) {
    // Usuario verificado ✅
    return NextResponse.json({ status: 200 })
  }
  
  return NextResponse.json({ status: 400 })
}
```

---

## 📱 OPTIMIZACIONES iOS

### Prevenir Scroll Bounce
```css
html, body {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
  overflow: scroll;
}
```

### Safe Areas
- **24px** desde bottom bar de iOS para botones
- **12px** desde bottom bar para tabs/drawers

---

## 🌍 LOCALIZACIÓN PRIORITARIA

1. **Español** ⭐ (Prioritario para México)
2. Inglés
3. Portugués
4. Tailandés
5. Japonés
6. Coreano

**Implementación:**
- Next.js Internationalization
- Header `Accept-Language`

---

## 🚫 RESTRICCIONES IMPORTANTES

### Prohibido:
- ❌ Usar término "official" en nombre/descripción
- ❌ Usar logo de World o versiones modificadas
- ❌ Juegos basados en azar (chance-based)
- ❌ Memberships que otorgan yield/returns
- ❌ Token pre-sales
- ❌ Mostrar wallet addresses (usar usernames)

### Requerido:
- ✅ App icon cuadrado con fondo no blanco
- ✅ Content card 345x240px (94px inferiores libres)
- ✅ Carga inicial < 3 segundos
- ✅ Feedback visual en todas las cargas

---

## 🎮 APLICACIÓN A LOTERÍA MEXICANA

### Cambios Necesarios:

#### 1. Instalar UI Kit
```bash
npm install @worldcoin/mini-apps-ui-kit-react
```

#### 2. Implementar Verify antes de jugar
- Crear acción "play-loteria" en Developer Portal
- Botón "Verificar Identidad" antes de "Iniciar Juego"
- Backend para verificar proof
- Prevenir juego sin verificación (anti-bots)

#### 3. Ajustar Espaciados
- Padding 24px en contenedores
- 32px entre secciones
- Anclar botón "Iniciar Juego"

#### 4. Prevenir Scroll Bounce iOS
- Agregar CSS específico

#### 5. Optimizar Carga
- Lazy loading de Konva.js
- Optimizar bundle
- Medir performance

#### 6. Crear Assets
- App icon cuadrado
- Content card 345x240px

#### 7. Localización
- Español (prioritario)
- Inglés

---

## 📊 MÉTRICAS DE ÉXITO

### Performance
- ⏱️ Carga inicial: < 3s
- ⏱️ Acciones: < 1s
- 📱 Funciona en gama baja

### Notificaciones (Fase posterior)
- 🎯 Open rate objetivo: 25%
- 🏅 Badge en home: 15% open rate (7 días)

### Engagement
- 🎮 Usuarios verificados vs no verificados
- 🏆 Partidas completadas
- 🔄 Retención día 1, 7, 30

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

### Sesión Actual (Fase 2):

1. **Instalar dependencias**
   ```bash
   npm install @worldcoin/mini-apps-ui-kit-react
   ```

2. **Crear acción en Developer Portal**
   - Nombre: "play-loteria"
   - Tipo: Incognito Action
   - Nivel: Orb

3. **Implementar Verify**
   - Componente `VerifyButton`
   - Endpoint `/api/verify`
   - Integrar en flujo de juego

4. **Ajustar espaciados**
   - Revisar `page.tsx`
   - Revisar `game/page.tsx`
   - Aplicar protocolo de 24px/32px

5. **CSS para iOS**
   - Agregar en `globals.css`

6. **Medir performance**
   - Lighthouse
   - Identificar cuellos de botella

---

## 📚 DOCUMENTACIÓN COMPLETA

Ver archivo completo: `manual/Protocolo-Worldcoin-UI.md`

**Fuentes oficiales:**
- https://docs.world.org/mini-apps/guidelines/design-guidelines
- https://docs.world.org/mini-apps/guidelines/app-guidelines
- https://docs.worldcoin.org/mini-apps/commands/verify
- https://mini-apps-ui-kit.world.org

---

## ✅ CHECKLIST RÁPIDO

- [ ] UI Kit instalado
- [ ] Comando Verify implementado
- [ ] Espaciados según protocolo (24px/32px)
- [ ] Scroll bounce iOS prevenido
- [ ] Botones anclados (no en scroll)
- [ ] Usernames en lugar de addresses
- [ ] Carga < 3s
- [ ] Feedback visual en cargas
- [ ] App icon cuadrado
- [ ] Content card 345x240px
- [ ] Localización español
- [ ] No usa término "official"
- [ ] No usa logo de World
