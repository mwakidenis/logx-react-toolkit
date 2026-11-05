# TypeScript

The toolkit is written in strict TypeScript:

- `strict`
- `noImplicitAny`
- `strictNullChecks`
- Declaration generation (`.d.ts`)

All public APIs are generically typed. No `any` is used in public exports.

### Importing types

```ts
import type { CopyButtonProps, PasswordInputProps, AsyncState } from "@mwakidenis/logx-react";
```

### Peer types

Install `@types/react` alongside React if your environment requires it:

```bash
npm install -D @types/react @types/react-dom
```
