import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { Lang } from "@/lib/translations";
import { notFound } from "next/navigation";

interface AdminPageProps {
  params: Promise<{ lang: string }>;
}

const isLang = (value: string): value is Lang => value === "en" || value === "bg";

export default async function AdminPage({ params }: AdminPageProps) {
  const { lang } = await params;

  if (!isLang(lang)) {
    notFound();
  }

  return <AdminDashboard lang={lang} />;
}