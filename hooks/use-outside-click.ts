import { RefObject, useEffect } from "react";

const useOutsideClick = (
  refs: RefObject<HTMLElement | null>[],
  callback: () => void
) => {

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if(refs.every(ref => !ref.current?.contains(event.target as Node))) {
        callback()
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
};

export default useOutsideClick;
