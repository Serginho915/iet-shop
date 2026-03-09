"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LocalizedLink as Link } from "@/components/ui/LocalizedLink/LocalizedLink";
import styles from "./CheckoutPage.module.scss";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs/Breadcrumbs";
import { Course, getCourseBySlug, submitConsultation } from "@/lib/api";
import { useTranslate } from "@/lib/useTranslate";
import { useCourse } from "@/lib/CourseContext";
import { translations } from "./translations";
import { LanguageDropdown } from "@/components/header/LanguageDropdown/LanguageDropdown";
import { useFormLogic } from "@/lib/useFormLogic";
import { Button } from "@/components/ui/Button/Button";
import { Logo } from "@/components/header/Logo/Logo";

interface CheckoutPageProps {
  slug: string;
  course?: Course;
}

import { PrivacyPolicyModal } from "@/components/ui/PrivacyPolicyModal/PrivacyPolicyModal";

export const CheckoutPage = ({ slug, course: initialCourse }: CheckoutPageProps) => {
  const router = useRouter();
  const { t, lang } = useTranslate(translations);
  const { selectedCourse } = useCourse();
  const [fetchedCourse, setFetchedCourse] = useState<Course | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Use context data if available (fast transition) or prop from server or client-side fetch fallback
  const course = useMemo(() => {
    if (selectedCourse && selectedCourse.slug === slug) return selectedCourse;
    if (initialCourse) return initialCourse;
    return fetchedCourse;
  }, [selectedCourse, initialCourse, fetchedCourse, slug]);

  useEffect(() => {
    if (!course && slug) {
      const fetchFallback = async () => {
        setIsFetching(true);
        try {
          const data = await getCourseBySlug(slug);
          setFetchedCourse(data);
        } catch (err) {
          console.error("Failed to fetch course fallback:", err);
        } finally {
          setIsFetching(false);
        }
      };
      fetchFallback();
    }
  }, [course, slug]);

  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    handleChange,
    setField,
    handleSubmit,
    validateForm,
    setFormData,
    setErrors
  } = useFormLogic(course?.id || 0);

  const handlePayNow = () => {
    if (validateForm()) {
      router.push(`/${lang}/#consultation`);
    }
  };

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

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          <div className={styles.inner}>
            <Logo />

            <div className={styles.navbarDesktop}>
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topContent}>

          <Breadcrumbs
            items={[
              { label: t.breadcrumbsCourses, href: "/#courses" },
              { label: course?.title || slug, href: `/courses/${slug}` },
              { label: t.breadcrumbsCheckout },
            ]}
          />
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>{t.title}</h1>

          {isFetching && !course ? (
            <div className={styles.loadingWrapper}>
              <p>{t.loadingLabel}</p>
            </div>
          ) : isSuccess ? (
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

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                      maxLength={7}
                    />
                  </div>
                  {errors.phone && <span className={styles.errorText}>{t.errorPhone}</span>}
                </div>

                <div className={styles.privacyGroup}>
                  <div className={styles.privacyLabel} onClick={() => setField('privacyAccepted', !formData.privacyAccepted)}>
                    <div className={`${styles.checkbox} ${formData.privacyAccepted ? styles.checked : ""} ${errors.privacy ? styles.errorCheck : ""}`}>
                      {formData.privacyAccepted && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className={styles.privacyText}>
                      {t.privacyPrefix}
                      <span className={styles.privacyLink} onClick={(e) => { e.stopPropagation(); setIsPrivacyOpen(true); }}>{t.privacyLink}</span>
                      {t.privacySuffix}
                    </span>
                  </div>
                  {errors.privacy && <span className={styles.errorText}>{t.errorPrivacy}</span>}
                </div>

                {submitError && <div className={styles.errorText} style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>{submitError}</div>}

                <div className={styles.buttons}>
                  <Button
                    type="button"
                    className={styles.payButton}
                    isLoading={isSubmitting}
                    variant="dark-outline"
                    size="custom"
                    onClick={handlePayNow}
                  >
                    {t.payNowButton}
                  </Button>
                  <Button
                    type="submit"
                    className={styles.requestButton}
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    variant="primary"
                    size="custom"
                  >
                    {t.leaveRequestButton}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
        <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      </main>
    </div>
  );
};

