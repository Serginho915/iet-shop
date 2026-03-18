interface AccountPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { lang } = await params;

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: "48px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          border: "1px solid #d9e3f2",
          borderRadius: "12px",
          padding: "24px",
          background: "#ffffff",
          color: "#173965",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: "0 0 12px" }}>
          {lang === "bg" ? "Акаунт" : "Account"}
        </h1>
        <p style={{ margin: 0 }}>
          {lang === "bg"
            ? "Страницата е в процес на разработка."
            : "This page is under development."}
        </p>
      </div>
    </main>
  );
}
