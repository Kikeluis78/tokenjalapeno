# Jalapeño Lottery - Mini App de Lotería Mexicana 🌶️

Mini App de lotería mexicana integrada con World ID para el ecosistema World App.

## 🚀 Estado del Proyecto

**Última actualización**: 05 de abril de 2026

Ver [Estado-Proyecto.md](./manual/Estado-Proyecto.md) para detalles completos.

## 📦 Stack Tecnológico

- **Framework**: Next.js 16.1.6 (App Router + Turbopack)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui
- **Estado**: Zustand
- **Animaciones**: Framer Motion
- **Monorepo**: Turborepo
- **Gestor de paquetes**: npm
- **Deploy**: Vercel

## 🏗️ Estructura del Proyecto

```
Loteria Mexicana/
├── apps/
│   └── web/              # Next.js App Principal
├── packages/
│   └── ui/               # Componentes UI compartidos
└── manual/               # Documentación
```

## 🛠️ Desarrollo Local

### Requisitos Previos

- Node.js >= 24
- npm (incluido con Node.js)
- Git

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/Kikeluis78/tokenjalapeno.git
cd tokenjalapeno

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

## 📝 Scripts Disponibles

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Construir para producción
npm run lint       # Ejecutar linter
npm run format     # Formatear código con Prettier
npm run typecheck  # Verificar tipos de TypeScript
```

## 🎨 Agregar Componentes UI

Para agregar componentes de shadcn/ui:

```bash
npx shadcn@latest add button -c apps/web
```

Los componentes se colocarán en `packages/ui/src/components/`

## 📖 Usar Componentes

```tsx
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  return <Button>Click me</Button>;
}
```

## 🌐 Despliegue

El proyecto se despliega automáticamente en Vercel cuando se hace push a la rama `main`.

**URL de producción**: Por configurar

## 📚 Documentación

- [Protocolo de Desarrollo](./manual/Protocolo-Desarrollo.md) - Guía completa de desarrollo
- [Estado del Proyecto](./manual/Estado-Proyecto.md) - Estado actual y tareas pendientes

## 🔗 Enlaces Útiles

- **Repositorio**: https://github.com/Kikeluis78/tokenjalapeno
- **World Docs**: https://docs.world.org
- **Developer Portal**: https://developer.worldcoin.org

## 📄 Licencia

MIT

---

# Update dom 05 abr 2026 21:36:00 CST
