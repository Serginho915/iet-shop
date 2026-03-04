import { BlogPage } from "@/components/pages/BlogPage/BlogPage";
import { getBlogBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const post = await getBlogBySlug(slug);

    if (!post) {
        notFound();
    }

    return <BlogPage post={post} />;
}
