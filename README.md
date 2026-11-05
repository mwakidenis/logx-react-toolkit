# @mwakidenis/logx-react

A modular, lightweight, SSR-safe React utility toolkit built on [@mwakidenis/logx](https://github.com/mwakidenis/logx). Provides hooks, components, utilities, and providers for production React applications.

[![npm version](https://img.shields.io/npm/v/@mwakidenis/logx-react.svg)](https://www.npmjs.com/package/@mwakidenis/logx-react)
[![npm downloads](https://img.shields.io/npm/dm/@mwakidenis/logx-react)](https://www.npmjs.com/package/@mwakidenis/logx-react)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

## Installation

```bash
npm install @mwakidenis/logx-react @mwakidenis/logx
```

`@mwakidenis/logx` is a required peer/runtime dependency and must be installed alongside this package.

```bash
npm install --save react react-dom   # peer dependencies (React 18 or 19)
```

## Quick start

```tsx
import { useToggle, useDebouncedValue, CopyButton } from "@mwakidenis/logx-react";

function Demo() {
  const [open] = useToggle(false);
  const value = useDebouncedValue("initial", { delay: 300 });

  return (
    <div>
      <button aria-expanded={open}>{open ? "Open" : "Closed"}</button>
      <CopyButton text={value} />
    </div>
  );
}
```

## Feature overview

**Hooks** — state, performance, browser, storage, and async utilities:

| Hook | Purpose |
|------|---------|
| `useToggle` / `useBoolean` | Boolean state with stable actions |
| `useCounter` | Numeric counter |
| `usePrevious` / `useLatest` | Track previous / latest values |
| `useMounted` | Mount status (SSR-safe) |
| `useArray` / `useObject` | Array and object state with LOGX helpers |
| `useDebouncedValue` | Debounce a changing value |
| `useDebouncedCallback` / `useThrottle` | Debounce/throttle callbacks via LOGX |
| `useLocalStorage` / `useSessionStorage` | Persisted state (exception-guarded) |
| `useMediaQuery` / `useWindowSize` | Browser environment (SSR-safe) |
| `useClickOutside` / `useEventListener` | DOM event handling |
| `useClipboard` / `useOnlineStatus` | Clipboard and connectivity |
| `useTimeout` / `useInterval` | Controllable timers |
| `useAsync` | Async state with cancellation |

**Components** — independently importable, no UI framework dependency:

| Component | Purpose |
|-----------|---------|
| `CopyButton` | Accessible copy-to-clipboard button |
| `DebouncedInput` | Input with immediate + debounced values |
| `PasswordInput` | Show/hide password input |
| `Responsive` | Media-query-based rendering (SSR-safe) |
| `ErrorBoundary` | Descendant error capture with fallback |

**Utilities** — array, object, string, number, validation, date, and browser helpers, many delegating to @mwakidenis/logx.

**Providers** — `LogxProvider` exposes the LOGX integration layer via React context (optional).

## Modular imports

Every export supports tree-shaking. Import from the root or from a subpath:

```ts
import { useToggle } from "@mwakidenis/logx-react";
import { useDebouncedValue } from "@mwakidenis/logx-react/hooks";
import { useLocalStorage } from "@mwakidenis/logx-react/hooks/storage";
import { CopyButton } from "@mwakidenis/logx-react/components";
import { array } from "@mwakidenis/logx-react/utilities";
```

All advertised paths are wired through `package.json` `exports` with ESM, CommonJS, and TypeScript declarations.

## LOGX integration

This toolkit genuinely uses [`@mwakidenis/logx`](https://github.com/mwakidenis/logx) at runtime:

- `useDebouncedCallback` and `useThrottle` wrap LOGX's `debounce` and `throttle` (`@mwakidenis/logx/function`).
- `useArray` and `useObject` delegate pure transformations (unique, compact, pick, omit, merge, get, set, keys, values, entries, …) to LOGX's array and object modules.
- `useLocalStorage` / `useSessionStorage` use LOGX's `safeStorage`, `localStorageHelpers`, and `sessionStorageHelpers` (`@mwakidenis/logx/browser`).
- Validation and object helpers reuse LOGX's `validation`, `object`, `string`, `date`, `number`, and `async` modules.

A dedicated integration layer (`src/internal/logx.ts`) keeps React-specific behavior separate from core utility behavior. No LOGX source is copied into this project, and the parent repository is not modified.

See `docs/logx-integration.md` for details.

## TypeScript

Written in strict TypeScript (`strict`, `noImplicitAny`, `strictNullChecks`, declaration generation). All public APIs are generically typed. No `any` is used in public APIs.

## SSR compatibility

All hooks and components are safe to use during server-side rendering and hydration. Browser APIs (`window`, `document`, `localStorage`, `matchMedia`, `navigator`) are never accessed at module initialization; storage and media queries initialize after mount so server and client first renders match.

## React compatibility

`react` and `react-dom` are peer dependencies. Tested against React 18.2+ and React 19. Follows the Rules of Hooks and avoids deprecated React APIs.

## Performance philosophy

- Minimal runtime dependencies (`@mwakidenis/logx` only).
- Tree-shakable modular imports; `sideEffects: false`.
- No unnecessary re-renders; stable callbacks where appropriate.
- Proper timer and event-listener cleanup to avoid memory leaks.

No performance-superiority claims are made without benchmarks.

## Browser support

Modern browsers with React 18/19. Graceful degradation when browser APIs (localStorage, sessionStorage, Clipboard API, matchMedia) are unavailable.

## Testing

Tests use Vitest, React Testing Library, and jsdom. Run:

```bash
npm test
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Security issues: [SECURITY.md](SECURITY.md).

## Roadmap

See the [roadmap](docs/README.md) in the docs folder.

## Author

Mwaki Denis — https://github.com/mwakidenis

## Links

- Repository: https://github.com/mwakidenis/logx-react-toolkit
- npm package: https://www.npmjs.com/package/@mwakidenis/logx-react
- Parent library: https://github.com/mwakidenis/logx (@mwakidenis/logx)
- License: [MIT](LICENSE)
