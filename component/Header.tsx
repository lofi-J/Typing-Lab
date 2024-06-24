import Link from "next/link";
import styles from "@/styles/Header.module.css";
import {Playfair_Display} from "next/font/google";
import ToggleTheme from "@/component/ToggleTheme";


const font = Playfair_Display({ subsets: ["latin"]});

const Header = () => {
  
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={'/'} className={`${font.className} ${styles.logo}`}>Lofi Typing</Link>
        <div className={styles.link_wrap}>
          <Link href={'/typing'}>Typing</Link>
          <Link href={'/auth'}>Login</Link>
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}

export default Header;