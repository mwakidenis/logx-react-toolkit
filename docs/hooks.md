# Hooks

Every hook is exported from `@mwakidenis/logx-react` and from the `@mwakidenis/logx-react/hooks` subpath.

## State management

### useToggle

Boolean toggle with stable actions.

```ts
import { useToggle } from "@mwakidenis/logx-react";

const [value, { toggle, setTrue, setFalse, set }] = useToggle(false);
```

### useBoolean

Alias of `useToggle` with explicit `setTrue`/`setFalse` naming.

```ts
import { useBoolean } from "@mwakidenis/logx-react";

const [value, { setTrue, setFalse, toggle, set }] = useBoolean(true);
```

### useCounter

Numeric counter with `increment`, `decrement`, `reset`, and `set`.

```ts
import { useCounter } from "@mwakidenis/logx-react";

const { count, increment, decrement, reset, set } = useCounter(0);
```

### usePrevious

Returns the previous value of a tracked value.

```ts
import { usePrevious } from "@mwakidenis/logx-react";

const prev = usePrevious(value);
```

### useLatest

Returns a ref whose `.current` always holds the latest value without re-renders.

```ts
import { useLatest } from "@mwakidenis/logx-react";

const latest = useLatest(value);
// latest.current always reflects the most recent render
```

### useMounted

Returns whether the component is mounted (false during SSR, true after mount).

```ts
import { useMounted } from "@mwakidenis/logx-react";

const mounted = useMounted();
```

### useArray

Array state with immutable helpers. Delegates pure transformations to LOGX array utilities.

```ts
import { useArray } from "@mwakidenis/logx-react";

const { array, push, remove, update, clear, reset, unique, compact, first, last, take, drop } = useArray<T>([]);
```

### useObject

Object state with immutable helpers. Delegates pure transformations to LOGX object utilities.

```ts
import { useObject } from "@mwakidenis/logx-react";

const { object, set, setKey, removeKey, pick, omit, merge, get, keys, values, entries } = useObject<T>({});
```

## Performance

### useDebouncedValue

Debounces a changing value.

```ts
import { useDebouncedValue } from "@mwakidenis/logx-react";

const debounced = useDebouncedValue(value, { delay: 300, leading: false });
```

### useDebouncedCallback

Debounces a callback using LOGX's `debounce` (trailing edge only). Exposes `cancel`, `flush`, `pending`.

```ts
import { useDebouncedCallback } from "@mwakidenis/logx-react";

const { ..., cancel, flush, pending } = useDebouncedCallback(fn, 300);
```

### useThrottle

Throttles a callback using LOGX's `throttle` (leading edge + trailing flush). Exposes `cancel`, `flush`, `pending`.

```ts
import { useThrottle } from "@mwakidenis/logx-react";

const { ..., cancel, flush, pending } = useThrottle(fn, 300);
```

## Storage

### useLocalStorage / useSessionStorage

State synchronized with localStorage / sessionStorage. Exception-guarded via LOGX `safeStorage`. SSR-safe: returns `initialValue` on the server and first client render, then reads storage after mount.

```ts
import { useLocalStorage, useSessionStorage } from "@mwakidenis/logx-react/hooks/storage";

const [value, set, remove] = useLocalStorage("key", "initial");
```

## Browser

### useMediaQuery

Tracks a CSS media query match. Returns `false` before mount (SSR-safe).

```ts
import { useMediaQuery } from "@mwakidenis/logx-react";

const isMobile = useMediaQuery("(max-width: 768px)");
```

### useWindowSize

Tracks `window.innerWidth` / `innerHeight`. Returns `{ width: 0, height: 0 }` on the server.

```ts
import { useWindowSize } from "@mwakidenis/logx-react";

const { width, height } = useWindowSize();
```

### useClickOutside

Fires a handler when clicking outside a ref'd element.

```ts
import { useClickOutside } from "@mwakidenis/logx-react";

useClickOutside(ref, handler);
```

### useEventListener

Attaches an event listener with automatic cleanup on unmount.

```ts
import { useEventListener } from "@mwakidenis/logx-react";

useEventListener(window, "resize", handler);
```

### useClipboard

Copies text to the clipboard (Clipboard API with textarea fallback). Never throws.

```ts
import { useClipboard } from "@mwakidenis/logx-react";

const { copy, isSupported } = useClipboard();
await copy("text");
```

### useOnlineStatus

Tracks `navigator.onLine`. Assumes `true` on the server.

```ts
import { useOnlineStatus } from "@mwakidenis/logx-react";

const online = useOnlineStatus();
```

## Async

### useAsync

Manages an async operation with loading/success/error states, cancellation, and race-condition protection.

```ts
import { useAsync } from "@mwakidenis/logx-react";

const { data, error, isLoading, isError, isSuccess, execute, reset, cancel } = useAsync(fetchData, true);
```

### useTimeout / useInterval

Controllable timers with `start`, `stop`, and cleanup on unmount.

```ts
import { useTimeout, useInterval } from "@mwakidenis/logx-react";

const { start, stop, reset, active } = useTimeout(callback, 1000);
const { start, stop, active } = useInterval(callback, 1000);
```
