"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { Navbar } from "@/components/header/navbar/navbar";
import { IconBag, IconUser, IconMenu, IconClose } from "@/components/icons";
import { RequestButton } from "@/components/header/RequestButton/RequestButton";
import { LanguageDropdown } from "@/components/header/LanguageDropdown/LanguageDropdown";
import logo from "@/assets/logo-iet.jpg";
import styles from "./Header.module.scss";

export const Header = () => {
  const [visible, setVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      if (currentScrollY < 80) {
        setVisible(true);
      } else {
        setVisible(!scrollingDown);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={`${styles.header} ${visible ? styles.headerVisible : styles.headerHidden} ${isMenuOpen ? styles.menuOpen : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.inner}>
            {/* LOGO + NAV */}
            <div className={styles.left}>
              <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
                <Image
                  src={logo}
                  className={styles.logoImage}
                  alt="IET Shop Logo"
                />{" "}
              </Link>

              <div className={styles.navbarDesktop}>
                <Navbar />
              </div>
            </div>

            {/* ACTIONS */}
            <div className={styles.actions}>
              <div className={styles.userGroup}>
                {/* <Link href="/cart" className={styles.actionIcon} onClick={() => setIsMenuOpen(false)}>
                  <IconBag />
                </Link> */}

                <div className={styles.languageMobileHidden}>
                  <LanguageDropdown />
                </div>

                <Link href="/account" className={styles.actionIcon} onClick={() => setIsMenuOpen(false)}>
                  <IconUser />
                </Link>
              </div>

              <div className={styles.requestBtnDesktop}>
                <RequestButton />
              </div>

              <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Toggle menu">
                {isMenuOpen ? <IconClose /> : <IconMenu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuContent}>
          <Navbar onLinkClick={() => setIsMenuOpen(false)} />
          <div className={styles.mobileMenuActions}>
            <LanguageDropdown />
            <RequestButton />
          </div>
        </div>
      </div>
    </>
  );
};
