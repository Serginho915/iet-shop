import { AdminLoginScreen } from "@/components/admin/AdminLoginScreen";

interface AdminLoginPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AdminLoginPage({ params }: AdminLoginPageProps) {
  const { lang } = await params;
  return <AdminLoginScreen lang={lang} />;
}
