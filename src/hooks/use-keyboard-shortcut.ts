import { useEffect } from "react";

export function useKeyboardShortcut(key: string, callback: () => void, ctrlKey = true, metaKey = true) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlOrMeta = (ctrlKey && event.ctrlKey) || (metaKey && event.metaKey);
      if (isCtrlOrMeta && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, ctrlKey, metaKey]);
}
