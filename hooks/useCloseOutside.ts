import {useEffect, useRef} from "react";

const useCloseOutside = (close: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const closeEvent = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    }
    
    document.addEventListener('mouseup', closeEvent);
    
    return () => {
      document.removeEventListener('mouseup', closeEvent);
    }
    
  }, [ref, close]);
  
  return ref;
}

export default useCloseOutside;