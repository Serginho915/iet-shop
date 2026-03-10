"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./EventRegistrationModal.module.scss";
import { Modal } from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import { IconClock, IconLocation } from "@/components/icons";
import { useFormLogic } from "@/lib/useFormLogic";
import { Event, submitEventRequest } from "@/lib/api";
import { useTranslate } from "@/lib/useTranslate";
import { PrivacyPolicyModal } from "@/components/ui/PrivacyPolicyModal/PrivacyPolicyModal";

const modalTranslations = {
    bg: {
        namePlaceholder: "Име",
        emailPlaceholder: "Email",
        phonePlaceholder: "XXXXXXX",
        privacyPrefix: "Съгласен съм с ",
        privacyLink: "Политиката за поверителност",
        privacySuffix: " и обработката на лични данни.",
        buttonLabel: "Присъедини се",
        successMessage: "Успешно се регистрирахте за събитието!",
        errorName: "Моля, въведете вашето име.",
        errorEmail: "Моля, въведете валиден имейл адрес.",
        errorPhone: "Моля, въведете валиден телефонен номер.",
        errorPrivacy: "Трябва да се съгласите с политиката за поверителност.",
        leaveContacts: "Оставете Вашите Контакти",
        leave: "Оставете",
        yourContacts: "Вашите Контакти"
    },
    en: {
        namePlaceholder: "Name",
        emailPlaceholder: "Email",
        phonePlaceholder: "XXXXXXX",
        privacyPrefix: "I agree to the ",
        privacyLink: "Privacy Policy",
        privacySuffix: " and personal data processing.",
        buttonLabel: "Join",
        successMessage: "Successfully registered for the event!",
        errorName: "Please enter your name.",
        errorEmail: "Please enter a valid email address.",
        errorPhone: "Please enter a valid phone number.",
        errorPrivacy: "You must agree to the privacy policy.",
        leaveContacts: "Leave Your Contacts",
        leave: "Leave",
        yourContacts: "Your Contacts"
    }
};

interface EventRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null;
}

export const EventRegistrationModal = ({ isOpen, onClose, event }: EventRegistrationModalProps) => {
    const { t, lang } = useTranslate(modalTranslations);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const {
        formData,
        errors,
        isSubmitting,
        isSuccess,
        submitError,
        handleChange,
        setField,
        handleSubmit,
        setFormData,
        setErrors
    } = useFormLogic(0, false); // requireInterested = false

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen && event) {
            setFormData({
                name: "",
                email: "",
                phone: "",
                interested: event.id,
                privacyAccepted: false,
            });
            setErrors({
                name: false,
                email: false,
                phone: false,
                interested: false,
                privacy: false,
            });
        }
    }, [isOpen, event, setFormData, setErrors]);

    if (!event) return null;

    // Localize event title
    const eventTitle = typeof event.title === 'object' && event.title
        ? ((event.title as any)[lang] || (event.title as any).en || (event.title as any).bg || "")
        : event.title;

    // Formatting date
    const dateObj = new Date(event.date);
    const formattedDate = !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
        : event.date;

    const handleFormSubmit = (e: React.FormEvent) => {
        handleSubmit(e, submitEventRequest);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                className={styles.modalBody}
                contentClassName={styles.modalContentWrapper}
                overlayClassName={styles.overlay}
            >

                {isSuccess ? (
                    <div className={styles.successMessage}>
                        <h3>{t.successMessage}</h3>
                        <Button onClick={onClose} variant="primary" rounded="full" className={styles.closeBtn}>
                            Close
                        </Button>
                    </div>
                ) : (
                    <div className={styles.modalContent}>
                        {/* Header Info (Avatars, Date, Title, Tags) */}
                        <div className={styles.eventInfo}>
                            <div className={styles.topRow}>
                                <div className={styles.avatars}>
                                    <div className={styles.avatar}>
                                        <Image src={event.image_1 || ""} alt="Event Image 1" width={52} height={51} className={styles.img} />
                                    </div>
                                    <div className={styles.avatar}>
                                        <Image src={event.image_2 || ""} alt="Event Image 2" width={52} height={51} className={styles.img} />
                                    </div>
                                </div>
                                <div className={styles.dateRow}>
                                    <IconClock className={styles.icon} />
                                    <span className={styles.date}>{formattedDate}</span>
                                </div>
                            </div>

                            <h2 className={styles.title}>{String(eventTitle || "")}</h2>

                            <div className={styles.tagsRow}>
                                <span className={styles.tag}>Free</span>
                                {event.tags && event.tags.map((tag: any, idx) => {
                                    const tagName = typeof tag === 'object' && tag
                                        ? (tag.name?.[lang] || tag[lang] || tag.name || tag.name_en || tag.name_bg || "")
                                        : tag;
                                    return <span key={idx} className={styles.tag}>{String(tagName || "")}</span>;
                                })}
                                <span className={`${styles.tag} ${styles.typeTag}`}>
                                    <IconLocation className={styles.icon} />
                                    {event.type === 'hybrid' ? 'Online/Offline' : event.type === 'online' ? 'Online' : 'Offline'}
                                </span>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className={styles.formSection}>
                            <h3 className={styles.formTitle}>
                                <span className={styles.leaveText}>{t.leave} </span>
                                <span className={styles.contactsText}>{t.yourContacts}</span>
                            </h3>

                            <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
                                {/* Inputs reused from ConsultationSection styling matching */}
                                <div className={styles.inputGroup}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={t.namePlaceholder}
                                        className={`${styles.field} ${errors.name ? styles.hasError : ''}`}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <span className={styles.errorText}>{t.errorName}</span>}
                                </div>

                                <div className={styles.inputGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={t.emailPlaceholder}
                                        className={`${styles.field} ${errors.email ? styles.hasError : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className={styles.errorText}>{t.errorEmail}</span>}
                                </div>

                                <div className={styles.inputGroup}>
                                    <div className={`${styles.phoneFieldWrapper} ${errors.phone ? styles.hasError : ''}`}>
                                        <div className={styles.flagWrapper}>
                                            {/* Bulgaria flag SVG */}
                                            <svg width="20" height="14" viewBox="0 0 20 14" className={styles.flag}>
                                                <rect width="20" height="14" fill="white" />
                                                <rect y="0" width="20" height="4.67" fill="white" />
                                                <rect y="4.67" width="20" height="4.67" fill="#00966E" />
                                                <rect y="9.33" width="20" height="4.67" fill="#D62612" />
                                            </svg>
                                            <span className={styles.countryCode}>+359</span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder={t.phonePlaceholder}
                                            className={styles.phoneInput}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength={7}
                                        />
                                    </div>
                                    {errors.phone && <span className={styles.errorText}>{t.errorPhone}</span>}
                                </div>

                                {/* Privacy Checkbox */}
                                <div className={styles.privacyGroup}>
                                    <div className={styles.privacy} onClick={() => setField('privacyAccepted', !formData.privacyAccepted)}>
                                        <div className={`${styles.checkboxWrapper} ${formData.privacyAccepted ? styles.checked : ''} ${errors.privacy ? styles.hasError : ''}`}>
                                            {formData.privacyAccepted && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={styles.privacyText}>
                                            {t.privacyPrefix}
                                            <span className={styles.link} onClick={(e) => { e.stopPropagation(); setIsPrivacyOpen(true); }}>
                                                {t.privacyLink}
                                            </span>
                                            {t.privacySuffix}
                                        </span>
                                    </div>
                                    {errors.privacy && <span className={styles.errorText}>{t.errorPrivacy}</span>}
                                </div>

                                {submitError && <div className={styles.errorText} style={{ textAlign: 'center' }}>{submitError}</div>}

                                <div className={styles.submitWrapper}>
                                    <Button
                                        type="submit"
                                        className={styles.submitButton}
                                        isLoading={isSubmitting}
                                        variant="primary"
                                        size="lg"
                                        rounded="full"
                                    >
                                        {t.buttonLabel}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Modal>
            <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        </>
    );
};
