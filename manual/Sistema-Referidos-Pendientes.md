# Sistema de Referidos - Pendientes

## Funcionalidad Backend (TODO)

### 1. Generación de Código Único
- [ ] Generar código único por usuario al registrarse
- [ ] Formato: `JAL-XXXXXX` (6 caracteres alfanuméricos)
- [ ] Almacenar en base de datos (tabla `users`)
- [ ] Verificar unicidad del código

### 2. Validación de Código
- [ ] Endpoint: `POST /api/referral/validate`
- [ ] Verificar que el código existe
- [ ] Verificar que no sea el propio código del usuario
- [ ] Verificar que el usuario no haya usado código antes (una sola vez por usuario)
- [ ] Retornar error específico para cada caso

### 3. Recompensas
- [ ] Al validar código exitosamente:
  - [ ] Agregar 100 jalapeños al usuario que ingresó el código
  - [ ] Agregar 100 jalapeños al dueño del código (referidor)
  - [ ] Actualizar balance en `jalapenoBalance`
  - [ ] Registrar transacción en tabla `transactions`

### 4. Base de Datos
```sql
-- Tabla users (agregar campos)
ALTER TABLE users ADD COLUMN referral_code VARCHAR(10) UNIQUE;
ALTER TABLE users ADD COLUMN referred_by VARCHAR(10);
ALTER TABLE users ADD COLUMN has_used_referral BOOLEAN DEFAULT FALSE;

-- Tabla referrals (nueva)
CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER REFERENCES users(id),
  referred_id INTEGER REFERENCES users(id),
  reward_amount INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Endpoints Necesarios
- [ ] `GET /api/referral/code` - Obtener código del usuario
- [ ] `POST /api/referral/validate` - Validar y aplicar código
- [ ] `GET /api/referral/stats` - Estadísticas de referidos

### 6. Reglas de Negocio
- Un usuario solo puede usar un código de referido una vez
- No se puede usar el propio código
- Ambos usuarios deben estar verificados con World ID
- Recompensa: 100 jalapeños para cada uno

### 7. Seguridad
- [ ] Rate limiting (máximo 5 intentos por hora)
- [ ] Validar autenticación del usuario
- [ ] Prevenir fraude (múltiples cuentas)
- [ ] Logs de todas las transacciones

## Integración con Smart Contract
- [ ] Registrar referidos on-chain (opcional)
- [ ] Mint tokens al validar referido
- [ ] Evento `ReferralUsed(address referrer, address referred, uint256 reward)`

## UI Mejoras Futuras
- [ ] Mostrar contador de referidos exitosos
- [ ] Historial de referidos
- [ ] Ranking de referidores
- [ ] Compartir código por redes sociales
