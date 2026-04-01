# Guía de Submisión de Mini Apps a World App - Loteria Mexica by Jalapeño

## Características Principales

- **Sin fricción**: Los usuarios ya tienen wallet conectada y saldo en USDC/WLD
- **Verificación humana**: Integración nativa con World ID para prevenir bots
- **Gas patrocinado**: World App cubre las comisiones de gas en World Chain
- **Pagos nativos**: Sistema integrado de pagos con USDC sin salir de la app

---

## 🛠️ Proceso para Subir una Mini App

### 1. Registro en el Developer Portal

Crear cuenta en el Developer Portal de World:

- Generar un `app_id` único para tu aplicación
- Configurar las acciones de verificación (Incognito Actions)
- Obtener credenciales de API

### 2. Desarrollo Técnico

**Stack recomendado:**
- Frontend: React/Next.js (templates oficiales disponibles)
- SDK: `@worldcoin/minikit-js` para interactuar con World App
- Backend: Node.js/Python para verificación de pruebas

**Instalación del SDK:**
```bash
npm install @worldcoin/minikit-js
```

**Componentes clave a implementar:**
- `MiniKitProvider` - Inicialización del SDK
- `verify` - Verificación World ID (opcional pero recomendado)
- `pay` - Pagos USDC integrados
- `sendTransaction` - Interacciones con smart contracts

### 3. Configuración de Acciones

En el Developer Portal debes configurar:

- **Acciones de verificación**: Define qué acciones requieren prueba de humanidad
- **Nivel de verificación**: Orb (máxima seguridad) o Device (nivel dispositivo)
- **Smart contracts**: Whitelist de contratos para interacciones seguras

### 4. Testing Local

**Herramientas necesarias:**
- ngrok: Para exponer tu localhost públicamente
- World App móvil: Para escanear QR de prueba
- Entorno staging: Para pruebas sin afectar producción

**Flujo de testing:**
1. Ejecutar tu app localmente (localhost:3000)
2. Crear túnel con ngrok (`ngrok http 3000`)
3. Configurar URL en el Developer Portal
4. Escanear QR desde World App para probar

### 5. Revisión y Aprobación

**Requisitos obligatorios para submitir:**

| Categoría | Requisitos |
|-----------|------------|
| **Técnico** | Integración activa con MiniKit o IDKit, sin bugs críticos |
| **Legal** | Cumplimiento de privacidad (consentimiento explícito, minimización de datos) |
| **Regulatorio** | Cumplimiento en todas las jurisdicciones donde se muestra la app |
| **UX** | Información completa y precisa en el portal, contacto actualizado |
| **Seguridad** | Smart contracts auditados (si aplica), manejo seguro de fondos |

**Proceso de review:**
1. Submitir a través del Developer Portal
2. El equipo de World revisa funcionalidad, seguridad y cumplimiento legal
3. Aprobación obligatoria antes de listado público
4. Tiempo de revisión variable según complejidad

---

## 💰 Programa de Recompensas para Desarrolladores

World lanzó un programa piloto de **$300,000 USD en WLD tokens** para incentivar desarrolladores:

| Detalle | Especificación |
|---------|----------------|
| **Duración** | 3 meses (inició abril 2025) |
| **Distribución** | Hasta $25,000 semanales para los mejores performers |
| **Métrica** | Engagement de usuarios verificados con World ID |
| **Objetivo** | Apps con "prueba de humanidad" sostenible |

**Tipos de apps con tracción actual:**
- 🎮 Juegos (los más populares)
- 🤖 Apps de IA/Asistentes
- 💰 Finanzas/Préstamos
- 🎁 Airdrops
- 💳 Pagos con WLD
- 📱 eSIM apps

---

## 📋 Checklist Pre-Submisión

Antes de enviar tu app, verifica:

- [ ] **Integración SDK**: MiniKit correctamente instalado e inicializado
- [ ] **Verificación**: Flujo de World ID funcionando (si aplica)
- [ ] **Pagos**: USDC/WLD payments testeados (si aplica)
- [ ] **Smart Contracts**: Whitelisteados en el portal (si aplica)
- [ ] **Testing**: App probada en dispositivo móvil real
- [ ] **Legal**: Política de privacidad y términos de servicio incluidos
- [ ] **Contacto**: Información de contacto actualizada en el portal
- [ ] **Descripción**: Metadata completa y precisa de la app

---

## 🔗 Recursos Oficiales

| Recurso | Enlace |
|---------|--------|
| Documentación oficial | docs.world.org |
| Developer Portal | developer.world.org |
| GitHub Templates | github.com/worldcoin/minikit-web3-example |
| Portal GitHub | github.com/worldcoin/developer-portal |
| Referencia API | docs.world.org/api-reference |

---

## ⚠️ Consideraciones Importantes

1. **Cumplimiento regulatorio**: World ha enfrentado restricciones en varios países por la recolección de datos biométricos. Tu app debe cumplir con regulaciones locales.

2. **Privacidad de datos**: Si recolectas datos de usuarios, debes obtener consentimiento explícito y minimizar la recolección.

3. **Sostenibilidad**: El enfoque actual es crear apps que generen valor real, no sistemas gamificables.

4. **World Chain**: Las transacciones ocurren en World Chain (L2 de Ethereum), con gas patrocinado para usuarios verificados.
