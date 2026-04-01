# 🧹 Limpieza del Proyecto

## ✅ Completado

### `/public` - LIMPIO
- ❌ Eliminados: `vercel.svg`, `next.svg`, `file.svg`, `globe.svg`, `window.svg`
- ✅ Creadas carpetas:
  - `images/jalapeno/` - Para mascota
  - `images/lottery/` - Para assets de lotería
  - `images/icons/` - Para iconos de tiers

---

## 🔒 NO TOCAR (Regla de Oro)

### `/src/auth/` - MANTENER TODO
- `index.ts` - Configuración de autenticación
- `wallet/` - Helpers de wallet
  - `index.ts`
  - `server-helpers.ts`
  - `client-helpers.ts`

### `/src/components/AuthButton/` - MANTENER
- `index.tsx` - Botón de autenticación

### `/src/providers/` - MANTENER
- `index.tsx` - Providers principales
- `Eruda/` - Herramienta de debug

### `/src/app/api/auth/` - MANTENER
- `[...nextauth]/` - Next-auth routes

### `/src/app/api/verify-proof/` - MANTENER
- `route.ts` - Verificación de World ID

---

## 🗑️ A ELIMINAR/MODIFICAR

### Componentes de Ejemplo (Eliminar)
- ❌ `/src/components/Pay/` - Ejemplo de pago
- ❌ `/src/components/Transaction/` - Ejemplo de transacción
- ❌ `/src/components/Verify/` - Ejemplo de verificación
- ❌ `/src/components/ViewPermissions/` - Ejemplo de permisos

### Componentes a Mantener pero Modificar
- ✏️ `/src/components/UserInfo/` - Modificar para mostrar info de lotería
- ✏️ `/src/components/Navigation/` - Modificar para navegación de lotería
- ✏️ `/src/components/PageLayout/` - Mantener como base

### Páginas
- ✏️ `/src/app/page.tsx` - Reemplazar con landing de lotería
- ✏️ `/src/app/(protected)/home/page.tsx` - Reemplazar con dashboard de lotería
- ❌ `/src/app/api/initiate-payment/` - Eliminar (no necesario)

### Otros
- ❌ `/src/abi/TestContract.json` - Eliminar (reemplazar con nuestros contratos)

---

## 📁 Nueva Estructura Propuesta

```
src/
├── auth/                    ✅ MANTENER
├── providers/               ✅ MANTENER
├── abi/
│   ├── JalapenoToken.json      🆕 CREAR
│   ├── JalapenoLottery.json    🆕 CREAR
│   └── JalapenoAirdrop.json    🆕 CREAR
├── components/
│   ├── AuthButton/          ✅ MANTENER
│   ├── UserInfo/            ✏️ MODIFICAR
│   ├── Navigation/          ✏️ MODIFICAR
│   ├── PageLayout/          ✅ MANTENER
│   ├── lottery/             🆕 CREAR
│   │   ├── TicketSelector.tsx
│   │   ├── BuyTicketButton.tsx
│   │   ├── TicketCard.tsx
│   │   └── DrawResults.tsx
│   ├── airdrop/             🆕 CREAR
│   │   ├── ClaimButton.tsx
│   │   └── TierDisplay.tsx
│   └── ui/                  🆕 CREAR
│       ├── JalapenoMascot.tsx
│       └── Button.tsx
├── lib/                     🆕 CREAR
│   ├── contracts.ts         # Helpers para contratos
│   ├── worldid.ts           # Helpers para World ID
│   └── utils.ts             # Utilidades generales
└── app/
    ├── api/
    │   ├── auth/            ✅ MANTENER
    │   └── verify-proof/    ✅ MANTENER
    ├── page.tsx             ✏️ MODIFICAR (Landing)
    ├── lottery/             🆕 CREAR
    │   └── page.tsx
    ├── my-tickets/          🆕 CREAR
    │   └── page.tsx
    ├── airdrop/             🆕 CREAR
    │   └── page.tsx
    └── results/             🆕 CREAR
        └── page.tsx
```

---

## 🎯 Próximos Pasos

### Paso 1: Eliminar Componentes de Ejemplo
```bash
rm -rf src/components/Pay
rm -rf src/components/Transaction
rm -rf src/components/Verify
rm -rf src/components/ViewPermissions
rm -rf src/app/api/initiate-payment
rm src/abi/TestContract.json
```

### Paso 2: Crear Estructura Base
```bash
mkdir -p src/components/lottery
mkdir -p src/components/airdrop
mkdir -p src/components/ui
mkdir -p src/lib
mkdir -p src/app/lottery
mkdir -p src/app/my-tickets
mkdir -p src/app/airdrop
mkdir -p src/app/results
```

### Paso 3: Crear Página Landing Simple
- Reemplazar `src/app/page.tsx` con landing de Jalapeño Lottery
- Mostrar mascota Jalapeño
- Botón "Jugar Lotería"
- Botón "Conectar Wallet" (AuthButton)

### Paso 4: Crear Componentes Base
- `JalapenoMascot.tsx` - Mascota animada
- `Button.tsx` - Botón reutilizable
- `TicketSelector.tsx` - Selector de números

---

## 📊 Checklist de Limpieza

- [x] Limpiar `/public`
- [x] Crear estructura de assets
- [ ] Eliminar componentes de ejemplo
- [ ] Eliminar APIs no necesarias
- [ ] Crear estructura de carpetas nueva
- [ ] Modificar página principal
- [ ] Crear componentes base de lotería

---

**Estado**: En progreso
**Última actualización**: 2026-03-25
