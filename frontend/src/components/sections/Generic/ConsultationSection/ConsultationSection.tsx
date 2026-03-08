"use client";

import React, { useState } from 'react';
import { useTranslate } from "@/lib/useTranslate";
import { translations } from "./translations";
import styles from "./ConsultationSection.module.scss";
import { Button } from "@/components/ui/Button/Button";
import Link from 'next/link';
import { submitConsultation, Course } from '@/lib/api';

export const ConsultationSection = ({ courses = [] }: { courses?: Course[] }) => {
  const { t } = useTranslate(translations);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interested: 0,
    privacyAccepted: false
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    interested: false,
    privacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Type narrowing for checkbox Support
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'interested' ? Number(value) : value)
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
    setSubmitError('');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateBGPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^\d{7}$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const newErrors = {
      name: formData.name.trim() === '',
      email: !validateEmail(formData.email),
      phone: !validateBGPhone(formData.phone),
      interested: formData.interested === 0,
      privacy: !formData.privacyAccepted
    };

    setErrors(newErrors);

    const hasNoErrors = !Object.values(newErrors).some(val => val === true);

    if (hasNoErrors) {
      setIsSubmitting(true);
      try {
        await submitConsultation({
          name: formData.name,
          email: formData.email,
          phone: `+359${formData.phone.replace(/[\s\-\(\)]/g, '')}`,
          interested: formData.interested
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          interested: 0,
          privacyAccepted: false
        });
        setIsSuccess(true);
      } catch (err) {
        setSubmitError('An error occurred. Please try again.');
        console.error('Consultation submit error:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  return (
    <section id="consultation" className={styles.section}>
      <div className={styles.container}>
        {isSuccess ? (
          <div className={styles.simpleSuccess}>
            {t.successMessage}
          </div>
        ) : (
          <>
            <header className={styles.header}>
              <h2 className={styles.title}>{t.title}</h2>
              <p className={styles.description}>{t.description}</p>
            </header>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                    placeholder={t.phonePlaceholder || "XXXXXXX"}
                    className={styles.phoneInput}
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={7}
                  />
                </div>
                {errors.phone && <span className={styles.errorText}>{t.errorPhone}</span>}
              </div>

              <div className={styles.inputGroup} ref={dropdownRef}>
                <div
                  className={`${styles.field} ${styles.customSelect} ${errors.interested ? styles.hasError : ''} ${formData.interested === 0 ? styles.placeholderSelect : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={styles.selectValue}>
                    {formData.interested === 0
                      ? (t.selectCoursePlaceholder || t.interestPlaceholder)
                      : courses.find(c => c.id === formData.interested)?.title}
                  </span>
                  <svg
                    className={`${styles.chevronIcon} ${isDropdownOpen ? styles.open : ''}`}
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <ul className={styles.dropdownList}>
                    {courses.map((course) => (
                      <li
                        key={course.id}
                        className={`${styles.dropdownItem} ${formData.interested === course.id ? styles.selected : ''}`}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, interested: course.id }));
                          setIsDropdownOpen(false);
                          if (errors.interested) {
                            setErrors(prev => ({ ...prev, interested: false }));
                          }
                        }}
                      >
                        {course.title}
                      </li>
                    ))}
                  </ul>
                )}
                {errors.interested && <span className={styles.errorText}>{t.errorInterest}</span>}
              </div>

              <div className={styles.privacyGroup}>
                <div className={styles.privacy} onClick={() => setFormData(p => ({ ...p, privacyAccepted: !p.privacyAccepted }))}>
                  <div className={`${styles.checkboxWrapper} ${formData.privacyAccepted ? styles.checked : ''} ${errors.privacy ? styles.hasError : ''}`}>
                    {formData.privacyAccepted && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className={styles.privacyText}>
                    {t.privacyPrefix}
                    <Link href="/privacy" className={styles.link} onClick={(e) => e.stopPropagation()}>
                      {t.privacyLink}
                    </Link>
                    {t.privacySuffix}
                  </span>
                </div>
                {errors.privacy && <span className={styles.errorText}>{t.errorPrivacy}</span>}
              </div>

              {submitError && <div className={styles.errorText} style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>{submitError}</div>}

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
          </>
        )}
      </div>
    </section>
  );
};
