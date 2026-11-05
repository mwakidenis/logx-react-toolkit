# Getting started

Install the package together with its required peer/runtime dependency `@mwakidenis/logx`:

```bash
npm install @mwakidenis/logx-react @mwakidenis/logx
```

Install React peer dependencies if you haven't already:

```bash
npm install react react-dom
```

## Your first hook

```tsx
import { useToggle } from "@mwakidenis/logx-react";

export function Button() {
  const [isOn, { toggle }] = useToggle(false);

  return (
    <button type="button" onClick={toggle} aria-pressed={isOn}>
      {isOn ? "On" : "Off"}
    </button>
  );
}
```

## Your first component

```tsx
import { CopyButton } from "@mwakidenis/logx-react/components";

export function Share() {
  return <CopyButton text="https://example.com" label="Copy link" />;
}
```

## Modular imports

For smaller bundles, import from subpaths:

```ts
import { useLocalStorage } from "@mwakidenis/logx-react/hooks/storage";
import { DebouncedInput } from "@mwakidenis/logx-react/components";
```

See [modular-imports.md](#) and [README.md](#) for the full list of supported import paths.
