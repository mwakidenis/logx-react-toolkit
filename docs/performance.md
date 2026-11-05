# Performance

### Philosophy

- Minimal runtime dependencies: `@mwakidenis/logx` only.
- Tree-shakable modular imports; `sideEffects: false`.
- No unnecessary re-renders; stable callbacks via `useCallback`/`useRef`.
- Proper timer and event-listener cleanup to avoid memory leaks.
- No global state.

No performance-superiority claims are made without benchmarks. Adopt the toolkit for its modularity and correctness, not for unmeasured speed.

### Bundle size

The package ships small ESM and CommonJS builds. Use modular imports to tree-shake unused features.
