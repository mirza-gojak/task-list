import { useState } from "react";

const useLocalStorage = <T extends unknown>(key: string, initialData?: T) => {
  const item = window.localStorage.getItem(key);
  const [storedValue, setStoredValue] = useState<T>(
    item ? JSON.parse(item) : initialData
  );

  const setValue = (value: T): void => {
    setStoredValue(value);
    if (!value) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  if (!item && initialData) {
    setValue(initialData);
  }

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
