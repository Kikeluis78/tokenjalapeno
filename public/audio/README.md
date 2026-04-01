# 🔊 Sistema de Audio - Lotería Mexicana

## Estado Actual

### ✅ Implementado
- **Text-to-Speech**: Voz del navegador en español mexicano
- **Efectos Web Audio API**: Sonidos de victoria generados
- **Hook useAudio**: Sistema modular para manejar audio
- **Integración completa**: Audio se reproduce automáticamente

### 🎵 Funcionalidades
1. **Audio de cartas**: Cada carta se "canta" con voz mexicana
2. **Efectos de juego**: 
   - Inicio de juego
   - Marcar carta
   - Victoria (melodía generada)
3. **Indicador visual**: 🔊 Audio con animación

### 📁 Estructura de Archivos
```
public/
  audio/
    cards/          ← Para archivos MP3 futuros
    effects/        ← Para efectos de sonido
src/
  hooks/
    useAudio.ts     ← Hook principal de audio
  utils/
    audioMap.ts     ← Mapeo de cartas a archivos
```

## 🚀 Próximos Pasos

### Para Audio Profesional
1. Grabar voces mexicanas tradicionales
2. Reemplazar Text-to-Speech con archivos MP3
3. Agregar música de fondo opcional
4. Controles de volumen

### Archivos Necesarios (55 cartas + efectos)
- `/public/audio/cards/el-gallo.mp3`
- `/public/audio/cards/el-diablito.mp3`
- ... (53 más)
- `/public/audio/effects/loteria-victory.mp3`

## 🎯 Estado: FUNCIONAL
El audio ya funciona con Text-to-Speech del navegador.
Los usuarios escucharán cada carta cantada en español mexicano.

*Actualizado: 30 de Marzo, 2026*
