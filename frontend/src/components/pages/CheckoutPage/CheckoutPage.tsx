"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import logo from "@/assets/logo-iet.jpg";
import styles from "./CheckoutPage.module.scss";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Course } from "@/lib/api";
import { useTranslate } from "@/lib/useTranslate";
import { useCourse } from "@/lib/CourseContext";
import { translations } from "./translations";
import { LanguageDropdown } from "@/components/header/LanguageDropdown/LanguageDropdown";

interface CheckoutPageProps {
  slug: string;
  course?: Course;
}

export const CheckoutPage = ({ slug, course: initialCourse }: CheckoutPageProps) => {
  const { t, lang } = useTranslate(translations);
  const { selectedCourse } = useCourse();

  // Use context data if available (fast transition) or prop from server
  const course = useMemo(() => {
    if (selectedCourse && selectedCourse.slug === slug) return selectedCourse;
    return initialCourse;
  }, [selectedCourse, initialCourse, slug]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    privacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formattedDate = useMemo(() => {
    const dateValue = course?.start;
    if (!dateValue) return "---";

    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return dateValue;

      return date.toLocaleDateString(
        lang === "bg" ? "bg-BG" : "en-GB",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    } catch (e) {
      return dateValue;
    }
  }, [course?.start, lang]);

  const priceBgn = useMemo(() => {
    const price = course?.price ?? 0;
    return (price * 1.6627).toFixed(2);
  }, [course?.price]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateBGPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, "");
    return cleaned.length >= 7;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name.trim() === "",
      email: !validateEmail(formData.email),
      phone: !validateBGPhone(formData.phone),
      privacy: !formData.privacyAccepted,
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((v) => v)) {
      setIsSubmitting(true);
      try {
        setIsSuccess(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          <div className={styles.inner}>
            <Link href="/" className={styles.logo}>
              <Image
                src={logo}
                className={styles.logoImage}
                alt="IET Shop Logo"
              />
            </Link>
            <div className={styles.headerActions}>
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Breadcrumbs
            items={[
              { label: t.breadcrumbsCourses, href: "/#courses" },
              { label: course?.title || slug, href: `/courses/${slug}` },
              { label: t.breadcrumbsCheckout },
            ]}
          />
          <h1 className={styles.title}>{t.title}</h1>

          {isSuccess ? (
            <div className={styles.successWrapper}>
              <p className={styles.successMessage}>{t.successMessage}</p>
            </div>
          ) : (
            <div className={styles.checkoutContent}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryTop}>
                  <div className={styles.courseThumb}>
                    {course?.image ? (
                      <Image
                        src={course.image}
                        alt={course.title || "Course"}
                        width={400}
                        height={300}
                        className={styles.thumbImage}
                        priority
                      />
                    ) : (
                      <div className={styles.thumbPlaceholder} />
                    )}
                  </div>
                  <div className={styles.summaryInfo}>
                    <div className={styles.infoBox}>
                      <span className={styles.infoLabel}>{t.startLabel}</span>
                      <span className={styles.infoDate}>{formattedDate}</span>
                    </div>
                    <div className={styles.infoBox}>
                      <span className={styles.infoLabel}>{t.priceLabel}</span>
                      <div className={styles.priceColumn}>
                        <span className={styles.priceValue}>
                          {t.currency}{course?.price ?? 0}
                        </span>
                        <span className={styles.priceSub}>
                          {priceBgn} {t.currencyBgn}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.summaryCourse}>
                  <div className={styles.dot} />
                  <span className={styles.summaryTitle}>
                    {course?.title || slug}
                  </span>
                </div>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    placeholder={t.namePlaceholder}
                    className={`${styles.input} ${errors.name ? styles.hasError : ""}`}
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
                    className={`${styles.input} ${errors.email ? styles.hasError : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className={styles.errorText}>{t.errorEmail}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <div className={`${styles.phoneWrapper} ${errors.phone ? styles.hasError : ""}`}>
                    <div className={styles.flagBox}>
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
                    />
                  </div>
                  {errors.phone && <span className={styles.errorText}>{t.errorPhone}</span>}
                </div>

                <div className={styles.privacyGroup}>
                  <label className={styles.privacyLabel}>
                    <div className={`${styles.checkbox} ${formData.privacyAccepted ? styles.checked : ""} ${errors.privacy ? styles.errorCheck : ""}`}>
                      <input
                        type="checkbox"
                        name="privacyAccepted"
                        checked={formData.privacyAccepted}
                        onChange={handleChange}
                        className={styles.hiddenCheck}
                      />
                      {formData.privacyAccepted && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className={styles.privacyText}>
                      {t.privacyPrefix}
                      <Link href="/privacy" className={styles.privacyLink}>{t.privacyLink}</Link>
                      {t.privacySuffix}
                    </span>
                  </label>
                  {errors.privacy && <span className={styles.errorText}>{t.errorPrivacy}</span>}
                </div>

                <div className={styles.buttons}>
                  <button type="submit" className={isSubmitting ? styles.loading : styles.payButton} disabled={isSubmitting}>
                    {t.payNowButton}
                  </button>
                  <button type="button" className={styles.requestButton} onClick={handleSubmit} disabled={isSubmitting}>
                    {t.leaveRequestButton}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
