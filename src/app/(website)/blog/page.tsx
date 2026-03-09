import Link from "next/link";
import Image from "next/image";
import Card from "@/components/ui/card";
import { blogPosts, getAllCategories } from "@/lib/blog-data";

export default function BlogPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* 页面标题 */}
        <header className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium mb-4">
            📝 博客示例
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Next.js 博客
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            探索 Next.js 的世界，学习现代 Web 开发的最佳实践
          </p>
        </header>

        {/* 分类标签 */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-medium">
            全部文章 ({blogPosts.length})
          </span>
          {categories.map((category) => {
            const count = blogPosts.filter(post => post.category === category).length;
            return (
              <button
                key={category}
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* 博客文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* 文章封面 */}
                <div className="h-48 bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center relative">
                  <div className="text-white text-6xl font-bold opacity-20">
                    {post.title.charAt(0)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* 文章内容 */}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* 文章元信息 */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* 路由说明卡片 */}
        <Card className="p-6 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 border border-orange-200 dark:border-orange-800">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            🔍 路由说明
          </h3>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex items-start">
              <span className="text-orange-500 font-bold mr-2">1.</span>
              <div>
                <span className="font-semibold">当前页面:</span>
                <code className="ml-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                  /blog
                </code>
                <span className="mx-2">→</span>
                <span className="text-sm">静态路由</span>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-pink-500 font-bold mr-2">2.</span>
              <div>
                <span className="font-semibold">文章页面:</span>
                <code className="ml-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                  /blog/[slug]
                </code>
                <span className="mx-2">→</span>
                <span className="text-sm">动态路由</span>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 font-bold mr-2">3.</span>
              <div>
                <span className="font-semibold">示例链接:</span>
                <code className="ml-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                  /blog/getting-started-with-nextjs
                </code>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              💡 <strong>提示：</strong>点击上面的任何文章卡片，会跳转到对应的动态路由页面！
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              文件位置: src/app/blog/[slug]/page.tsx
            </p>
          </div>
        </Card>

        {/* 返回链接 */}
        <div className="text-center mt-8">
          <Link
            href="/routing"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <span className="mr-2">←</span>
            返回路由系统学习
          </Link>
        </div>
      </div>
    </div>
  );
}
