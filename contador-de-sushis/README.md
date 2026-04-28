# Contador de Sushis 🍣

App web hecha con **Next.js + TypeScript + Tailwind CSS** para contar cuántos sushis comiste.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

Instala todas las dependencias del proyecto.

## Desarrollo

```bash
npm run dev
```

Levanta la app en modo desarrollo (normalmente en `http://localhost:3000`).

## Build de producción

```bash
npm run build
```

Genera la versión optimizada para producción.

## Ejecutar build local

```bash
npm run start
```

Sirve la app usando el build generado.

## ¿Cómo probar LocalStorage?

1. Abrí la app y sumá algunos sushis.
2. Cerrá la pestaña.
3. Volvé a abrir la app.
4. El contador, récord, último sushi e historial deberían seguir igual.
5. Si abrís DevTools > Application > Local Storage, vas a ver estas claves:
   - `sushiCount`
   - `bestRecord`
   - `lastSushiTime`
   - `sushiHistory`

## ¿Cómo cambiar textos, colores y botones?

- **Textos principales**: `src/components/CounterDisplay.tsx`, `src/components/SushiControls.tsx`, `src/components/SushiStats.tsx`.
- **Frases por cantidad**: `getMessageByCount` en `src/hooks/useSushiCounter.ts`.
- **Colores y animaciones**: `tailwind.config.ts`.
- **Layout principal y orden de secciones**: `src/app/page.tsx`.

## Funciones incluidas

- Sumar +1 con botón principal.
- Sumar +1 tocando una zona grande.
- Restar 1 sin permitir negativos.
- Reiniciar con confirmación.
- Persistencia en LocalStorage.
- Estadísticas simples.
- Récord histórico automático.
- Historial de últimos 5 eventos.
- Botones extra: `+5` y `Modo atracón +10`.
