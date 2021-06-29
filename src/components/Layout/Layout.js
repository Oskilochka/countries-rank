import styles from "./Layout.module.css";
import Head from "next/head";
import React, {useState} from "react";
import Link from 'next/link'
import {Brightness6Rounded} from "@material-ui/icons";

export const Layout = ({children, title = 'Countries Rank'}) => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            setTheme('light')
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/images/logo.png"/>
            </Head>

            <header className={styles.header}>
                    <Link href='/' >
                        <div className={styles.headerWrap}>
                            <img src='/images/logo.png' className={styles.headerLogo}/>
                            <h1 className={styles.headerTitle}>Countries <span className={styles.rank}>Rank</span></h1>
                        </div>
                    </Link>
                    <button className={styles.themeToggle} onClick={toggleTheme}>
                        <Brightness6Rounded />
                    </button>

            </header>

            <main>
                {children}
            </main>

            <footer>
                <h5 className={styles.footerInfo}>Made by <a className={styles.footerGit}
                                                             href='https://github.com/Oskilochka'>oskilochka</a></h5>
            </footer>
        </div>
    )
}