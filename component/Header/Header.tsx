'use client';

import styles from "./Header.module.css";
import Link from "next/link";
import {Playfair_Display} from "next/font/google";
import ToggleTheme from "@/component/ToggleTheme/ToggleTheme";
import TextWriterAnimation from "@/component/TextWriterAnimation/TextWriterAnimation";
import {useState} from "react";
import {usePathname} from "next/navigation";
import headers from "@/static/header";


const font = Playfair_Display({ subsets: ["latin"]});

const Header = () => {
  const pathname = usePathname();
  const [reWriteLogo, setReWriteLogo] = useState(false);
  
  const toggleRewriteLogo = () => {
    setReWriteLogo(prev => !prev);
  }
  
  const onClickLogo = () => {
    if (pathname === '/') {
      toggleRewriteLogo();
    }
  }
  
  
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={'/'} className={`${font.className} ${styles.logo}`} onClick={onClickLogo}>
          <TextWriterAnimation text={'INCODE8'} delay={80} rewrite={reWriteLogo} playOnRender={false} />
        </Link>
        <div className={styles.link_wrap}>
          {headers.map((item, index) => (
            <Link key={index} href={item.link} className={`${pathname===item.link ? styles.active : ''}`}>
              {item.title}
            </Link>
          ))}
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}

export default Header;