export interface EditorHandle {
  appendText: (text: string) => Promise<void>;
}
