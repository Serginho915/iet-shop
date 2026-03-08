import { CheckoutPage } from "@/components/pages/CheckoutPage/CheckoutPage";
import { getCourseBySlug } from "@/lib/api";

interface PageProps {
    params: Promise<{
        slug: string;
        lang: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    // Server-side fetch as primary source
    const course = await getCourseBySlug(slug);

    return <CheckoutPage slug={slug} course={course} />;
}
