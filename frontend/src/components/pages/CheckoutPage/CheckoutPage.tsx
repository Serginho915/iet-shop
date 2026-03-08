"use client";

import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import styles from "./CheckoutPage.module.scss";

interface CheckoutPageProps {
    slug: string;
}

export const CheckoutPage = ({ slug }: CheckoutPageProps) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* TODO: Implement checkout form and course summary */}
                    <h1 className={styles.title}>Checkout</h1>
                    <p className={styles.subtitle}>Course: <strong>{slug}</strong></p>
                </div>
            </main>
            <Footer />
        </div>
    );
};
