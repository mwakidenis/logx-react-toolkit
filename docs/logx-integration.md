# LOGX integration

This toolkit genuinely uses [`@mwakidenis/logx`](https://github.com/mwakidenis/logx) at runtime. LOGX is a declared dependency in `package.json` and is imported in production source through a single integration layer: `src/internal/logx.ts`.

## What is reused from LOGX

| Toolkit feature | LOGX module | LOGX functions used |
|-----------------|-------------|---------------------|
| `useDebouncedCallback` | `@mwakidenis/logx/function` | `debounce` |
| `useThrottle` | `@mwakidenis/logx/function` | `throttle` |
| `useArray` | `@mwakidenis/logx/array` | `unique`, `compact`, `shuffle`, `first`, `last`, `take`, `drop`, `partition`, `difference`, `intersection`, `union`, `flatten` |
| `useObject` | `@mwakidenis/logx/object` | `clone`, `deepClone`, `get`, `set`, `pick`, `omit`, `merge`, `entries`, `keys`, `values`, `mapValues` |
| `useLocalStorage` / `useSessionStorage` | `@mwakidenis/logx/browser` | `safeStorage`, `localStorageHelpers`, `sessionStorageHelpers` |
| Validation utilities | `@mwakidenis/logx/validation` | `isNil`, `isString`, `isNumber`, `isBoolean`, `isArray`, `isObject`, `isEmpty`, `isEmail`, `isFunction`, `isNull`, `isURL` |
| String utilities | `@mwakidenis/logx/string` | `escapeHtml`, `trim`, `truncate`, `camelCase`, `capitalize`, `kebabCase`, `pascalCase`, `snakeCase` |
| Date utilities | `@mwakidenis/logx/date` | `addDays`, `isValidDate` |
| Number utilities | `@mwakidenis/logx/number` | `clamp`, `inRange`, `round`, `percentage`, `randomInt` |
| Async utilities | `@mwakidenis/logx/async` | `sleep`, `retry`, `withTimeout`, `timeout` |

## Integration boundary

React-specific behavior (state, effects, lifecycle, timers) lives in the hooks/components. Pure data transformations come from LOGX. This keeps the toolkit understandable to developers who have never used LOGX: every hook is self-documenting and does not require prior LOGX knowledge.

## What is React-specific (not in LOGX)

Value debouncing (`useDebouncedValue`), storage state synchronization, media-query/window-size tracking, click-outside detection, clipboard copying, online-status tracking, controllable timers, and async state management are implemented in this toolkit. LOGX provides the underlying primitives where signatures fit.

No LOGX source is copied into this project, and the parent repository is not modified.
