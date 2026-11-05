# Vite + React example

This example demonstrates `@mwakidenis/logx-react` hooks and components in a Vite React app.

## Setup

From the repository root, pack the toolkit:

```bash
npm run build
cd examples/vite-react
npm install
```

The example references the toolkit via `file:../../` in `package.json`, so it uses the locally built package.

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## What it demonstrates

- `useToggle` for open/closed state.
- `useLocalStorage` for persisted theme (LOGX storage helpers).
- `useDebouncedValue` for debouncing a value.
- `DebouncedInput` and `CopyButton` components.
