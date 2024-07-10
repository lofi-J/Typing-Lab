import {useState, useEffect} from "react";

const useCalcWPM = (totalCount: number, elapsedTime: number, flagTick: nubmber) => {
  const [wpm, setWpm] = useState(0);
  
  const milliToMinute = (millisecond: number) => millisecond / 60000;
  
  useEffect(() => {
    const minute = milliToMinute(elapsedTime)
    const currentWPM = minute ? Math.round((totalCount / 5) / minute) : 0;
    setWpm(currentWPM);
  }, [flagTick]);

  return wpm;
}

export default useCalcWPM;