/**
 * LOGX React Toolkit - main entry point.
 *
 * Named exports only. Prefer modular imports for tree-shaking:
 *   import { useToggle } from "@mwakidenis/logx-react";
 *   import { useLocalStorage } from "@mwakidenis/logx-react/hooks/storage";
 *   import { CopyButton } from "@mwakidenis/logx-react/components";
 *   import { array } from "@mwakidenis/logx-react/utilities";
 */

export * from "./hooks";
export * from "./components";
export * from "./utilities";
export * from "./providers";
export * from "./types";

export { LogxProvider, useLogx } from "./providers/LogxProvider";
