# FAQ

### Is @mwakidenis/logx required?

Yes. It is a runtime dependency and must be installed alongside `@mwakidenis/logx-react`.

### Does it work with React 19?

Yes. React `^18.2.0 || ^19.0.0` are supported peer dependencies.

### Is it SSR-safe?

Yes. Browser APIs are never accessed at module initialization; storage and media queries initialize after mount.

### Can I use it without LOGX knowledge?

Yes. Every hook is self-contained; LOGX is used internally for pure utilities.
