"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { verifyAdminSession } from "@/lib/admin/auth";
import { blogPosts } from "@/lib/blog-data";

export default function PostsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(blogPosts);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    verifyAdminSession(token).then((user) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  const handleDelete = (postId: string) => {
    if (confirm("确定要删除这篇文章吗？")) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                ← 返回仪表板
              </Link>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                文章管理
              </h1>
            </div>
            <Button variant="primary" onClick={() => alert("创建文章功能开发中...")}>
              + 新建文章
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* 统计信息 */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                文章列表
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                共 {posts.length} 篇文章
              </p>
            </div>
          </div>
        </div>

        {/* 文章列表 */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {post.title}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                      已发布
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>📅 {post.date}</span>
                    <span>⏱️ {post.readTime}</span>
                    <span>👁️ {Math.floor(Math.random() * 500) + 100} 浏览</span>
                    <span>💬 {Math.floor(Math.random() * 20)} 评论</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    查看
                  </Link>
                  <button
                    onClick={() => alert("编辑功能开发中...")}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 text-red-600 hover:text-red-800 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 空状态 */}
        {posts.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              还没有文章
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              开始创建你的第一篇文章吧
            </p>
            <Button variant="primary" onClick={() => alert("创建文章功能开发中...")}>
              + 新建文章
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
