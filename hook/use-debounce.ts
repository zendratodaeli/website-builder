import { useEffect, useState } from 'react'

const useDebounce = (value: string, delay: number = 200) => {
  const[debounced, setDebounced] = useState<string>(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(id);
    }
  }, [value, delay]);

  return debounced;
}

export default useDebounce
