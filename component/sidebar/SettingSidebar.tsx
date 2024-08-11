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

const MAX_FONT_SIZE = 20;
const MIN_FONT_SIZE = 16;
const MAX_FONT_WEIGHT = 900;
const MIN_FONT_WEIGHT = 100;

const SettingSidebar = ({close, settings, setSettings, fontSize, fontWeight}: ISettingSidebar) => {
  const ref = useCloseOutside(close);
  
  const sampleCss: CSSProperties = {
    fontSize: fontSize,
    fontWeight: fontWeight
  }
  
  const changeSettings = <K extends keyof ISettings>(key: K, value: ISettings[K]) => {
    setSettings({
      ...settings,
      [key]: value
    });
  }
  
  const onChangeFont = (type: 'size' | 'weight', dir: 'up' | 'down') => {
    const isSize = type === 'size';
    const delta = dir === 'up' ? 1 : -1;
    const prevValue = isSize ? settings.fontSize : settings.fontWeight;
    const nextValue = isSize ? prevValue + delta : prevValue + (delta * 100);
    
    const [min, max] = isSize ? [MIN_FONT_SIZE, MAX_FONT_SIZE] : [MIN_FONT_WEIGHT, MAX_FONT_WEIGHT];
    
    if (nextValue >= min && nextValue <= max) {
      changeSettings(isSize ? 'fontSize' : 'fontWeight', nextValue as ISettings["fontWeight"]);
    }
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
                disabled={settings.appearance === 'basic'}
                onClick={() => changeSettings('appearance', 'basic')}
              >
                Basic Style
              </button>
              <button
                className={settings.appearance === 'zen' ? styles.active : ''}
                disabled={settings.appearance === 'zen'}
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
                <button
                  className={settings.fontSize >= MAX_FONT_SIZE ? styles.disable_btn : ''}
                  disabled={settings.fontSize >= MAX_FONT_SIZE}
                  onClick={() => onChangeFont('size', 'up')}
                >
                  <BsPlus size={20} />
                </button>
                <button
                  className={settings.fontSize <= MIN_FONT_SIZE ? styles.disable_btn : ''}
                  disabled={settings.fontSize <= MIN_FONT_SIZE}
                  onClick={() => onChangeFont('size', 'down')}
                >
                  <HiOutlineMinus size={20} />
                </button>
              </div>
              <h3>Font Weight</h3>
              <div className={styles.btn_wrap}>
                <button
                  className={settings.fontWeight >= MAX_FONT_WEIGHT ? styles.disable_btn : ''}
                  disabled={settings.fontWeight >= MAX_FONT_WEIGHT}
                  onClick={() => onChangeFont('weight', 'up')}
                >
                  <BsPlus size={20} />
                </button>
                <button
                  className={settings.fontWeight <= MIN_FONT_WEIGHT ? styles.disable_btn : ''}
                  disabled={settings.fontWeight <= MIN_FONT_WEIGHT}
                  onClick={() => onChangeFont('weight', 'down')}
                >
                  <HiOutlineMinus size={20}/>
                </button>
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