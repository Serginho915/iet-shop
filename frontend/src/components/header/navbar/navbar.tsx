"use client";

import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { CoursesDropdown } from "@/components/header/CoursesDropdown/CoursesDropdown";
import { useLanguage } from "@/lib/LanguageContext";
import { NavLinks, type SimpleLink } from "@/components/ui/NavLinks/NavLinks";
import { translations } from "./translations";
import styles from "./Navbar.module.scss";

type NavKey = keyof typeof translations.en;

interface NavLink {
  key: NavKey;
  href: string;
}

const navLinks: NavLink[] = [
  { key: "events", href: "/#events" },
  { key: "blog", href: "/#blog" },
  { key: "contact", href: "/#consultation" },
];

export const Navbar = () => {
  const { lang } = useLanguage();
  const tr = translations[lang];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split('#');
    if (hash && (window.location.pathname === path || (path === '/' && window.location.pathname === ''))) {
      if (window.location.hash === '#' + hash) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const simpleLinks: SimpleLink[] = navLinks.map((link) => ({
    label: tr[link.key],
    href: link.href,
    onClick: (e: any) => handleAnchorClick(e, link.href),
  }));

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <CoursesDropdown />
        </li>
        <NavLinks links={simpleLinks} linkClassName={styles.navLink} asListItems />
      </ul>
    </nav>
  );
};
