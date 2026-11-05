# Configuration

### TypeScript

Ensure your `tsconfig.json` enables strict mode (recommended):

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}
```

The package ships `.d.ts` declarations, so no additional type installation is needed.

### Module resolution

The package exposes ESM (`dist/*.mjs`), CommonJS (`dist/*.js`), and TypeScript declarations (`dist/*.d.ts`) via `package.json` `exports`. Both bundlers and Node.js can resolve subpath imports such as `@mwakidenis/logx-react/hooks/storage`.

### Build tools

- Vite / Vitest: works out of the box.
- Next.js: React Server Components are not supported; use the toolkit in Client Components (`'use client'`).
