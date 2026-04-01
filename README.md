# Loteria Mexica by Jalapeño

## Crear una Mini App

Las [Mini apps](https://docs.worldcoin.org/mini-apps) permiten a desarrolladores externos crear aplicaciones similares a las nativas dentro de World App.

Esta plantilla es una forma de comenzar rápidamente con autenticación y ejemplos de algunos de los comandos más complicados.

## Comenzando

1. cp .env.example .env.local
2. Sigue las instrucciones en el archivo .env.local
3. Ejecuta `npm run dev`
4. Ejecuta `ngrok http 3000`
5. Ejecuta `npx auth secret` para actualizar el `AUTH_SECRET` en el archivo .env.local
6. Agrega tu dominio a `allowedDevOrigins` en el archivo next.config.ts
7. [Para Pruebas] Si estás usando un proxy como ngrok, necesitas actualizar el `AUTH_URL` en el archivo .env.local con tu url de ngrok
8. Continúa en developer.worldcoin.org y asegúrate de que tu app esté conectada a la url correcta de ngrok
9. [Opcional] Para que Verify y Send Transaction funcionen necesitas hacer más configuración en el portal de desarrolladores. Los pasos están descritos en los archivos de componentes respectivos.

## Autenticación

Este kit de inicio usa [Minikit's](https://github.com/worldcoin/minikit-js) wallet auth para autenticar usuarios, y [next-auth](https://authjs.dev/getting-started) para gestionar sesiones.

## Librería de UI

Este kit de inicio usa [Mini Apps UI Kit](https://github.com/worldcoin/mini-apps-ui-kit) para estilizar la app. Recomendamos usar el UI kit para asegurarte de cumplir con [el sistema de diseño de World App](https://docs.world.org/mini-apps/design/app-guidelines).

## Eruda

[Eruda](https://github.com/liriliri/eruda) es una herramienta que te permite inspeccionar la consola mientras construyes como una mini app. Deberías deshabilitarlo en producción.

## Contribuciones

Esta plantilla fue hecha con ayuda del increíble equipo de [supercorp-ai](https://github.com/supercorp-ai).
