import { getCourses, getPosts } from "@/lib/api";
import { PageContent } from "@/components/pages/HomePage/PageContent";
import { i18n } from "@/i18n-config";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Home() {
    const courses = await getCourses();
    const posts = await getPosts();
    return (
        <PageContent courses={courses} posts={posts} />
    );
}
