# 🎨 Assets para Producción - Lotería Mexicana by Jalapeño

## 📋 Checklist de Assets Necesarios

### 🎵 Audio (Prioridad ALTA)

#### Cantador Tradicional
- [ ] **55 archivos de audio** - Uno por cada carta
  - Formato: `.mp3` o `.ogg` (compatibilidad web)
  - Duración: 2-4 segundos cada uno
  - Calidad: 128kbps mínimo
  - Voz: Tradicional mexicana, clara y festiva
  - Ejemplo: `el-gallo.mp3`, `la-dama.mp3`, etc.
  - Ubicación sugerida: `/public/audio/cards/`

#### Efectos de Sonido
- [ ] **victoria.mp3** - Sonido de celebración cuando gana el jugador
- [ ] **derrota.mp3** - Sonido cuando gana la máquina
- [ ] **marca-carta.mp3** - Sonido al marcar una carta
- [ ] **carta-cantada.mp3** - Sonido de campana/tambor al cantar carta
- [ ] **ambiente-feria.mp3** - Audio de fondo opcional (loop)
- [ ] **confeti.mp3** - Sonido de confeti al ganar
- Ubicación sugerida: `/public/audio/effects/`

#### Música de Fondo
- [ ] **menu-music.mp3** - Música para el menú principal
- [ ] **game-music.mp3** - Música durante el juego (opcional, sutil)
- Ubicación sugerida: `/public/audio/music/`

---

### 🖼️ Imágenes (Prioridad MEDIA)

#### Cartas de Lotería
- [ ] **55 imágenes de cartas** en alta calidad
  - Formato: `.png` con transparencia o `.webp`
  - Tamaño: 400x600px mínimo
  - Estilo: Tradicional mexicano con colores vibrantes
  - Incluir: El Jalapeño (carta especial)
  - Ubicación sugerida: `/public/images/cards/`

#### Fondos y Texturas
- [ ] **fondo-tablero.png** - Textura para el tablero del jugador
- [ ] **fondo-juego.jpg** - Fondo principal del área de juego
- [ ] **patron-mexicano.png** - Patrón decorativo para headers
- [ ] **textura-madera.jpg** - Textura opcional para tableros
- Ubicación sugerida: `/public/images/backgrounds/`

#### Logos e Iconos
- [ ] **logo-jalapeno.png** - Logo principal (512x512px)
- [ ] **logo-jalapeno-small.png** - Logo pequeño (128x128px)
- [ ] **favicon.ico** - Favicon del sitio
- [ ] **icon-192.png** - PWA icon (192x192px)
- [ ] **icon-512.png** - PWA icon (512x512px)
- [ ] **og-image.png** - Imagen para redes sociales (1200x630px)
- Ubicación sugerida: `/public/images/branding/`

#### Elementos UI
- [ ] **boton-marca.png** - Icono de marca/frijol para cartas marcadas
- [ ] **confeti-particulas.png** - Sprites de confeti
- [ ] **estrella-victoria.png** - Estrella de celebración
- [ ] **trofeo.png** - Trofeo para pantalla de victoria
- Ubicación sugerida: `/public/images/ui/`

---

### 🎬 Animaciones (Prioridad BAJA)

#### Lottie Animations
- [ ] **confeti-explosion.json** - Animación de confeti al ganar
- [ ] **carta-flip.json** - Animación de volteo de carta
- [ ] **loading-spinner.json** - Spinner de carga
- [ ] **victoria-celebration.json** - Celebración completa
- Ubicación sugerida: `/public/animations/`

#### GIFs/Videos
- [ ] **tutorial.mp4** - Video corto explicando cómo jugar
- [ ] **demo-gameplay.gif** - GIF demostrativo para landing
- Ubicación sugerida: `/public/videos/`

---

### 🎨 Fuentes Tipográficas (Prioridad MEDIA)

#### Fuentes Personalizadas
- [ ] **Fuente Display** - Para títulos (estilo mexicano festivo)
  - Sugerencia: "Chango", "Bungee", "Fredoka One"
  - Formato: `.woff2` y `.woff`
  
- [ ] **Fuente Body** - Para texto general (legible)
  - Sugerencia: "Nunito", "Poppins", "Inter"
  - Formato: `.woff2` y `.woff`

- Ubicación sugerida: `/public/fonts/`

---

### 📱 Assets para World App (Prioridad ALTA)

#### Metadatos
- [ ] **app-icon.png** - Icono de la mini app (512x512px)
- [ ] **splash-screen.png** - Pantalla de carga (1125x2436px)
- [ ] **preview-image.png** - Imagen de preview en World App (800x600px)

#### Configuración
- [ ] Actualizar `manifest.json` con iconos correctos
- [ ] Configurar `theme-color` en meta tags
- [ ] Agregar `apple-touch-icon`

---

## 🎯 Paleta de Colores Jalapeño (Referencia)

```css
/* Colores principales */
--jalapeno-red: #DC2626;      /* Rojo principal */
--jalapeno-orange: #EA580C;   /* Naranja */
--jalapeno-yellow: #FBBF24;   /* Amarillo */
--jalapeno-green: #16A34A;    /* Verde */

/* Colores secundarios */
--bg-cream: #FEF3C7;          /* Crema/Amarillo claro */
--bg-orange: #FED7AA;         /* Naranja claro */
--text-dark: #1F2937;         /* Texto oscuro */
--text-light: #6B7280;        /* Texto claro */

/* Gradientes */
--gradient-header: linear-gradient(to right, #DC2626, #EA580C, #FBBF24);
--gradient-bg: linear-gradient(to bottom right, #FEF3C7, #FED7AA, #FEE2E2);
--gradient-game: linear-gradient(to bottom right, #15803D, #16A34A, #22C55E);
```

---

## 📦 Estructura de Carpetas Sugerida

```
public/
├── audio/
│   ├── cards/
│   │   ├── el-gallo.mp3
│   │   ├── la-dama.mp3
│   │   └── ... (55 archivos)
│   ├── effects/
│   │   ├── victoria.mp3
│   │   ├── marca-carta.mp3
│   │   └── ...
│   └── music/
│       ├── menu-music.mp3
│       └── game-music.mp3
├── images/
│   ├── cards/
│   │   ├── el-gallo.png
│   │   ├── la-dama.png
│   │   └── ... (55 archivos)
│   ├── backgrounds/
│   │   ├── fondo-tablero.png
│   │   └── patron-mexicano.png
│   ├── branding/
│   │   ├── logo-jalapeno.png
│   │   └── favicon.ico
│   └── ui/
│       ├── boton-marca.png
│       └── trofeo.png
├── animations/
│   ├── confeti-explosion.json
│   └── carta-flip.json
├── fonts/
│   ├── display-font.woff2
│   └── body-font.woff2
└── videos/
    └── tutorial.mp4
```

---

## 🔧 Herramientas Recomendadas

### Para Audio
- **Audacity** - Edición de audio gratuita
- **Freesound.org** - Efectos de sonido gratuitos
- **Epidemic Sound** - Música libre de derechos (pago)
- **ElevenLabs** - Generación de voz con IA

### Para Imágenes
- **Figma** - Diseño de UI/UX
- **Canva** - Diseño rápido de assets
- **DALL-E / Midjourney** - Generación de imágenes con IA
- **TinyPNG** - Compresión de imágenes
- **Squoosh** - Optimización de imágenes web

### Para Animaciones
- **LottieFiles** - Animaciones JSON
- **After Effects** - Animaciones profesionales
- **Rive** - Animaciones interactivas

### Para Fuentes
- **Google Fonts** - Fuentes gratuitas
- **Font Squirrel** - Generador de @font-face
- **DaFont** - Fuentes temáticas

---

## 🚀 Optimización para Producción

### Compresión de Audio
```bash
# Convertir a MP3 optimizado
ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k output.mp3

# Convertir a OGG (alternativa)
ffmpeg -i input.wav -codec:a libvorbis -q:a 4 output.ogg
```

### Compresión de Imágenes
```bash
# Optimizar PNG
pngquant --quality=65-80 input.png -o output.png

# Convertir a WebP
cwebp -q 80 input.png -o output.webp
```

### Lazy Loading
- Implementar carga diferida de imágenes
- Precargar solo assets críticos
- Usar placeholders mientras cargan

---

## 📊 Prioridades de Implementación

### Fase 1 - MVP (Mínimo Viable)
1. ✅ Audio del cantador (55 archivos)
2. ✅ Efectos de sonido básicos (victoria, marca)
3. ✅ Logo y favicon
4. ✅ Iconos para World App

### Fase 2 - Mejoras Visuales
1. Imágenes de cartas en alta calidad
2. Fondos y texturas
3. Fuentes personalizadas
4. Animaciones básicas

### Fase 3 - Pulido Final
1. Animaciones Lottie
2. Video tutorial
3. Música de fondo
4. Efectos visuales avanzados

---

## 💡 Recursos Gratuitos

### Audio
- [Freesound](https://freesound.org/) - Efectos de sonido
- [Incompetech](https://incompetech.com/) - Música libre
- [Zapsplat](https://www.zapsplat.com/) - Efectos y música

### Imágenes
- [Unsplash](https://unsplash.com/) - Fotos de alta calidad
- [Pexels](https://www.pexels.com/) - Fotos y videos
- [Flaticon](https://www.flaticon.com/) - Iconos

### Fuentes
- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)
- [DaFont](https://www.dafont.com/)

### Animaciones
- [LottieFiles](https://lottiefiles.com/) - Animaciones gratuitas
- [Lordicon](https://lordicon.com/) - Iconos animados

---

## ✅ Checklist Final Pre-Lanzamiento

- [ ] Todos los audios funcionan correctamente
- [ ] Imágenes optimizadas y cargando rápido
- [ ] Fuentes cargadas correctamente
- [ ] Animaciones fluidas en móviles
- [ ] Assets comprimidos para web
- [ ] Fallbacks para assets faltantes
- [ ] Lazy loading implementado
- [ ] Cache de assets configurado
- [ ] PWA icons configurados
- [ ] OG images para redes sociales
- [ ] Favicon visible en todos los navegadores
- [ ] Performance score > 90 en Lighthouse

---

*Documento creado: 30 de Marzo, 2026*
*Versión: 1.0*
*Proyecto: Lotería Mexicana by Jalapeño*
