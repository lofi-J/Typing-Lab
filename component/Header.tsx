import Link from "next/link";
import styles from "@/styles/Header.module.css";
import {Playfair_Display} from "next/font/google";


const font = Playfair_Display({ subsets: ["latin"]});

const Header = () => {
  return (
    <header className={styles.header}>
        <a href="/" className={`${font.className} ${styles.logo}`}>Lofi Typing</a>
      <nav>
        <Link href={'/'} className={''}></Link>
      </nav>
    </header>
  );
}

export default Header;