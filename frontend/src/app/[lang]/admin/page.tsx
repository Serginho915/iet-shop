import { AdminDashboard } from "@/components/admin/AdminDashboard";

interface AdminPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { lang } = await params;
  return <AdminDashboard lang={lang} />;
}
