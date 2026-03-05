import { i18n } from "@/i18n-config";

// ─── Tag ───────────────────────────────────────────────────────────────────
export interface Tag {
  id: number;
  name: string;
}

// ─── Course ────────────────────────────────────────────────────────────────
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
}

// ─── Post (blog article) ────────────────────────────────────────────────────
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ─── Internal Helpers ───────────────────────────────────────────────────────

export async function getTags(): Promise<Tag[]> {
  try {
    const res = await fetch(`${API_URL}/tags/`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`Tags API error: ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Critical error fetching tags:", error);
    return [];
  }
}

function mapCourse(course: any, allTags: Tag[]): Course {
  const courseTags = (course.tags || []).map((tagId: number) => {
    return allTags.find((t: Tag) => t.id === tagId) || { id: tagId, name: 'Unknown' };
  });

  // Determine audience based on specific tags (4: Adults, 5: Kids)
  let audience: "adults" | "kids" | undefined = undefined;
  if (course.tags?.includes(4)) audience = "adults";
  else if (course.tags?.includes(5)) audience = "kids";

  // Map image URL to backend media root
  let imageUrl = course.image;
  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
    const baseUrl = API_URL.replace('/api', '');
    imageUrl = `${baseUrl}/media/${imageUrl}`;
  }

  return {
    ...course,
    image: imageUrl,
    tags: courseTags,
    audience: audience
  };
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  try {
    const [coursesRes, tags] = await Promise.all([
      fetch(`${API_URL}/courses/`, { next: { revalidate: 60 } }),
      getTags()
    ]);

    if (!coursesRes.ok) {
      console.error(`Courses API failed with status ${coursesRes.status}`);
      return [];
    }
    const data = await coursesRes.json();
    return data.map((c: any) => mapCourse(c, tags));
  } catch (error) {
    console.error("Critical error fetching courses:", error);
    return [];
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getCourses();
  return courses.find(c => c.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  try {
    const [postsRes, tags] = await Promise.all([
      fetch(`${API_URL}/posts/`, { next: { revalidate: 60 } }),
      getTags()
    ]);

    if (!postsRes.ok) {
      console.error(`Posts API failed with status ${postsRes.status}`);
      return [];
    }

    const data = await postsRes.json();
    return data.map((post: any) => {
      let pictureUrl = post.picture;
      if (pictureUrl && !pictureUrl.startsWith('http') && !pictureUrl.startsWith('/')) {
        const baseUrl = API_URL.replace('/api', '');
        pictureUrl = `${baseUrl}/media/${pictureUrl}`;
      }
      return {
        ...post,
        picture: pictureUrl,
        tags: (post.tags || []).map((id: number) =>
          tags.find((t: Tag) => t.id === id) || { id, name: 'Unknown' }
        )
      };
    });
  } catch (error) {
    console.error("Critical error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(p => p.slug === slug);
}
