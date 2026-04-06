# Protocolo de UI de Worldcoin para Mini Apps

## Fuente
Documentación oficial: https://docs.world.org/mini-apps/guidelines/

---

## 1. PRINCIPIOS MOBILE-FIRST

Las Mini Apps son inherentemente móviles. La UI debe verse y sentirse como una app móvil nativa.

### Consideraciones clave:
- ✅ Usar navegación por pestañas (tabs) para simplificar movimiento
- ✅ Implementar text boxes con snap-to para input fácil
- ✅ Evitar footers, sidebars y scroll excesivo
- ✅ Navegación clara y directa sin menús hamburguesa
- ✅ Transiciones suaves entre pantallas
- ✅ Colores de fondo consistentes
- ✅ Fuentes optimizadas para móvil
- ✅ Elementos UI responsivos
- ❌ NO usar scroll largo
- ❌ NO usar footers fijos
- ❌ NO usar sidebars

---

## 2. SISTEMA DE ESPACIADO (GRID & SPACING)

### Padding Base
- **24px** - Padding por defecto para todos los elementos
- Proporciona espacio de respiración alrededor de elementos

### Espaciado entre elementos:
- **16px** - Entre header y contenido asociado
- **16px** - Entre elementos dentro de una sección
- **24px** - Entre barra de búsqueda y contenido
- **24px** - Entre header y sección con sub-headline
- **32px** - Entre secciones distintas
- **32px** - Entre último item scrollable y bottom bar

### Páginas secundarias:
- **24px** - Entre header y contenido
- **32px** - Entre header y título secundario
- **12px** - Entre título secundario y descripción

---

## 3. NAVEGACIÓN Y BARRAS

### Navigation Bar
- Contenido personalizable excepto controles de Mini App (esquina superior derecha)
- Evitar conflictos de interacción con controles nativos
- Asegurar que elementos interactivos sean fáciles de operar

### Tab Bar (Android vs iOS)
- **12px** de espacio desde el bottom bar de iOS/Android
- Asegura accesibilidad óptima y área de tap cómoda

### Bottom Safe Area
- **24px** de espacio desde el bottom bar de iOS
- Asegura accesibilidad óptima para botones

---

## 4. COMPONENTES MODALES

### Drawers / Sheets (Android vs iOS)
- **12px** de espacio desde el bottom bar
- Asegura accesibilidad y área de tap cómoda
- **Uso principal:** Comandos de verificación (Verify)

### Toasts (Android vs iOS)
- Centrado horizontalmente
- Posicionado directamente debajo del header
- Asegura visibilidad sin interrumpir interacción

---

## 5. KEYBOARD HANDLING

### Cuando el teclado está activo:
- **24px** de espacio entre botones y teclado activo
- Previene taps accidentales
- Mantiene botones visualmente distintos y accesibles

---

## 6. ESTADOS VISUALES

### Alineación
- **Middle alignment** para consistencia en todos los tamaños de pantalla
- Especialmente efectivo para:
  - Empty states
  - Loading indicators
  - Estados transitorios

---

## 7. PROTOCOLO DE VERIFICACIÓN (VERIFY COMMAND)

### Uso del comando Verify
El comando `verify` es crucial para verificación de identidad humana única.

**Caso de uso:** Aplicaciones que requieren verificación de usuario para acceder a funciones (ej: juegos sin bots)

### Implementación del botón de verificación:

```typescript
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'

const verifyPayload: VerifyCommandInput = {
  action: 'voting-action', // ID de acción del Developer Portal
  signal: '0x12312', // Datos adicionales opcionales
  verification_level: VerificationLevel.Orb, // Orb | Device
}

const handleVerify = async () => {
  if (!MiniKit.isInstalled()) return
  
  // World App abre un drawer para confirmar
  const {finalPayload} = await MiniKit.commandsAsync.verify(verifyPayload)
  
  if (finalPayload.status === 'error') {
    return console.log('Error payload', finalPayload)
  }

  // Verificar la prueba en el backend
  const verifyResponse = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payload: finalPayload as ISuccessResult,
      action: 'voting-action',
      signal: '0x12312',
    }),
  })

  const verifyResponseJson = await verifyResponse.json()
  if (verifyResponseJson.status === 200) {
    console.log('Verification success!')
  }
}
```

### Verificación en Backend:

```typescript
// app/api/verify/route.ts
import { verifyCloudProof, IVerifyResponse, ISuccessResult } from '@worldcoin/minikit-js'

export async function POST(req: NextRequest) {
  const { payload, action, signal } = await req.json()
  const app_id = process.env.APP_ID as `app_${string}`
  
  const verifyRes = await verifyCloudProof(payload, app_id, action, signal)

  if (verifyRes.success) {
    // Marcar usuario como "verificado" en base de datos
    return NextResponse.json({ verifyRes, status: 200 })
  } else {
    // Manejar errores (usuario ya verificado, etc.)
    return NextResponse.json({ verifyRes, status: 400 })
  }
}
```

### Drawer de Verificación
- World App muestra un drawer nativo
- Usuario confirma o cancela la operación
- Diseño consistente en todas las Mini Apps
- **NO personalizable** - es parte del sistema de World App

---

## 8. UI KIT OFICIAL

### Instalación:
```bash
npm install @worldcoin/mini-apps-ui-kit-react
```

### Recursos:
- **Package README:** https://www.npmjs.com/package/@worldcoin/mini-apps-ui-kit-react
- **Storybook:** https://mini-apps-ui-kit.world.org

### Componentes disponibles:
El UI Kit proporciona componentes pre-construidos que siguen las guías de diseño de World:
- Botones
- Inputs
- Cards
- Modales
- Navegación
- Estados de carga

**⚠️ Nota de seguridad:** Esta librería no ha sido auditada para vulnerabilidades de seguridad. Uso en producción desaconsejado hasta completar auditoría.

---

## 9. PATRONES DE DISEÑO RECOMENDADOS

### Autenticación
- Siempre mostrar **username** en lugar de wallet address
- Usar comando "Verify" para confirmar acciones importantes

### Address Book
- Vincular wallet addresses a usernames reconocibles
- Nunca mostrar direcciones crudas al usuario

### Contenido
- **Una tarea clara por página**
- **Mantener CTAs visibles** (no ocultos en scroll)
- **Minimizar scroll innecesario**
- **Priorizar acciones primarias**

---

## 10. TIEMPOS DE CARGA

### Objetivos:
- **2-3 segundos máximo** para carga inicial
- **Menos de 1 segundo** para acciones subsecuentes
- Siempre proporcionar feedback visual durante carga

---

## 11. SCROLL BOUNCE EN iOS

### Prevenir bounce error:

**Opción 1 (sin scroll):**
```css
html, body {
  width: 100vw;
  height: 100vh;
  overscroll-behavior: none;
  overflow: hidden;
}
```

**Opción 2 (con scroll):**
```css
html, body {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
  overflow: scroll;
}
```

---

## 12. LOCALIZACIÓN

### Idiomas prioritarios:
1. Inglés
2. Español
3. Tailandés
4. Japonés
5. Coreano
6. Portugués

### Implementación:
- Usar header `Accept-Language`
- Para Next.js: usar [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

---

## 13. BRANDING

### Restricciones:
- ❌ NO usar el término "official" en nombre o descripción
- ❌ NO usar el logo de World o versiones modificadas
- ✅ Mantener identidad de marca propia
- ✅ Integrar con el ecosistema de World

---

## 14. APP ICON & CONTENT CARD

### App Icon:
- Imagen **cuadrada**
- Fondo **no blanco**

### Content Card:
- Tamaño: **345x240 px**
- Evitar texto dentro de la imagen
- Mantener **94px inferiores libres** (área de overlay)
- Exportar como PNG a escala 3x
- Sin border radius
- Sin metadata

---

## RESUMEN DE ESPACIADOS CLAVE

| Elemento | Espaciado |
|----------|-----------|
| Padding base | 24px |
| Header → Contenido | 16px |
| Elementos en sección | 16px |
| Entre secciones | 32px |
| Botones → Teclado | 24px |
| Tab bar → Bottom | 12px |
| Drawer → Bottom | 12px |
| Botones → iOS Bottom | 24px |

---

## CHECKLIST DE IMPLEMENTACIÓN

- [ ] Padding de 24px en todos los contenedores principales
- [ ] Navegación por tabs (no hamburger menu)
- [ ] Botones anclados (no en scroll)
- [ ] Espaciado de 32px entre secciones
- [ ] Prevenir scroll bounce en iOS
- [ ] Tiempos de carga < 3s inicial
- [ ] Feedback visual en todas las cargas
- [ ] Usar usernames (no wallet addresses)
- [ ] Implementar comando Verify para acciones críticas
- [ ] Usar UI Kit oficial de Worldcoin
- [ ] Localización en español (mínimo)
- [ ] App icon cuadrado con fondo no blanco
- [ ] Content card 345x240px con 94px inferiores libres
