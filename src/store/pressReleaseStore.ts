type PressReleaseStore = {
  [key: string]: {
    text: string;
    isComplete: boolean;
  };
};

const store: PressReleaseStore = {};

/**
 * Initializes an entry in the store.
 * @param id - Unique identifier for the press release.
 * @param text - Initial text (usually empty).
 */
export function setGeneratedPressRelease(id: string, text: string) {
  store[id] = { text, isComplete: false };
}

/**
 * Appends text to an existing entry in the store.
 * @param id - Unique identifier for the press release.
 * @param text - Text to append.
 */
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
    store[id].text += text;
  }
}
/**
 * Marks the press release as complete.
 * @param id - Unique identifier for the press release.
 */
export function markPressReleaseComplete(id: string) {
  if (store[id]) {
    store[id].isComplete = true;
  }
}

/**
 * Retrieves the generated press release.
 * @param id - Unique identifier for the press release.
 * @returns The press release data or null if not found.
 */
export function getGeneratedPressRelease(
  id: string
): { text: string; isComplete: boolean } | null {
  return store[id] || null;
}
