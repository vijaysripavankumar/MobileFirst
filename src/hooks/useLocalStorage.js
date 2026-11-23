import { useState, useEffect } from "react";

/**
 * Custom hook to sync state with localStorage.
 * Restores saved data upon refresh.
 * Only seeds initialValue on first-time access.
 * Never overwrites existing saved data.
 *
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Default fallback / initial seed data
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
      // First-time initialization
      const valueToStore =
        typeof initialValue === "function" ? initialValue() : initialValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
export default useLocalStorage;
