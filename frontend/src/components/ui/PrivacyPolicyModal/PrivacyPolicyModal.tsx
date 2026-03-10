"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { useTranslate } from "@/lib/useTranslate";
import styles from "./PrivacyPolicyModal.module.scss";

const privacyTranslations = {
    bg: {
        title: "Политика за поверителност на личните данни",
        content: `
            <p>Настоящата политика за поверителност за правата на лицата по отношение на защитата на личните им данни влиза в сила от 23 май 2018 г.</p>
            
            <h3>Обща информация</h3>
            <p>От 25 май 2018 г. влиза в сила нов регламент за защита на личните данни (General Data Protection Regulation), приет от Европейския съюз. Регламентът има за цел да гарантира защитата на личните данни на физическите лица от всички държави членки на Европейския съюз и да уеднакви регулациите за последващата им обработка. В качеството си на администратор на лични данни, свързани с предоставянето на услуги, “Иновативни образователни технологии” ЕООД („дружеството“, „ние“, „нас“) отговаря на всички изисквания на новата регулация, като събира данни единствено дотолкова, доколкото са необходими за предоставянето на съответните услуги и ги пази отговорно и законосъобразно.</p>
            <p>Чрез преглеждането или използването на корпоративния уеб сайт www.obucheniya.com и предоставената форма за контакт, Вие се съгласявате с условията на настоящата политика за поверителност на личните данни на “Иновативни образователни технологии” ЕООД. В случай, че не сте съгласни с условията, не влизайте и не използвайте този уеб сайт.</p>
            
            <h3>Какво представляват лични данни?</h3>
            <p>Лични данни са всяка информация, свързана с идентифицирано или подлежащо на идентификация физическо лице (като електронен адрес, имена, възраст, дата на раждане, телефон и други).</p>
            
            <h3>Кой администрира личните Ви данни?</h3>
            <p>Администратор на личните данни е “Иновативни образователни технологии” ЕООД, ЕИК: 204288121, с адрес на управление гр. София (1000), р-н Средец, ул. ГРАФ ИГНАТИЕВ, 12, ет. 3, email: office.inovativni@gmail.com</p>
            
            <h3>Какви лични данни се събират?</h3>
            <p>Ако решите да използвате формата за контакт, се събира информация за Вашите имена, email адрес и телефон, както и други данни, които решите да предоставите чрез съобщението Ви. При записване по телефон се събират имена, номер и информация за услугата.</p>

            <h3>Автоматично получаване на информация (Cookies)</h3>
            <p>При посещение на сайта се събира техническа информация с цел статистика (IP адрес, тип устройство, разгледани страници). Тази информация е анонимна и се събира чрез „бисквитки“ (cookies).</p>

            <h3>Предоставяне на данни при законова заявка</h3>
            <p>Можем да предоставим Вашите данни само когато сме законово задължени – при съдебни процедури или по искане на правоприлагащи органи.</p>

            <h3>Как можете да отмените Вашето съгласие?</h3>
            <p>Имате право да оттеглите съгласието си по всяко време чрез съобщение на office.inovativni@gmail.com.</p>

            <h3>За какъв период се съхранява информацията?</h3>
            <p>Данните се съхраняват само за периода, необходим за изпълнение на целите, освен ако законът не изисква по-дълъг срок.</p>

            <h3>Какви права имате?</h3>
            <ul>
                <li>Право на достъп до личните Ви данни;</li>
                <li>Право на коригиране, заличаване или блокиране;</li>
                <li>Право на възражение срещу обработването;</li>
                <li>Право на жалба до Комисия за защита на личните данни (kzld@cpdp.bg).</li>
            </ul>

            <h3>Лични данни на деца</h3>
            <p>Ние не събираме информация от деца под 14 години. Ако установим такова събиране, данните ще бъдат изтрити незабавно.</p>
            
            <p>Пълният текст на политиката е актуализиран последно на 23 май 2018 г.</p>
        `
    },
    en: {
        title: "Privacy Policy",
        content: `
            <p>This privacy policy regarding the rights of individuals with respect to the protection of their personal data is effective as of May 23, 2018.</p>
            
            <h3>General Information</h3>
            <p>"Innovative Educational Technologies" Ltd. ("the company", "we", "us") collects data only to the extent necessary for providing services and keeping it responsibly and lawfully under GDPR regulations.</p>
            
            <h3>What are personal data?</h3>
            <p>Personal data is any information relating to an identified or identifiable natural person (such as email, names, age, phone number, etc.).</p>
            
            <h3>Who administers your data?</h3>
            <p>"Innovative Educational Technologies" Ltd., UIC: 204288121, Sofia (1000), 12 Graf Ignatiev Str., email: office.inovativni@gmail.com</p>
            
            <h3>Data Collection and Usage</h3>
            <p>We collect data through contact forms or during consultations. This data is used solely for providing services and communicating with clients.</p>

            <h3>Cookies and Technical Info</h3>
            <p>We collect anonymous technical data (IP, device type) for statistical purposes via cookies to improve your user experience.</p>

            <h3>Your Rights</h3>
            <ul>
                <li>Right to access, correct, or delete your data;</li>
                <li>Right to withdraw consent at any time (contact office.inovativni@gmail.com);</li>
                <li>Right to lodge a complaint with the regulatory authority.</li>
            </ul>

            <h3>Children's Data</h3>
            <p>We do not knowingly collect data from children under 14. Such data will be deleted immediately upon discovery.</p>
        `
    }
};

interface PrivacyPolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
    const { t } = useTranslate(privacyTranslations);

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
