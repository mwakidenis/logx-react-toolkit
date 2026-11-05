import {
  useMediaQuery,
  useWindowSize,
  useOnlineStatus,
  useClipboard,
} from "@mwakidenis/logx-react/hooks";
import { CopyButton } from "@mwakidenis/logx-react/components";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { width, height } = useWindowSize();
  const online = useOnlineStatus();
  const { copy, isSupported } = useClipboard();

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Browser utilities</h1>
      <p>Is mobile: {String(isMobile)}</p>
      <p>Window size: {width} x {height}</p>
      <p>Online: {String(online)}</p>
      <p>Clipboard supported: {String(isSupported)}</p>
      <button
        type="button"
        onClick={() => void copy("https://example.com")}
        disabled={!isSupported}
      >
        Copy link
      </button>
      <CopyButton text="https://example.com" />
    </div>
  );
}
