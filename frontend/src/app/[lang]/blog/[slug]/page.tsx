import { BlogPage } from "@/components/pages/BlogPage/BlogPage";
import { getPostBySlug, getPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import { i18n } from "@/i18n-config";

export async function generateStaticParams() {
    const posts = await getPosts();
    const paths: { lang: string; slug: string }[] = [];

    i18n.locales.forEach((locale) => {
        posts.forEach((post) => {
            paths.push({ lang: locale, slug: post.slug });
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
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return <BlogPage post={post} />;
}
