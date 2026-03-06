"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { Navbar } from "@/components/header/navbar/navbar";
import { IconUser, IconMenu, IconClose } from "@/components/icons";
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

  // Lock body scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.header} ${visible ? styles.headerVisible : styles.headerHidden}`}
      >
        <div className={styles.container}>
          <div className={styles.inner}>
            {/* LOGO + NAV */}
            <div className={styles.left}>
              <Link href="/" className={styles.logo} onClick={closeMenu}>
                <Image
                  src={logo}
                  className={styles.logoImage}
                  alt="IET Shop Logo"
                />
              </Link>

              <div className={styles.navbarDesktop}>
                <Navbar />
              </div>
            </div>

            {/* ACTIONS */}
            <div className={styles.actions}>
              <div className={styles.userGroup}>
                <div className={styles.languageMobileHidden}>
                  <LanguageDropdown />
                </div>

                <Link href="/account" className={styles.actionIcon} onClick={closeMenu}>
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

      {/* OVERLAY */}
      <div
        className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.overlayVisible : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* MOBILE MENU DRAWER */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuContent}>
          <Navbar onLinkClick={closeMenu} />
          <div className={styles.mobileMenuActions}>
            <LanguageDropdown />
            <RequestButton />
          </div>
        </div>
      </div>
    </>
  );
};
