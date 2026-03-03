import { CoursePage } from "@/components/pages/CoursePage/CoursePage";
import { getCourseBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    return <CoursePage course={course} />;
}
