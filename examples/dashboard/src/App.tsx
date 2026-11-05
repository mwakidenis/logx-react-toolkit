import {
  useArray,
  useObject,
  useDebouncedValue,
} from "@mwakidenis/logx-react/hooks";
import { CopyButton } from "@mwakidenis/logx-react/components";

export default function App() {
  const { array: items, push, remove } = useArray<string>([]);
  const { object: filters, setKey } = useObject<{ q: string }>({ q: "" });
  const debounced = useDebouncedValue(filters.q, { delay: 300 });

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Dashboard</h1>
      <p>Debounced filter: {debounced}</p>
      <input
        value={filters.q}
        onChange={(e) => setKey("q", e.target.value)}
        placeholder="Filter..."
      />
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item}
            <button type="button" onClick={() => remove(i)}>×</button>
          </li>
        ))}
      </ul>
      <input
        placeholder="Add item"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            push(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <CopyButton text={items.join(", ")} label="Copy items" />
    </div>
  );
}
