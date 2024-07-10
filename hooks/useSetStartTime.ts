import {useEffect, useRef, useState} from "react";
import moment from "moment/moment";

const useSetStartTime = (totalCount: number) => {
  const [startTime, setStartTime] = useState<moment.Moment>();
  const isStartRef = useRef(false);
  
  useEffect(() => {
    if (totalCount > 0 && !isStartRef.current) {
      setStartTime(moment());
      isStartRef.current = true;
    }
  }, [totalCount])
  
  return startTime;
}

export default useSetStartTime;