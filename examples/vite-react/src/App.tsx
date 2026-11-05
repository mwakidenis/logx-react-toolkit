import { useToggle, useDebouncedValue, useLocalStorage } from "@mwakidenis/logx-react/hooks";
import { CopyButton } from "@mwakidenis/logx-react/components";
import { DebouncedInput } from "@mwakidenis/logx-react/components";

export default function App() {
  const [open, { toggle }] = useToggle(false);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const debounced = useDebouncedValue(theme, { delay: 400 });

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>LOGX React Toolkit Example</h1>
      <p>Theme (localStorage): {theme}</p>
      <button type="button" onClick={toggle} aria-expanded={open}>
        {open ? "Close" : "Open"}
      </button>
      <DebouncedInput
        value={theme}
        onChange={(v) => setTheme(v)}
        onDebouncedChange={(v) => console.log("debounced:", v)}
        delay={400}
      />
      <p>Debounced theme: {debounced}</p>
      <CopyButton text={theme} label="Copy theme" />
    </div>
  );
}
