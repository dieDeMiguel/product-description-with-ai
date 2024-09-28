// src/store/pressReleaseStore.ts

type PressReleaseStore = {
  [key: string]: string;
};

const store: PressReleaseStore = {};

/**
 * Initializes an entry in the store.
 * @param id - Unique identifier for the press release.
 * @param text - Initial text (usually empty).
 */
export function setGeneratedPressRelease(id: string, text: string) {
  store[id] = text;
}

/**
 * Appends text to an existing entry in the store.
 * @param id - Unique identifier for the press release.
 * @param text - Text to append.
 */
export function appendGeneratedPressRelease(
  id: string,
  text: string | undefined
) {
  if (text) {
    if (store[id]) {
      store[id] += text;
    } else {
      store[id] = text;
    }
  }
}

/**
 * Retrieves the generated press release text.
 * @param id - Unique identifier for the press release.
 * @returns The generated text or null if not found.
 */
export function getGeneratedPressRelease(id: string): string | null {
  return store[id] || null;
}
