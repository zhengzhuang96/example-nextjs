"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { searchPosts } from "@/lib/blog-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchPosts.return>([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchResults = searchPosts(query);
      setResults(searchResults);
      setIsSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        {/* 页面标题 */}
        <header className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium mb-4">
            🔍 搜索功能
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            搜索博客文章
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            使用关键词搜索我们博客中的所有文章
          </p>
        </header>

        {/* 搜索表单 */}
        <Card className="p-6 md:p-8 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入关键词，如：Next.js、路由、性能..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all whitespace-nowrap"
            >
              🔍 搜索
            </button>
          </form>
        </Card>

        {/* 搜索结果 */}
        {isSearched && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              搜索结果
              <span className="ml-2 text-lg text-gray-500 dark:text-gray-400">
                ({results.length} 篇文章)
              </span>
            </h2>

            {results.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  没有找到相关文章
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  试试其他关键词，或者浏览我们的学习模块
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  返回首页
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {results.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-purple-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 热门搜索 */}
        {!isSearched && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              🔥 热门搜索
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { keyword: "Next.js", icon: "📦" },
                { keyword: "App Router", icon: "🛣️" },
                { keyword: "性能优化", icon: "⚡" },
                { keyword: "TypeScript", icon: "📘" },
                { keyword: "组件", icon: "🧩" },
                { keyword: "部署", icon: "🚀" }
              ].map((item) => (
                <button
                  key={item.keyword}
                  onClick={() => {
                    setQuery(item.keyword);
                    const searchResults = searchPosts(item.keyword);
                    setResults(searchResults);
                    setIsSearched(true);
                  }}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {item.keyword}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 返回链接 */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <span className="text-2xl mr-2">←</span>
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
