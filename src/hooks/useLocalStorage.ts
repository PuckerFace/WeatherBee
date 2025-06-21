import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error initializing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);
  //   const setValue = (value: T | ((val: T) => T)) => {
  //     try {
  //       const valueToStore = value instanceof Function ? value(storedValue) : value;
  //       setStoredValue(valueToStore);
  //       window.localStorage.setItem(key, JSON.stringify(valueToStore));
  //     } catch (error) {
  //         console.error(`Error setting localStorage key "${key}":`, error);
  //         }
  //     }
  //
  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
