import {useState, useCallback, useEffect, useRef} from "react";
import moment from "moment";

const useElapsedTimer = (startTime: moment.Moment | undefined) => {
  const [flagTick, setFlagTick] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedRef = useRef(0);
  const elapsed = elapsedRef.current;
  
  const start = useCallback(() => {
    if (intervalRef.current !== null || !startTime) return;

    intervalRef.current = setInterval(() => {
      elapsedRef.current = moment().diff(startTime, 'millisecond');
      setFlagTick(prev => prev + 1);
    }, 250)
  }, [startTime])
  
  const clear = useCallback(() => {
    if (intervalRef.current === null) return;
    
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, [])
  
  useEffect(() => {
    if (!startTime) return;
    start();
    
    return () => clear();
  }, [startTime]);
  
  return { elapsed, flagTick };
}

export default useElapsedTimer;