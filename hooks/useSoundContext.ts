import useSound from "use-sound";
import {useEffect} from "react";


const useSoundContext = (soundLevel: number) => {
  const volume = soundLevel / 10;
  const set = {volume: volume};
  
  // player
  const [playCorrect, {sound: correctSound}] = useSound('../static/sound/sound_correct.mp3', set);
  const [playInCorrect, {sound: inCorrectSound}] = useSound('../static/sound/sound_incorrect.mp3', set);
  const [playSpace, {sound: spaceSound}] = useSound('../static/sound/sound_space.mp3', set);
  const [playBackward, {sound: backwardSound}] = useSound('../static/sound/sound_backward.mp3', set);
  const [playEnter, {sound: enterSound}] = useSound('../static/sound/sound_enter.mp3', set);
  
  useEffect(() => {
    if (correctSound) correctSound.volume(volume);
    if (inCorrectSound) inCorrectSound.volume(volume);
    if (spaceSound) spaceSound.volume(volume);
    if (backwardSound) backwardSound.volume(volume);
    if (enterSound) enterSound.volume(volume);
  }, [soundLevel]);
  
  return {playCorrect, playInCorrect, playSpace, playBackward, playEnter};
}

export default useSoundContext;