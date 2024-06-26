'use client';

import style from "./Playground.module.css";
import useWrite from "@/hooks/useWrite";
import {useState} from "react";

interface IPlayground {
  typingTarget: string;
}

const Playground = ({typingTarget}: IPlayground) => {
  const [inputCode, setInputCode] = useState('');
  const { typingText } = useWrite(inputCode);
  
  return (
    <div className={style.container}>
      <div className={style.board}>
        <div className={style.target_text}>
          {typingTarget.split('').map((letter, index) => (
            <span key={`-${index}`}>{letter}</span>
          ))}
        </div>
        <div className={style.write}>
          {typingText.split('').map((letter, index) => (
            <></>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playground;