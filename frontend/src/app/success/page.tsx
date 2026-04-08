import Link from "next/link";

export default function SuccessPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
      <section style={{ maxWidth: "560px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>Payment Successful</h1>
        <p style={{ marginBottom: "16px" }}>
          Thank you. Your payment was completed in Stripe test mode.
        </p>
        <Link href="/bg">Back to home</Link>
      </section>
    </main>
  );
}
