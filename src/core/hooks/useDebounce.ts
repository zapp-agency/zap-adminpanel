import { useRef, useLayoutEffect, useMemo } from 'react';

type CallbackFunction = (...args: unknown[]) => void;

/**
 * A custom hook that returns a debounced version of the callback function
 * @param callback The function to debounce
 * @param delay The delay in milliseconds
 * @returns A debounced version of the callback function
 */
export const useDebounce = <T extends CallbackFunction>(callback: T, delay: number): T => {
  const callbackRef = useRef<T>(callback);
  const timerRef = useRef<number | undefined>(undefined);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useMemo(() => {
    const debouncedCallback = (...args: Parameters<T>) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    };
    return debouncedCallback as T;
  }, [delay]) as T;
};
