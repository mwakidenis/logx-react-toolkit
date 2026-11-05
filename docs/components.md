# Components

All components are independently importable from `@mwakidenis/logx-react/components`. They have no external UI framework dependency.

### CopyButton

Accessible copy-to-clipboard button with idle/copying/success/error states.

```tsx
import { CopyButton } from "@mwakidenis/logx-react/components";

<CopyButton text="hello" label="Copy" timeout={2000} />
```

### DebouncedInput

Controlled input with separate immediate and debounced values.

```tsx
import { DebouncedInput } from "@mwakidenis/logx-react/components";

<DebouncedInput defaultValue="" delay={300} onChange={v => {}} onDebouncedChange={v => {}} />
```

### PasswordInput

Accessible show/hide password input.

```tsx
import { PasswordInput } from "@mwakidenis/logx-react/components";

<PasswordInput label="Password" onChange={v => {}} showToggle />
```

### Responsive

Media-query-based rendering. SSR-safe: renders `fallback` before mount.

```tsx
import { Responsive } from "@mwakidenis/logx-react/components";

<Responsive query="(min-width: 1000px)" children={(matches) => matches ? <Desktop /> : <Mobile />} fallback={<Loading />} />
```

### ErrorBoundary

Captures descendant rendering errors with fallback and optional `onError`.

```tsx
import { ErrorBoundary } from "@mwakidenis/logx-react/components";

<ErrorBoundary fallback={<span>Something went wrong</span>} onError={(error, info) => console.error(error, info)}>
  <Children />
</ErrorBoundary>
```

Limitations: does not catch errors in event handlers, asynchronous code, or during server-side rendering.
