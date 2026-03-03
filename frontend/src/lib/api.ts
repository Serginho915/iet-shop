// Здесь позже будет реальный доступ к бэкенду.
// Пока что экспортируем тип и мок‑данные, чтобы верстка и типы работали.

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
  start: string;           // date ISO string
  image?: string;
  description: string;
  duration: string;
  type: "hybrid" | "online" | "offline";
  price: number;
  is_active: boolean;
  stripe_product_id?: number;
  stripe_price_id?: number;
  tags: Tag[];
}

// ─── Post (blog article) ────────────────────────────────────────────────────
export interface Post {
  id: number;
  slug: string;
  title: string;
  author: string;
  content: string;         // maps to `content` field in DB
  picture?: string;        // maps to `picture` (img) field in DB
  created_at: string;      // date ISO string
  tags: Tag[];
}

// ─── Mock data ─────────────────────────────────────────────────────────────
export const mockCourses: Course[] = [
  {
    id: 1,
    slug: "javascript-course",
    title: "Front End Development",
    start: "2026-05-12",
    image: undefined,
    description: "Comprehensive course from zero to your first professional projects using JavaScript, React and Next.js.",
    duration: "2 months",
    type: "hybrid",
    price: 199,
    is_active: true,
    tags: [
      { id: 1, name: "programming" },
      { id: 3, name: "frontend" },
    ],
  },
  {
    id: 2,
    slug: "python-course",
    title: "Python & Backend",
    start: "2026-06-01",
    image: undefined,
    description: "Learn Python for automation, data science, and building powerful backend APIs with Django/FastAPI.",
    duration: "3 months",
    type: "online",
    price: 249,
    is_active: true,
    tags: [
      { id: 1, name: "programming" },
      { id: 4, name: "backend" },
    ],
  },
  {
    id: 3,
    slug: "ux-ui-course",
    title: "UX/UI Design",
    start: "2026-05-20",
    image: undefined,
    description: "Master user experience and interface design using Figma, design systems and real-world projects.",
    duration: "2 months",
    type: "offline",
    price: 149,
    is_active: true,
    tags: [
      { id: 2, name: "design" },
    ],
  },
  {
    id: 4,
    slug: "smm-course",
    title: "SMM & Digital Marketing",
    start: "2026-07-01",
    image: undefined,
    description: "Build brands, grow audiences and run effective ad campaigns across social media platforms.",
    duration: "1.5 months",
    type: "online",
    price: 99,
    is_active: true,
    tags: [
      { id: 5, name: "marketing" },
    ],
  },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    slug: "how-to-become-interior-designer-without-education",
    author: "Jane Smith",
    title: "How to become an interior designer without education?",
    content: "In this blog post, we explore the various pathways to becoming an interior designer without traditional education. From self-study resources and online courses to building a strong portfolio, we provide actionable tips for aspiring designers looking to break into the industry.",
    picture: undefined,
    created_at: "2024-03-20",
    tags: [
      { id: 2, name: "Design" },
      { id: 6, name: "Career" },
    ],
  },
  {
    id: 2,
    slug: "how-to-create-stunning-portfolio-self-taught-designer",
    author: "John Doe",
    title: "How to create a stunning portfolio as a self-taught designer?",
    content: "In this blog post, we guide you through creating a standout portfolio as a self-taught interior designer. From selecting the right projects to presenting them effectively, we provide practical advice to help you showcase your skills and attract potential clients.",
    picture: undefined,
    created_at: "2024-03-15",
    tags: [
      { id: 7, name: "Portfolio" },
      { id: 2, name: "Design" },
    ],
  },
  {
    id: 3,
    slug: "essential-software-tools-interior-design-beginners",
    author: "Alice Johnson",
    title: "Essential software tools for interior design beginners",
    content: "In this blog post, we delve into the essential software tools for interior design beginners. From 3D modeling software to mood board creators, we cover the key programs that can help you bring your design ideas to life.",
    picture: undefined,
    created_at: "2024-03-10",
    tags: [
      { id: 8, name: "Tools" },
      { id: 2, name: "Design" },
    ],
  },
  {
    id: 4,
    slug: "mastering-light-and-shadow-interior-visualization",
    author: "Bob Wilson",
    title: "Mastering light and shadow in interior visualization",
    content: "In this blog post, we explore techniques for mastering light and shadow in interior visualization. From understanding different light sources to using software tools effectively, we provide tips to help you create realistic lighting effects.",
    picture: undefined,
    created_at: "2024-03-05",
    tags: [
      { id: 9, name: "Visualization" },
      { id: 2, name: "Design" },
    ],
  },
  {
    id: 5,
    slug: "top-5-interior-design-trends-2024",
    author: "Emily Davis",
    title: "Top 5 interior design trends for 2024",
    content: "In this blog post, we explore the top 5 interior design trends for 2024. From the rise of sustainable materials to the resurgence of bold colors, we provide insights into what's shaping the future of interior design.",
    picture: undefined,
    created_at: "2024-03-01",
    tags: [
      { id: 10, name: "Trends" },
      { id: 2, name: "Design" },
    ],
  },
];

// ─── API functions ─────────────────────────────────────────────────────────
export async function getCourses(): Promise<Course[]> {
  // TODO: replace with fetch('/api/courses')
  return mockCourses;
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  // TODO: replace with fetch(`/api/courses/${slug}`)
  return mockCourses.find((c) => c.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  // TODO: replace with fetch('/api/posts')
  return mockPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // TODO: replace with fetch(`/api/posts/${slug}`)
  return mockPosts.find((p) => p.slug === slug);
}

// ─── Legacy aliases (TODO: remove after updating all refs) ─────────────────
/** @deprecated Use Course instead */
export type Product = Course;
/** @deprecated Use Post instead */
export type BlogPost = Post;
/** @deprecated Use getCourses() */
export const getProducts = getCourses;
/** @deprecated Use getCourseBySlug() */
export const getProductBySlug = getCourseBySlug;
/** @deprecated Use getPosts() */
export const getBlogPosts = getPosts;
/** @deprecated Use getPostBySlug() */
export const getBlogBySlug = getPostBySlug;
/** @deprecated Use mockCourses */
export const mockProducts = mockCourses;
/** @deprecated Use mockPosts */
export const mockBlogs = mockPosts;
