import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/ui/card";
import { getPostBySlug, blogPosts, getRecentPosts } from "@/lib/blog-data";

// 生成静态参数（用于静态生成）
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} - Next.js 博客`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const recentPosts = getRecentPosts(3);

  // 如果文章不存在，返回 404
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* 返回链接 */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
        >
          <span className="text-2xl mr-2">←</span>
          返回博客列表
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主内容区域 */}
          <div className="lg:col-span-2">
            <article>
              {/* 文章头部 */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {post.date}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    •
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {post.readTime}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                  {post.title}
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      {post.author}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      作者
                    </div>
                  </div>
                </div>
              </header>

              {/* 文章内容 */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.content}
                  </div>
                </div>
              </div>

              {/* 文章标签 */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                  标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* 相关文章 */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                相关文章
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentPosts
                  .filter((p) => p.id !== post.id)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="block"
                    >
                      <Card className="p-4 hover:shadow-lg transition-all">
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                          {relatedPost.date} • {relatedPost.readTime}
                        </div>
                      </Card>
                    </Link>
                  ))}
              </div>
            </section>
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 路由信息卡片 */}
            <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
              <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                🔍 动态路由信息
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">当前路由:</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400">
                    /blog/[slug]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">URL 参数:</span>
                  <span className="font-mono text-pink-600 dark:text-pink-400">
                    {params.slug}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">文章 ID:</span>
                  <span className="font-mono text-orange-600 dark:text-orange-400">
                    {post.id}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
                <p className="mb-1">
                  <strong>文件位置:</strong>
                </p>
                <p className="font-mono">
                  src/app/blog/[slug]/page.tsx
                </p>
              </div>
            </Card>

            {/* 动态路由说明 */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">
                💡 什么是动态路由？
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                动态路由允许你创建动态URL路径，方括号 <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">[slug]</code> 中的部分会成为参数。
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    /blog/hello → slug: "hello"
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    /blog/123 → slug: "123"
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    /blog/my-post → slug: "my-post"
                  </span>
                </div>
              </div>
            </Card>

            {/* 返回学习页面 */}
            <Link href="/routing">
              <Card className="p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <div className="text-lg font-bold mb-1">
                  📚 继续学习
                </div>
                <div className="text-sm opacity-90">
                  路由系统教程
                </div>
              </Card>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
