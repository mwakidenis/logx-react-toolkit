# Next.js

Use `@mwakidenis/logx-react` inside Client Components only.

```tsx
'use client';

import { useLocalStorage } from "@mwakidenis/logx-react/hooks/storage";
import { CopyButton } from "@mwakidenis/logx-react/components";

export default function Page() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  return <CopyButton text={theme} />;
}
```

Do not import hooks or components in React Server Components (they rely on browser APIs and React hooks).
