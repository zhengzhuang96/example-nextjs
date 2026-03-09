"use client";

import Link from "next/link";
import { useState } from "react";
import Card from "@/components/ui/card";

export default function DataFetchingPage() {
  const [activeTab, setActiveTab] = useState<string>("server");
  const [loadingDemo, setLoadingDemo] = useState(false);

  const fetchingMethods = [
    {
      id: "server",
      title: "🖥️ 服务端组件获取",
      description: "在服务端组件中直接使用 async/await",
      color: "blue",
      code: `// 服务端组件（默认）
export default async function UsersPage() {
  const res = await fetch('https://api.example.com/users');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const users = await res.json();

  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`
    },
    {
      id: "client",
      title: "💻 客户端组件获取",
      description: "使用 useEffect + useState 在客户端获取数据",
      color: "purple",
      code: `"use client";

import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://api.example.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div>加载中...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`
    },
    {
      id: "swr",
      title: "⚡ SWR 钩子",
      description: "使用 SWR 进行客户端数据获取和缓存",
      color: "green",
      code: `"use client";

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UsersPage() {
  const { data, error, isLoading } = useSWR(
    'https://api.example.com/users',
    fetcher
  );

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`
    }
  ];

  const cachingStrategies = [
    {
      strategy: "静态生成 (SSG)",
      description: "在构建时获取数据",
      code: `export default async function Blog() {
  // 每次构建时获取数据
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return <div>{/* 渲染文章 */}</div>;
}`,
      useCase: "内容不经常变化的页面"
    },
    {
      strategy: "增量静态再生成 (ISR)",
      description: "定期重新验证数据",
      code: `export const revalidate = 3600; // 每小时重新验证

export default async function Blog() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return <div>{/* 渲染文章 */}</div>;
}`,
      useCase: "内容偶尔变化的页面"
    },
    {
      strategy: "服务端渲染 (SSR)",
      description: "每次请求时获取数据",
      code: `export default async function Profile() {
  // 每次请求时获取最新数据
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // 禁用缓存
  }).then(r => r.json());

  return <div>{/* 渲染数据 */}</div>;
}`,
      useCase: "需要实时数据的页面"
    }
  ];

  const bestPractices = [
    {
      title: "优先使用服务端组件",
      description: "服务端组件性能更好，可以减少客户端 JavaScript",
      example: "默认情况下，所有组件都是服务端组件"
    },
    {
      title: "正确使用缓存策略",
      description: "根据数据更新频率选择合适的缓存策略",
      example: "静态内容用 SSG，动态内容用 SSR"
    },
    {
      title: "错误处理",
      description: "总是处理网络错误和数据解析错误",
      example: "使用 try-catch 和 res.ok 检查"
    },
    {
      title: "加载状态",
      description: "为用户提供良好的加载体验",
      example: "使用 loading.tsx 或骨架屏"
    },
    {
      title: "避免客户端数据获取",
      description: "除非必要，否则在服务端获取数据",
      example: "服务端获取可以减少客户端 JavaScript"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      green: "from-green-500 to-green-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* 页面标题 */}
        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-sm font-medium mb-4">
            ⚡ 模块 3：数据获取
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Next.js 数据获取完全指南
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            掌握服务端和客户端数据获取的所有技巧
          </p>
        </header>

        {/* 数据获取方法 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            🔍 数据获取方法
          </h2>

          {/* 标签切换 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {fetchingMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setActiveTab(method.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === method.id
                    ? `bg-gradient-to-r ${getColorClasses(method.color)} text-white shadow-lg`
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {method.title.split(" ")[0]} {method.title.split(" ")[1]}
              </button>
            ))}
          </div>

          {/* 当前选中的方法 */}
          {fetchingMethods.map((method) => (
            activeTab === method.id && (
              <Card key={method.id} className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {method.description}
                </p>
                <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-green-400">
                    {method.code}
                  </pre>
                </div>
              </Card>
            )
          ))}
        </section>

        {/* 缓存策略 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            💾 缓存策略
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cachingStrategies.map((strategy, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {strategy.strategy}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {strategy.description}
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs mb-3 overflow-x-auto">
                  <pre className="text-green-400 dark:text-green-300">
                    {strategy.code}
                  </pre>
                </div>
                <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                  📌 {strategy.useCase}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* fetch 选项详解 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ⚙️ Fetch 选项详解
          </h2>
          <Card className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                    cache: 'force-cache' (默认)
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    强制使用缓存，数据不会改变时使用
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">
                    cache: 'no-store'
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    禁用缓存，每次都获取新数据
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">
                    next: {"{ revalidate: 60 }"}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    60秒后重新验证数据
                  </p>
                </div>
              </div>
              <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-green-400">
{`// 完整示例
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store', // 或 'force-cache'
  next: {
    revalidate: 60, // 60秒
    tags: ['posts'] // 标签重新验证
  }
});

// 使用 revalidate 常量
export const revalidate = 3600; // 1小时`}
                </pre>
              </div>
            </div>
          </Card>
        </section>

        {/* 最佳实践 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ✨ 数据获取最佳实践
          </h2>
          <Card className="p-6 md:p-8">
            <ul className="space-y-4">
              {bestPractices.map((practice, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 text-xl mr-3">✓</span>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {practice.title}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {practice.description}
                    </p>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">
                      💡 {practice.example}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* 实际演示 */}
        <section className="mb-12">
          <Card className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              🚀 实际演示
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              查看我们博客示例中的实际数据获取实现：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/blog">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all cursor-pointer">
                  <div className="font-semibold text-gray-800 dark:text-white mb-1">
                    📝 博客列表
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    服务端组件数据获取
                  </div>
                </div>
              </Link>
              <Link href="/blog/getting-started-with-nextjs">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all cursor-pointer">
                  <div className="font-semibold text-gray-800 dark:text-white mb-1">
                    📄 文章详情
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    动态路由 + 数据获取
                  </div>
                </div>
              </Link>
            </div>
          </Card>
        </section>

        {/* 下一步 */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            🎉 数据获取学习完成！
          </h3>
          <p className="mb-6 text-cyan-50">
            现在你已经掌握了 Next.js 中的所有数据获取技巧，让我们继续学习样式和 UI。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/styling"
              className="inline-flex items-center bg-white text-cyan-600 px-6 py-3 rounded-full font-semibold hover:bg-cyan-50 transition-colors"
            >
              继续学习样式 UI
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-cyan-700 transition-colors"
            >
              查看博客示例
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
