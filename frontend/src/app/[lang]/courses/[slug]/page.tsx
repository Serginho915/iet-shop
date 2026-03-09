import { CoursePage } from "@/components/pages/CoursePage/CoursePage";
import { getCourseBySlug, getCourses } from "@/lib/api";
import { i18n } from "@/i18n-config";

export async function generateStaticParams() {
    const courses = await getCourses();
    const paths: { lang: string; slug: string }[] = [];

    i18n.locales.forEach((locale) => {
        (courses || []).forEach((course) => {
            if (course.slug) {
                paths.push({ lang: locale, slug: course.slug });
            }
        });
    });

    return paths;
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const course = await getCourseBySlug(slug);

    return <CoursePage course={course} slug={slug} />;
}