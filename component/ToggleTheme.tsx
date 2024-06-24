'use client';

import {useEffect, useState} from "react";
import {LuSunMedium} from "react-icons/lu";
import {IoMoonSharp} from "react-icons/io5";
import LocalStorage from "@/scripts/LocalStorage";
import styled from "styled-components";


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
    <Button onClick={toggleTheme}>
      {theme === 'light' ? <LuSunMedium /> : <IoMoonSharp />}
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  svg {
    width: 1.3rem;
    height: 1.3rem;
  }
`;

export default ToggleTheme;