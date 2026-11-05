import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: {
    resolve: true,
  },
  entry: {
    "index": "src/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "hooks/storage/index": "src/hooks/storage/index.ts",
    "components/index": "src/components/index.ts",
    "utilities/index": "src/utilities/index.ts",
    "types/index": "src/types/index.ts",
    "providers/LogxProvider": "src/providers/LogxProvider.tsx",
  },
  format: ["esm", "cjs"],
  splitting: false,
  sourcemap: true,
  treeshake: true,
  external: ["react", "react-dom", "@mwakidenis/logx", "@mwakidenis/logx/*"],
  shims: true,
});
