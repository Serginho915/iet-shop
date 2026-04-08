import Link from "next/link";

export default function CancelPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
      <section style={{ maxWidth: "560px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>Payment Canceled</h1>
        <p style={{ marginBottom: "16px" }}>
          The payment was canceled. You can return to checkout and try again.
        </p>
        <Link href="/bg">Back to home</Link>
      </section>
    </main>
  );
}
