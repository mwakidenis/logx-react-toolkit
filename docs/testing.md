# Testing

Tests use Vitest, React Testing Library, and jsdom.

```bash
npm test
```

### Testing hooks

```tsx
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "@mwakidenis/logx-react";

test("useCounter increments", () => {
  const { result } = renderHook(() => useCounter(0));
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

### Testing components

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { CopyButton } from "@mwakidenis/logx-react/components";

test("CopyButton copies text", async () => {
  render(<CopyButton text="hello" />);
  fireEvent.click(screen.getByRole("button", { name: /copy/i }));
});
```

### Browser API mocks

Mock `matchMedia`, `navigator.clipboard`, and `localStorage` in your test setup when testing hooks that depend on them.
