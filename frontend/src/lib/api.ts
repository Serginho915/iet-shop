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
  stripe_product_id?: number | null;
  stripe_price_id?: number | null;
  tags: Tag[];
  audience?: "adults" | "kids";
  about_title?: string;
  about_description_top?: string;
  about_description_bottom?: string;
  about_image?: string;
  audience_image?: string;
  audience_tags?: [string, string],



  audience_tag1?: string[];
  audience_tag2?: string[];
  audience_tag3?: string[];
  audience_tag4?: string[];
  instruments?: { name: string; icon?: string }[];
  outcomes?: string[];
  modules?: { title: string; description: string[] }[];
}
// type: "hybrid" | "online" | "offline";
//audience_tags?: "hybrid" | "adults" | "kids";

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

const mapTags = (tagIds: any[], allTags: Tag[]) => (tagIds || []).map(id => {
  if (typeof id === 'object') return id;
  const tagId = Number(id);
  return allTags.find(t => t.id === tagId) || { id: tagId, name: `Tag ${tagId}` };
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
  return tags || [];
}

const flattenData = (item: any) => {
  if (item && item.fields) {
    return {
      id: item.pk,
      ...item.fields
    };
  }
  return item;
};

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
        image: resolveUrl(flat.image),
        tags: mapTags(flat.tags, allTags),
        audience: (flat.age_group === "adult" || flat.age_group === "Adult") ? "adults" : "kids"
      };
    }),
    posts: (posts || []).map((p: any) => {
      const flat = flattenData(p);
      return {
        ...flat,
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
        // Fallback mock description if not present in API
        description: flat.description || "Join us for this exciting event where we discuss the latest trends and innovations in the industry.",
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
  return data.courses;
}

export async function getPosts(): Promise<Post[]> {
  const data = await getHomePageData();
  return data.posts;
}

export async function getEvents(): Promise<Event[]> {
  const data = await getHomePageData();
  return data.events;
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
