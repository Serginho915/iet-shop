import { getHomePageData } from "@/lib/api";
import { PageContent } from "@/components/pages/HomePage/PageContent";
import { i18n } from "@/i18n-config";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Home() {
    const data = await getHomePageData();

    return (
        <PageContent
            courses={data.courses}
            posts={data.posts}
            tags={data.tags}
            events={data.events}
        />
    );
}
