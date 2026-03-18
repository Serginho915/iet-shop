"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { useTranslate } from "@/lib/useTranslate";
import styles from "./CookiePolicyModal.module.scss";

const cookieTranslations = {
    bg: {
        title: "Политика за бисквитки",
        content: `
            <p>Последна актуализация: <strong>17 март 2026 г.</strong></p>

            <h3>1. Какво са бисквитките?</h3>
            <p>Бисквитките (cookies) са малки текстови файлове, съхранявани на Вашето устройство от уеб браузъра при посещение на сайт. Те изпълняват различни функции: запазват настройки, осигуряват сигурна навигация и помагат за анализ на трафика.</p>

            <h3>2. Видове бисквитки, които използваме</h3>
            <p><strong>Задължителни (Essential)</strong> — необходими за основните функции на сайта. Не могат да бъдат изключени.</p>
            <p><strong>Аналитични (Analytics)</strong> — активират се само при Ваше изрично съгласие. По подразбиране са изключени.</p>

            <h3>3. Таблица на бисквитките</h3>
            <table style="width:100%;border-collapse:collapse;font-size:0.85em;">
                <thead>
                    <tr style="background:#f5f5f5;">
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Наименование</th>
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Тип</th>
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Доставчик</th>
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Цел</th>
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Срок</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border:1px solid #ddd;padding:6px 8px;"><code>sessionid</code></td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Задължителна</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">1-ва страна (сървър)</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Идентифицира браузър сесията — използва се за анонимния чат и административния достъп</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">До 2 седмици</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;padding:6px 8px;"><code>csrftoken</code></td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Задължителна</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">1-ва страна (сървър)</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Защита от CSRF атаки при изпращане на форми</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">До края на сесията</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;padding:6px 8px;"><code>_ga</code></td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Аналитична</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Google (3-та страна)</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Различава потребители в Google Analytics</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">2 години</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;padding:6px 8px;"><code>_ga_*</code></td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Аналитична</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Google (3-та страна)</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Запазва статуса на Google Analytics сесия</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">2 години</td>
                    </tr>
                </tbody>
            </table>

            <h3>4. Съхранение в браузъра (localStorage)</h3>
            <p>В допълнение към бисквитките, сайтът използва localStorage за следните ключове:</p>
            <ul>
                <li><code>cookie-consent</code> — съхранява Вашите предпочитания за съгласие. Не се изпраща на сървъра.</li>
                <li><code>chatMessages</code> — временно съхранява историята на чат разговора за удобство при презареждане на страницата.</li>
            </ul>
            <p>Тези данни остават единствено на Вашето устройство и не се предават на трети страни.</p>

            <h3>5. Бисквитки на трети страни</h3>
            <p>Сайтът интегрира <strong>Google Analytics 4 (GA4)</strong>, предоставен от Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ирландия). При Ваше съгласие Google Analytics събира анонимизирани данни за поведението Ви (посетени страници, продължителност на сесията, тип устройство). Данните могат да бъдат обработени в центрове за данни извън ЕИП. Google е въвел стандартни договорни клаузи (СДК) като гаранция. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Политика за поверителност на Google</a></p>
            <p><strong>Важно:</strong> по подразбиране аналитичните бисквитки на Google са блокирани и се активират само след Вашето изрично съгласие.</p>

            <h3>6. Управление на бисквитките</h3>
            <ul>
                <li><strong>Чрез банера за съгласие:</strong> при първо посещение можете да приемете, откажете или персонализирате бисквитките.</li>
                <li><strong>Повторно отваряне на настройките:</strong> щракнете върху „Настройки за бисквитки" в долната навигация на сайта.</li>
                <li><strong>Чрез настройките на браузъра:</strong> Chrome → Настройки → Поверителност; Firefox → Настройки → Поверителност; Safari → Настройки → Поверителност; Edge → Настройки → Бисквитки.</li>
                <li><strong>Отказ от Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a></li>
            </ul>

            <h3>7. Съгласие и оттегляне</h3>
            <p>По подразбиране само задължителните бисквитки са активни. Аналитичните бисквитки на Google изискват Вашето изрично съгласие. Можете да го оттеглите по всяко време чрез банера за бисквитки.</p>
            <p>За въпроси: <a href="mailto:office.inovativni@gmail.com">office.inovativni@gmail.com</a></p>
        `
    },
    en: {
        title: "Cookie Policy",
        content: `
            <p>Last updated: <strong>March 17, 2026</strong></p>

            <h3>1. What Are Cookies?</h3>
            <p>Cookies are small text files stored on your device by the web browser when you visit a website. They perform various functions: preserving settings, enabling secure navigation, and helping analyse traffic.</p>

            <h3>2. Types of Cookies We Use</h3>
            <p><strong>Essential</strong> — necessary for the website to function properly. Cannot be disabled.</p>
            <p><strong>Analytics</strong> — activated only with your explicit consent. Disabled by default.</p>

            <h3>3. Cookie Table</h3>
            <table style="width:100%;border-collapse:collapse;font-size:0.85em;">
                <thead>
                    <tr style="background:#f5f5f5;">
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Name</th>
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Type</th>
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Provider</th>
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Purpose</th>
                        <th style="border:1px solid #ddd;padding:6px 8px;text-align:left;">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border:1px solid #ddd;padding:6px 8px;"><code>sessionid</code></td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Essential</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">1st party (server)</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Identifies your browser session — used for the anonymous chat and admin access</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Up to 2 weeks</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;padding:6px 8px;"><code>csrftoken</code></td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Essential</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">1st party (server)</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">CSRF protection for form submissions</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Session</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;padding:6px 8px;"><code>_ga</code></td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Analytics</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Google (3rd party)</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Distinguishes users in Google Analytics</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">2 years</td>
                    </tr>
                    <tr>
                        <td style="border:1px solid #ddd;padding:6px 8px;"><code>_ga_*</code></td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Analytics</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Google (3rd party)</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">Preserves Google Analytics session state</td>
                        <td style="border:1px solid #ddd;padding:6px 8px;">2 years</td>
                    </tr>
                </tbody>
            </table>

            <h3>4. Browser Storage (localStorage)</h3>
            <p>In addition to cookies, the site uses browser localStorage for:</p>
            <ul>
                <li><code>cookie-consent</code> — stores your consent preferences. Not transmitted to the server.</li>
                <li><code>chatMessages</code> — temporarily stores chat conversation history for convenience on page reload.</li>
            </ul>
            <p>This data stays only on your device and is not shared with third parties.</p>

            <h3>5. Third-Party Cookies</h3>
            <p>The site integrates <strong>Google Analytics 4 (GA4)</strong>, provided by Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland). With your consent, Google Analytics collects anonymised data about your behaviour (pages visited, session duration, device type). Data may be processed outside the EEA. Google has implemented Standard Contractual Clauses (SCCs) as a safeguard. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></p>
            <p><strong>Note:</strong> by default, Google Analytics cookies are blocked and are only activated upon your explicit consent.</p>

            <h3>6. Managing Cookies</h3>
            <ul>
                <li><strong>Through the consent banner:</strong> on first visit you can accept, decline, or customise cookies.</li>
                <li><strong>Reopen settings:</strong> click "Cookie Settings" in the site footer.</li>
                <li><strong>Through browser settings:</strong> Chrome → Settings → Privacy; Firefox → Settings → Privacy; Safari → Settings → Privacy; Edge → Settings → Cookies.</li>
                <li><strong>Opt out of Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a></li>
            </ul>

            <h3>7. Consent and Withdrawal</h3>
            <p>By default, only essential cookies are active. Google Analytics cookies require your explicit consent. You can withdraw it at any time via the cookie banner.</p>
            <p>For questions: <a href="mailto:office.inovativni@gmail.com">office.inovativni@gmail.com</a></p>
        `
    }
};

interface CookiePolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CookiePolicyModal = ({ isOpen, onClose }: CookiePolicyModalProps) => {
    const { t } = useTranslate(cookieTranslations);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={styles.modalBody}
            overlayClassName={styles.overlay}
        >
            <div className={styles.content}>
                <h2 className={styles.title}>{t.title}</h2>
                <div
                    className={styles.textBody}
                    dangerouslySetInnerHTML={{ __html: t.content }}
                />
            </div>
        </Modal>
    );
};
