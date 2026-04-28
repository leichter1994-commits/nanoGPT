# Contador de Sushis 🍣

Mini app web pensada como **MVP real**: simple, rápida de usar en celular y lista para mostrar.

Stack:
- Next.js + TypeScript
- Tailwind CSS
- LocalStorage (sin backend)

---

## 1) ¿Qué hace la app?

Permite contar cuántas piezas de sushi comiste con una experiencia cómoda:

- Botón grande **“Comí un sushi 🍣”** (+1)
- Zona táctil grande para sumar rápido
- Botones extra **+5** y **Modo atracón +10**
- Botón **Restar 1** (nunca baja de 0)
- Reinicio con confirmación en modal
- Guardado automático en LocalStorage
- Estadísticas: total, frase dinámica, último sushi, récord histórico
- Historial de los últimos 5 eventos

---

## 2) Requisitos

- Node.js 18+
- npm

---

## 3) Instalación y ejecución (paso a paso)

### Instalar dependencias

```bash
npm install
```

Instala todas las librerías del proyecto.

### Correr en desarrollo

```bash
npm run dev
```

Levanta la app localmente (normalmente en `http://localhost:3000`).

### Crear build de producción

```bash
npm run build
```

Genera una versión optimizada para deploy.

### Ejecutar la build

```bash
npm run start
```

Sirve la build localmente para probar el modo producción.

---

## 4) Cómo comprobar que LocalStorage funciona

1. Abrí la app.
2. Sumá varios sushis.
3. Cerrá pestaña o recargá la página.
4. Volvé a entrar.
5. El contador y el récord deben seguir igual.

También podés ver los datos en DevTools:

- `contadorSushis`
- `mejorRecord`
- `ultimoSushiISO`
- `historialSushis`

---

## 5) Estructura del código

```txt
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    CounterDisplay.tsx
    TouchArea.tsx
    SushiControls.tsx
    SushiStats.tsx
    ResetModal.tsx
  hooks/
    useSushiCounter.ts
  lib/
    storage.ts
```

---

## 6) Personalización rápida

### Cambiar textos

Editá:
- `src/components/CounterDisplay.tsx`
- `src/components/SushiControls.tsx`
- `src/components/SushiStats.tsx`
- `src/components/TouchArea.tsx`

### Cambiar frases por cantidad

Editá `mensajePorCantidad` en:
- `src/hooks/useSushiCounter.ts`

### Cambiar colores y animaciones

Editá:
- `tailwind.config.ts`
- `src/app/globals.css`

### Cambiar orden de secciones

Editá:
- `src/app/page.tsx`

---

## 7) Decisiones de MVP

- Se priorizó UX mobile-first y acciones en 1 toque.
- Sin backend para mantenerlo liviano y fácil de desplegar.
- Lógica separada en `hook` para facilitar mantenimiento.
- Componentes simples y reutilizables para iterar rápido.
