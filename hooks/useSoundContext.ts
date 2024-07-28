import useSound from "use-sound";


const useSoundContext = () => {
  // player
  const [playCorrect] = useSound('../static/sound/sound_correct.mp3');
  const [playInCorrect] = useSound('../static/sound/sound_incorrect.mp3');
  const [playSpace] = useSound('../static/sound/sound_space.mp3');
  const [playBackward] = useSound('../static/sound/sound_backward.mp3');
  const [playEnter] = useSound('../static/sound/sound_enter.mp3');
  
  return {playCorrect, playInCorrect, playSpace, playBackward, playEnter};
}

export default useSoundContext;