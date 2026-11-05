import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  CopyButton,
  DebouncedInput,
  ErrorBoundary,
  PasswordInput,
  Responsive,
} from "../src/components";

describe("CopyButton", () => {
  it("copies text and cycles through states", async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    const onError = vi.fn();
    render(
      <CopyButton text="hello" label="Copy" onCopy={onCopy} onError={onError} timeout={100} />,
    );
    const button = screen.getByRole("button", { name: /copy/i });
    await user.click(button);
    expect(onCopy).toHaveBeenCalledWith("hello");
    expect(screen.getByRole("button", { name: /copied to clipboard/i })).toBeInTheDocument();
  });

  it("calls onError when copy fails", async () => {
    const user = userEvent.setup();
    const onError = vi.fn();
    const originalWriteText = navigator.clipboard.writeText.bind(navigator.clipboard);
    (navigator.clipboard as any).writeText = async () => {
      throw new Error("denied");
    };
    render(<CopyButton text="hello" onError={onError} />);
    const button = screen.getByRole("button", { name: /copy/i });
    await user.click(button);
    expect(onError).toHaveBeenCalled();
    (navigator.clipboard as any).writeText = originalWriteText;
  });
});

describe("PasswordInput", () => {
  it("toggles show/hide and labels accessibly", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PasswordInput label="Password" onChange={onChange} />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: /show password/i }));
    expect(input).toHaveAttribute("type", "text");
    await user.click(screen.getByRole("button", { name: /hide password/i }));
    expect(input).toHaveAttribute("type", "password");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("calls onChange on input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<PasswordInput onChange={onChange} />);
    const input = screen.getByLabelText("Password");
    await user.type(input, "secret");
    expect(onChange).toHaveBeenCalledWith("secret");
  });
});

describe("DebouncedInput", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("fires onChange immediately and onDebouncedChange after delay", () => {
    const onChange = vi.fn();
    const onDebouncedChange = vi.fn();
    render(
      <DebouncedInput defaultValue="a" onChange={onChange} onDebouncedChange={onDebouncedChange} delay={100} />,
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "ab" } });
    expect(onChange).toHaveBeenCalledWith("ab");
    expect(onDebouncedChange).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(100));
    expect(onDebouncedChange).toHaveBeenCalledWith("ab");
  });

  it("supports controlled value", () => {
    const onChange = vi.fn();
    render(<DebouncedInput value="controlled" onChange={onChange} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("controlled");
  });
});

describe("Responsive", () => {
  it("renders children when query matches, fallback otherwise", () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any);
    render(
      <Responsive query="(min-width: 1px)" children={(m: boolean) => `matches:${m}`} fallback="nope" />,
    );
    expect(screen.getByText("matches:true")).toBeInTheDocument();
  });

  it("renders fallback when query does not match", () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any);
    render(
      <Responsive query="(min-width: 1px)" children={() => <span>yes</span>} fallback={<span>nope</span>} />,
    );
    expect(screen.getByText("nope")).toBeInTheDocument();
  });
});

describe("ErrorBoundary", () => {
  it("renders fallback when a descendant throws", () => {
    const onError = vi.fn();
    function Bad(): JSX.Element {
      throw new Error("boom");
      return null as unknown as JSX.Element;
    }
    render(
      <ErrorBoundary onError={onError} fallback={<span>error occurred</span>}>
        <Bad />
      </ErrorBoundary>,
    );
    expect(screen.getByText("error occurred")).toBeInTheDocument();
    expect(onError).toHaveBeenCalled();
  });

  it("renders children normally when no error", () => {
    render(
      <ErrorBoundary fallback={<span>error</span>}>
        <span>ok</span>
      </ErrorBoundary>,
    );
    expect(screen.getByText("ok")).toBeInTheDocument();
  });

  it("supports fallback render function receiving error", () => {
    function Bad(): JSX.Element {
      throw new Error("render boom");
      return null as unknown as JSX.Element;
    }
    render(
      <ErrorBoundary
        fallback={(error: Error) => <span>{error.message}</span>}
      >
        <Bad />
      </ErrorBoundary>,
    );
    expect(screen.getByText("render boom")).toBeInTheDocument();
  });
});
