"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { adminLogin, adminMe } from "@/lib/admin";
import { getAdminTranslation } from "./translations";

import styles from "./AdminLoginScreen.module.scss";

interface AdminLoginScreenProps {
  lang: string;
}

export function AdminLoginScreen({ lang }: AdminLoginScreenProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isDisposed = false;

    const checkSession = async () => {
      try {
        await adminMe();
        if (!isDisposed) {
          router.replace(`/${lang}/admin`);
        }
      } catch {
        if (!isDisposed) {
          setIsCheckingSession(false);
        }
      }
    };

    void checkSession();

    return () => {
      isDisposed = true;
    };
  }, [lang, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError(getAdminTranslation(lang, "login.error-empty"));
      return;
    }

    setIsSubmitting(true);

    try {
      await adminLogin(username.trim(), password);
      router.replace(`/${lang}/admin`);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : getAdminTranslation(lang, "login.error-failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingSession) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field} htmlFor="admin-username">
            {getAdminTranslation(lang, "login.username")}
            <input
              id="admin-username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              disabled={isSubmitting}
              required
            />
          </label>

          <label className={styles.field} htmlFor="admin-password">
            {getAdminTranslation(lang, "login.password")}
            <input
              id="admin-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={isSubmitting}
              required
            />
          </label>

          {error ? <p className={styles.error}>{error}</p> : null}

          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            {isSubmitting ? getAdminTranslation(lang, "buttons.signing-in") : getAdminTranslation(lang, "buttons.sign-in")}
          </button>
        </form>
      </div>
    </main>
  );
}
