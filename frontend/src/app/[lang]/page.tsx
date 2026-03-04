import { getCourses, getPosts } from "@/lib/api";
import { PageContent } from "@/components/pages/HomePage/PageContent";

export default async function Home() {
    const courses = await getCourses();
    const posts = await getPosts();
    return (
        <PageContent courses={courses} posts={posts} />
    );
}
