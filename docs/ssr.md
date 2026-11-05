# SSR

All hooks and components are safe to use during server-side rendering and hydration.

## Guarantees

- Browser APIs (`window`, `document`, `localStorage`, `sessionStorage`, `navigator`, `matchMedia`) are never accessed at module initialization.
- Storage hooks (`useLocalStorage`, `useSessionStorage`) return `initialValue` on the server and first client render, then read storage in an effect after mount.
- `useMediaQuery` returns `false` before mount; `useWindowSize` returns `{ width: 0, height: 0 }` before mount.
- `useMounted` returns `false` during SSR and becomes `true` only after mount.
- Event listeners are attached in effects and removed on unmount.

## Next.js

Use these hooks/components only inside Client Components (`'use client'`). React Server Components cannot use hooks or browser APIs.

## Avoid hydration mismatches

Do not read `useMounted()` or `useWindowSize()` during render to gate critical UI; read them inside effects or event handlers instead.
