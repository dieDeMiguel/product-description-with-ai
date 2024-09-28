type PressReleaseStore = {
  [key: string]: string;
};

const store: PressReleaseStore = {};

export function setGeneratedPressRelease(id: string, text: string) {
  store[id] = text;
}

export function appendGeneratedPressRelease(id: string, text: string) {
  console.log("store 123456787654321234567876543234567654", store);
  if (store[id]) {
    store[id] += text;
  } else {
    store[id] = text;
  }
}

export function getGeneratedPressRelease(id: string): string | null {
  return store[id] || null;
}
