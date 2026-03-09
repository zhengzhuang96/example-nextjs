export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-nextjs",
    title: "Next.js 入门指南：从零开始构建现代 Web 应用",
    excerpt: "学习如何使用 Next.js 15 和 App Router 构建高性能的 React 应用，掌握服务端组件、路由系统和数据获取。",
    content: `
# Next.js 入门指南

Next.js 是一个强大的 React 框架，提供了许多开箱即用的功能。

## 主要特性

- **App Router**: 基于文件系统的路由
- **服务端组件**: 更好的性能和用户体验
- **自动代码分割**: 优化加载速度
- **内置优化**: 图片、字体等自动优化

## 开始使用

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

## 项目结构

\`\`\`
src/
├── app/          # App Router
├── components/   # 可复用组件
└── lib/          # 工具函数
\`\`\`

通过这个学习项目，你将掌握 Next.js 的所有核心概念！
    `,
    author: "Next.js 学习团队",
    date: "2026-03-09",
    readTime: "5 分钟",
    category: "入门教程",
    tags: ["Next.js", "React", "Web开发"]
  },
  {
    id: "2",
    slug: "understanding-app-router",
    title: "深入理解 Next.js App Router 的工作原理",
    excerpt: "探索 App Router 的内部机制，学习如何利用文件系统路由、嵌套布局和并行路由构建复杂的应用。",
    content: `
# 理解 App Router

App Router 是 Next.js 13+ 引入的新路由系统。

## 核心概念

### 文件系统路由
每个文件夹代表一个路由段：
- \`app/page.tsx\` → \`/\`
- \`app/about/page.tsx\` → \`/about\`
- \`app/blog/[slug]/page.tsx\` → \`/blog/1\`, \`/blog/hello\`

### 嵌套布局
\`\`\`tsx
// app/dashboard/layout.tsx
export default function Layout({ children }) {
  return (
    <div>
      <nav>Dashboard</nav>
      {children}
    </div>
  );
}
\`\`\`

### 服务端组件
默认情况下，所有组件都是服务端组件：
\`\`\`tsx
// 服务端组件
async function BlogList() {
  const posts = await fetch('https://api.example.com/posts');
  return <div>{/* 渲染文章列表 */}</div>;
}
\`\`\`

需要交互时使用 \`'use client'\` 指令创建客户端组件。
    `,
    author: "技术专家",
    date: "2026-03-08",
    readTime: "8 分钟",
    category: "进阶教程",
    tags: ["App Router", "路由", "架构"]
  },
  {
    id: "3",
    slug: "server-vs-client-components",
    title: "服务端组件 vs 客户端组件：何时使用哪个？",
    excerpt: "详细比较服务端组件和客户端组件的区别，学习如何在正确的场景使用正确的组件类型。",
    content: `
# 服务端组件 vs 客户端组件

## 服务端组件（默认）

### 优点
- 更快的首屏加载
- 减少 JavaScript 包大小
- 直接访问后端资源
- 自动缓存

### 适用场景
- 数据获取
- SEO 重要页面
- 不需要用户交互的UI

## 客户端组件（'use client'）

### 优点
- 完整的浏览器 API 访问
- 状态管理（useState）
- 事件处理（onClick）
- 浏览器特性使用

### 适用场景
- 表单和输入
- 状态管理
- 浏览器 API
- 交互式UI

## 最佳实践

优先使用服务端组件，只在必要时使用客户端组件。这可以显著提高应用性能！
    `,
    author: "性能优化专家",
    date: "2026-03-07",
    readTime: "6 分钟",
    category: "性能优化",
    tags: ["组件", "性能", "最佳实践"]
  },
  {
    id: "4",
    slug: "data-fetching-strategies",
    title: "Next.js 中的数据获取策略完全指南",
    excerpt: "学习静态生成、服务端渲染、增量静态再生成等数据获取策略，以及何时使用每种方法。",
    content: `
# 数据获取策略

## 静态生成（Static Generation）

在构建时生成HTML：
\`\`\`tsx
// 构建时获取数据
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
\`\`\`

## 服务端渲染（Server-Side Rendering）

每次请求时获取数据：
\`\`\`tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // 禁用缓存
  });
  return <div>{/* 渲染数据 */}</div>;
}
\`\`\`

## 增量静态再生成（ISR）

结合静态和服务端的优点：
\`\`\`tsx
export const revalidate = 3600; // 每小时重新验证

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* 渲染数据 */}</div>;
}
\`\`\`

选择正确的策略可以优化性能和用户体验！
    `,
    author: "后端架构师",
    date: "2026-03-06",
    readTime: "10 分钟",
    category: "数据获取",
    tags: ["数据获取", "SSR", "SSG", "ISR"]
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return blogPosts.slice(0, count);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}

export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
