import { useEffect } from "react";

export function useClickOutside(callback: any, ref: any) {
  const handleClick = (event: any) => {
    if (ref.current && !ref.current.contains(event?.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}
