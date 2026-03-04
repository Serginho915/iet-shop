"use client";

import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown/Dropdown";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "./translations";
import styles from "./CoursesDropdown.module.scss";

export const CoursesDropdown = () => {
    const { lang } = useLanguage();
    const tr = translations[lang];

    const courseLinks = [
        { label: tr.allCourses, href: "/#courses" },
        { label: tr.online, href: "/?courseType=online#courses" },
        { label: tr.offline, href: "/?courseType=offline#courses" },
        { label: tr.hybrid, href: "/?courseType=hybrid#courses" },
    ];

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const [path, hash] = href.split('#');
        // Check if we are on the same page (considering the lang prefix)
        const currentPurePath = window.location.pathname.replace(`/${lang}`, '') || '/';
        const targetPurePath = path || '/';

        if (hash && (currentPurePath === targetPurePath)) {
            const el = document.getElementById(hash);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
                // Update hash in URL without jump
                window.history.pushState(null, '', href.startsWith('/') ? href : `/${lang}${href}`);
            }
        }
    };

    return (
        <Dropdown
            trigger={
                <Link
                    href="/#courses"
                    className={styles.navLink}
                    onClick={(e) => handleAnchorClick(e, '/#courses')}
                >
                    {tr.courses}
                </Link>
            }
        >
            {courseLinks.map(({ label, href }) => (
                <DropdownItem key={href}>
                    <Link
                        href={href}
                        style={{ width: '100%', display: 'block' }}
                        onClick={(e) => handleAnchorClick(e, href)}
                    >
                        {label}
                    </Link>
                </DropdownItem>
            ))}
        </Dropdown>
    );
};
