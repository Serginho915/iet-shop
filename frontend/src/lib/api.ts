
export interface Tag {
  id: number;
  name?: string;
  name_en?: string;
  name_bg?: string;
}

export interface Course {
  id: number;
  slug: string;
  title?: string;
  title_en?: string;
  title_bg?: string;
  start: string;
  image?: string;
  description?: string;
  description_en?: string;
  description_bg?: string;
  duration?: string;
  duration_en?: string;
  duration_bg?: string;
  type: "hybrid" | "online" | "offline";
  price: number;
  is_active: boolean;
  stripe_product_id?: number | null;
  stripe_price_id?: number | null;
  tags: Tag[];
  audience?: "adults" | "kids";
  about_title?: string;
  about_title_en?: string;
  about_title_bg?: string;
  about_description_top?: string;
  about_description_top_en?: string;
  about_description_top_bg?: string;
  about_description_bottom?: string;
  about_description_bottom_en?: string;
  about_description_bottom_bg?: string;
  about_image?: string;
  audience_image?: string;

  extra_audience_tags?: {
    title?: any;
    title_en?: string;
    title_bg?: string;
    text?: any;
    text_en?: string;
    text_bg?: string;
  }[];

  instruments?: {
    name_en?: string;
    name_bg?: string;
    icon?: string;
  }[];

  outcomes?: {
    text_en?: string;
    text_bg?: string;
  }[];

  modules?: {
    title_en?: string;
    title_bg?: string;
    descriptions?: {
      text_en?: string;
      text_bg?: string;

    }
  }[];
}

export interface Post {
  id: number;
  slug: string;
  title?: string;
  title_en?: string;
  title_bg?: string;
  author: string;
  content?: string;
  content_en?: string;
  content_bg?: string;
  picture?: string;
  created_at: string;
  tags: Tag[];
}

export interface Event {
  id: number;
  title: string;
  title_en?: string;
  title_bg?: string;
  date: string;
  description: string;
  type: "online" | "offline" | "hybrid";
  tags: Tag[];
  image_1?: string;
  image_2?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const API_URL = `${API_BASE}/api`;

const resolveUrl = (url?: string) => {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

const localize = (value: any) => {
  if (!value) return "";
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    // If it's a bilingual object from backend
    if ('en' in value || 'bg' in value) {
      return value; // Keep as object, components will handle it with useTranslate/lang
    }
  }
  return value;
};

const mapTags = (tagIds: any[], allTags: Tag[]) => (tagIds || []).map(id => {
  if (typeof id === 'object') return id;
  const tagId = Number(id);
  const found = allTags.find(t => t.id === tagId);
  if (found) return found;
  return { id: tagId };
});

const safeFetch = async (endpoint: string) => {
  const url = `${API_URL}${endpoint}/`.replace(/\/+$/, '/');
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    return null;
  }
};

export async function getTags(): Promise<Tag[]> {
  const tags = await safeFetch('/tags');
  return (tags || []).map((t: any) => flattenData(t));
}

const flattenData = (item: any) => {
  if (item && item.fields) {
    return {
      id: item.pk,
      ...item.fields
    };
  }
  return item;
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
    courses: (courses || []).map((c: any) => {
      const flat = flattenData(c);
      return {
        ...flat,
        title: flat.title, // Now a {en, bg} object from DRF
        description: flat.description,
        duration: flat.duration,
        about_title: flat.about_title,
        about_description_top: flat.about_description_top,
        about_description_bottom: flat.about_description_bottom,
        image: resolveUrl(flat.image),
        about_image: resolveUrl(flat.about_image),
        audience_image: resolveUrl(flat.audience_image),
        tags: mapTags(flat.tags, allTags),
        audience: flat.audience ?? ((flat.age_group === "adult" || flat.age_group === "Adult") ? "adults" : "kids"),

        // Map related cards
        extra_audience_tags: (flat.audience_tags || []).map((card: any) => ({
          title: card.title,
          text: card.text
        })),
        instruments: (flat.instruments || []).map((instr: any) => ({
          name: instr.name,
          icon: resolveUrl(instr.icon)
        })),
        outcomes: (flat.outcomes || []).map((out: any) => out),
        modules: (flat.modules || []).map((mod: any) => ({
          title: mod.title,
          description: mod.description
        }))
      };
    }),
    posts: (posts || []).map((p: any) => {
      const flat = flattenData(p);
      return {
        ...flat,
        title: flat.title,
        content: flat.content,
        picture: resolveUrl(flat.picture),
        tags: mapTags(flat.tags, allTags)
      };
    }),
    events: (events || []).map((e: any) => {
      const flat = flattenData(e);

      const mappedEvent = {
        ...flat,
        id: flat.id,
        title: flat.title,
        description: flat.description,
        date: flat.date,
        type: flat.type,
        image_1: resolveUrl(flat.image_1),
        image_2: resolveUrl(flat.image_2),
        tags: mapTags(flat.tags, allTags)
      };

      return mappedEvent;
    })
  };
}

export async function getCourses(): Promise<Course[]> {
  const data = await getHomePageData();
  return data.courses as any;
}

export async function getPosts(): Promise<Post[]> {
  const data = await getHomePageData();
  return data.posts as any;
}

export async function getEvents(): Promise<Event[]> {
  const data = await getHomePageData();
  return data.events as any;
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getCourses();
  if (!courses || courses.length === 0) return undefined;
  const targetSlug = slug.toLowerCase().trim();
  return courses.find(c => c.slug?.toLowerCase().trim() === targetSlug);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}

export async function getEventBySlug(title: string): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find(e => e.title === title || (typeof e.title === 'object' && e.title && ((e.title as any).en === title || (e.title as any).bg === title)));
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

export async function submitEventRequest(data: { name: string; email: string; phone: string; interested: number }) {
  const url = `${API_URL}/event-requests/`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to submit event request');
  }

  return await res.json();
}
