/**
 * Storage utilities.
 *
 * React-specific storage logic lives here. The underlying safe, exception-guarded
 * storage operations come from @mwakidenis/logx (safeStorage, localStorageHelpers,
 * sessionStorageHelpers) and are re-exported through the LOGX integration layer
 * so the consumer sees a single integration boundary.
 */

export interface StorageValue<T> {
  value: T | null;
  error: Error | null;
}

export interface Serializer<T> {
  serialize(value: T): string;
  deserialize(raw: string | null): T | null;
}

export const jsonSerializer: Serializer<unknown> = {
  serialize: (value) => JSON.stringify(value),
  deserialize: (raw) => {
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};

export function createSerializer<T>(): Serializer<T> {
  return {
    serialize: (value) => JSON.stringify(value) as unknown as string,
    deserialize: (raw) => {
      if (raw === null) return null;
      try {
        return JSON.parse(raw) as T;
      } catch {
        return null;
      }
    },
  };
}
