import styles from "./SettingSidebar.module.css";
import React, {CSSProperties, SetStateAction} from "react";
import { IoClose } from "react-icons/io5";
import useCloseOutside from "@/hooks/useCloseOutside";
import {ISettings, TWeight} from "@/static/settings";
import { GiSpeaker } from "react-icons/gi";
import { GiSpeakerOff } from "react-icons/gi";
import { BsPlus } from "react-icons/bs";
import { HiOutlineMinus } from "react-icons/hi2";


interface ISettingSidebar {
  close: () => void;
  settings: ISettings;
  setSettings: React.Dispatch<SetStateAction<ISettings>>;
  fontSize: number;
  fontWeight: TWeight;
}
const SettingSidebar = ({close, settings, setSettings, fontSize, fontWeight}: ISettingSidebar) => {
  const ref = useCloseOutside(close);
  
  const changeSettings = <K extends keyof ISettings>(key: K, value: ISettings[K]) => {
    setSettings({
      ...settings,
      [key]: value
    });
  }
  
  const sampleCss: CSSProperties = {
    fontSize: fontSize,
    fontWeight: fontWeight
  }
  
  
  return (
    <div className={styles.container}>
      <div className={styles.sidebar} ref={ref}>
        <div className={styles.close} onClick={close}>
          <IoClose size={25} />
        </div>
        <div className={styles.title}>
          <h1>Typing Lab Settings</h1>
        </div>
        <div className={styles.settings}>
          <div className={styles.wrap}>
            <h2 className={styles.subtitle}>appearance</h2>
            <div className={styles.btn_wrap}>
              <button
                className={settings.appearance === 'basic' ? styles.active : ''}
                onClick={() => changeSettings('appearance', 'basic')}
              >
                Basic Style
              </button>
              <button
                className={settings.appearance === 'zen' ? styles.active : ''}
                onClick={() => changeSettings('appearance', 'zen')}
              >
                Zen Mode
              </button>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={styles.wrap}>
            <h2 className={styles.subtitle}>sound</h2>
            <div className={styles.sound}>
              {settings.soundLevel === 0 ?
                <GiSpeakerOff size={18}/> : <GiSpeaker size={18}/>
              }
              <input type="range" className={styles.sound_bar}/>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={styles.wrap}>
            <h2 className={styles.subtitle}>font</h2>
            <div className={styles.font}>
              <h3>Font Size</h3>
              <div className={styles.btn_wrap}>
                // TODO 폰트 크기, 굵기 변경 제한 함수를 전달해야함
                <button onClick={() => changeSettings('fontSize', settings.fontSize + 1)}>
                  <BsPlus size={20} />
                </button>
                <button onClick={() => changeSettings('fontSize', settings.fontSize - 1)}>
                  <HiOutlineMinus size={20} />
                </button>
              </div>
              <h3>Font Weight</h3>
              <div className={styles.btn_wrap}>
                <button><BsPlus size={20} /></button>
                <button><HiOutlineMinus size={20} /></button>
              </div>
              <div className={styles.font_preview}>
                <span style={sampleCss}>한글 / English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingSidebar;