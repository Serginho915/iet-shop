// ─── Interfaces ─────────────────────────────────────────────────────────────
export interface Tag {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  start: string;
  image?: string;
  description: string;
  duration: string;
  type: "hybrid" | "online" | "offline";
  price: number;
  is_active: boolean;
  stripe_product_id?: number;
  stripe_price_id?: number;
  tags: Tag[];
  audience?: "adults" | "kids";
  about_title?: string;
  about_description_top?: string;
  about_description_bottom?: string;
  about_image?: string;
  audience_image?: string;
  audience_tags?: [string, string],
  instruments?: { name: string; icon?: string }[];
  outcomes?: string[];
  modules?: { title: string; description: string[] }[];
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  author: string;
  content: string;
  picture?: string;
  created_at: string;
  tags: Tag[];
}

export interface Event {
  id: number;
  title: string;
  date: string;
  type: "online" | "offline" | "hybrid";
  tags: Tag[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL; //|| "http://127.0.0.1:8000"
const API_URL = `${API_BASE}/api`;

const resolveUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

const mapTags = (tagIds: any[], allTags: Tag[]) => (tagIds || []).map(id => {
  if (typeof id === 'object') return id;
  return allTags.find(t => t.id === Number(id)) || { id: Number(id), name: `Tag ${id}` };
});

const safeFetch = async (endpoint: string) => {
  const url = `${API_URL}${endpoint}/`.replace(/\/+$/, '/');
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
};

export async function getTags(): Promise<Tag[]> {
  const tags = await safeFetch('/tags');
  return tags || [];
}

export async function getHomePageData() {
  const [tags, courses, posts, events] = await Promise.all([
    getTags(),
    safeFetch('/courses'),
    safeFetch('/posts'),
    safeFetch('/events')
  ]);

  const allTags = tags || [];

  return {
    tags: allTags,
    courses: (courses || []).map((c: any) => ({
      ...c,
      image: resolveUrl(c.image),
      tags: mapTags(c.tags, allTags),
      audience: (c.age_group === "adult" || c.age_group === "Adult") ? "adults" : "kids"
    })),
    posts: (posts || []).map((p: any) => ({
      ...p,
      picture: resolveUrl(p.picture),
      tags: mapTags(p.tags, allTags)
    })),
    events: (events || []).map((e: any) => ({
      ...e,
      tags: mapTags(e.tags, allTags)
    }))
  };
}

export async function getCourses(): Promise<Course[]> {
  const { courses } = await getHomePageData();
  return courses;
}

export async function getPosts(): Promise<Post[]> {
  const { posts } = await getHomePageData();
  return posts;
}

export async function getEvents(): Promise<Event[]> {
  const { events } = await getHomePageData();
  return events;
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getCourses();
  return courses.find(c => c.slug === slug);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}

export async function getEventBySlug(title: string): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find(e => e.title === title);
}

export async function submitConsultation(data: { name: string; email: string; phone: string; interested: number }) {
  const url = `${API_URL}/consultations/`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to submit consultation');
  }

  return await res.json();
}
