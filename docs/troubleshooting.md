# Troubleshooting

### "Cannot find module '@mwakidenis/logx'"

Install the parent package: `npm install @mwakidenis/logx`.

### Storage hook returns initial value on first client render

This is intentional for SSR safety. Storage is read in an effect after mount; subsequent renders reflect the stored value.

### matchMedia is not defined in tests

Mock `window.matchMedia` in your test setup (see `tests/setup.ts`).

### Clipboard API is not available

`useClipboard` falls back to a textarea + `document.execCommand("copy")`, and returns `false` if neither is available.
