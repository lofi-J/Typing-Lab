import styles from "./SettingSidebar.module.css";
import React, {SetStateAction} from "react";
import { IoClose } from "react-icons/io5";
import useCloseOutside from "@/hooks/useCloseOutside";
import {ISettings} from "@/static/settings";
import { GiSpeaker } from "react-icons/gi";
import { GiSpeakerOff } from "react-icons/gi";


interface ISettingSidebar {
  close: () => void;
  settings: ISettings;
  setSettings: React.Dispatch<SetStateAction<ISettings>>;
}
const SettingSidebar = ({close, settings, setSettings}: ISettingSidebar) => {
  const ref = useCloseOutside(close);
  
  const changeSettings = <K extends keyof ISettings>(key: K, value: ISettings[K]) => {
    setSettings({
      ...settings,
      [key]: value
    });
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
              <span
                className={settings.appearance === 'basic' ? styles.active : ''}
                onClick={() => changeSettings('appearance', 'basic')}
              >
                Basic Style
              </span>
              <span
                className={settings.appearance === 'zen' ? styles.active : ''}
                onClick={() => changeSettings('appearance', 'zen')}
              >
                Zen Mode
              </span>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={styles.wrap}>
            <h2 className={styles.subtitle}>sound</h2>
            <div className={styles.sound}>
              {settings.soundLevel === 0 ?
                <GiSpeakerOff size={18}/> : <GiSpeaker size={18}/>
              }
              <input type="range"/>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={styles.wrap}>
            <h2 className={styles.subtitle}>font</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingSidebar;