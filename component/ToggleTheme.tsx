import {useEffect, useState} from "react";
import {LuSunMedium} from "react-icons/lu";
import {IoMoonSharp} from "react-icons/io5";
import LocalStorage from "@/scripts/LocalStorage";

const ToggleTheme = () => {
  const [theme, setTheme] = useState('');
  
  useEffect(() => {
    const currentTheme = LocalStorage.getItem('theme') || 'dark';
    if (!theme) {
      setTheme(currentTheme);
      document.documentElement.setAttribute('data-theme', currentTheme);
      return;
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    const result = theme === 'light' ? 'dark' : 'light';
    LocalStorage.setItem('theme', result);
    setTheme(result);
  }
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ?
        <LuSunMedium /> :
        <IoMoonSharp />
      }
    </button>
  );
}

export default ToggleTheme;