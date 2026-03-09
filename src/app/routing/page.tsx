"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Card from "@/components/ui/Card";
import { useState } from "react";

export default function RoutingPage() {
  const pathname = usePathname();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const routingConcepts = [
    {
      id: "basic",
      title: "📄 基础路由",
      description: "文件系统自动生成路由",
      code: `src/app/
├── page.tsx          → /
├── about/
│   └── page.tsx      → /about
└── blog/
    └── page.tsx      → /blog`,
      color: "blue"
    },
    {
      id: "dynamic",
      title: "🔤 动态路由",
      description: "使用方括号创建动态段",
      code: `src/app/blog/
├── [slug]/           → /blog/1, /blog/hello
│   └── page.tsx
└── [category]/       → /blog/tech, /blog/news
    └── [id]/         → /blog/tech/1
        └── page.tsx`,
      color: "purple"
    },
    {
      id: "nested",
      title: "🏗️ 嵌套路由",
      description: "文件夹嵌套形成嵌套布局",
      code: `src/app/dashboard/
├── layout.tsx        → Dashboard布局
├── page.tsx          → /dashboard
├── settings/
│   ├── layout.tsx    → Settings布局
│   └── page.tsx      → /dashboard/settings
└── users/
    └── [id]/
        └── page.tsx  → /dashboard/users/1`,
      color: "green"
    },
    {
      id: "catch-all",
      title: "🎯 捕获所有路由",
      description: "使用 [...] 匹配多段路径",
      code: `src/app/docs/
├── [...slug]/        → /docs/a, /docs/a/b/c
│   └── page.tsx
└── [[...slug]]/      → /docs, /docs/a, /docs/a/b
    └── page.tsx`,
      color: "orange"
    }
  ];

  const routingFeatures = [
    {
      feature: "🔄 客户端导航",
      description: "使用 Link 组件进行无刷新页面跳转",
      example: "<Link href=\"/about\">关于</Link>"
    },
    {
      feature: "📱 响应式路由",
      description: "移动端和桌面端可以有不同的路由结构",
      example: "app/(mobile)/... 和 app/(desktop)/..."
    },
    {
      feature: "🔒 路由组",
      description: "使用括号组织文件但不影响URL",
      example: "app/(marketing)/... → URL: /about"
    },
    {
      feature: "⚡ 并行路由",
      description: "同时渲染多个独立路由",
      example: "app/@auth/page.tsx 和 app@dashboard/page.tsx"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-200 dark:border-blue-800",
      purple: "border-purple-200 dark:border-purple-800",
      green: "border-green-200 dark:border-green-800",
      orange: "border-orange-200 dark:border-orange-800"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* 页面标题 */}
        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium mb-4">
            🚀 模块 2：路由系统
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            深入理解 Next.js App Router
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            掌握现代 Web 应用的路由设计和最佳实践
          </p>
        </header>

        {/* 路由概念演示 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            🎯 路由概念交互演示
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routingConcepts.map((concept) => (
              <Card
                key={concept.id}
                className={`p-6 border-l-4 ${getColorClasses(concept.color)}`}
                hover
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {concept.title}
                  </h3>
                  <button
                    onClick={() => setActiveDemo(activeDemo === concept.id ? null : concept.id)}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {activeDemo === concept.id ? "收起" : "展开"}
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {concept.description}
                </p>
                {activeDemo === concept.id && (
                  <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    <pre>{concept.code}</pre>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* 路由功能 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ⚡ 高级路由功能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routingFeatures.map((item, index) => (
              <Card key={index} className="p-6" hover>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  {item.feature}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {item.description}
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-800 dark:text-gray-300">
                  {item.example}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 实际示例 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            💻 实际代码示例
          </h2>
          <Card className="p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              动态路由页面示例
            </h3>
            <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6">
              <pre className="text-green-400">
{`// src/app/blog/[slug]/page.tsx
export default function BlogPost({ params }) {
  return (
    <article>
      <h1>Blog Post: {params.slug}</h1>
      <p>This is a dynamic route!</p>
    </article>
  );
}`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              嵌套布局示例
            </h3>
            <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">
{`// src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}`}
              </pre>
            </div>
          </Card>
        </section>

        {/* 最佳实践 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ✨ 路由设计最佳实践
          </h2>
          <Card className="p-6 md:p-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    保持URL简洁直观
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    使用语义化的路径名，避免过深的嵌套结构
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    合理使用动态路由
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    动态路由适合处理ID、slug等动态内容，但不要滥用
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    利用路由组组织代码
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    使用括号创建路由组，在不影响URL的情况下组织文件
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    使用布局组件共享UI
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    在每个文件夹级别创建layout.tsx来定义该区域的共享布局
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    客户端导航使用Link组件
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    使用Link而不是a标签进行客户端导航，提供更好的用户体验
                  </p>
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 当前路径信息 */}
        <section className="mb-12">
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              📍 当前页面信息
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-24">
                  路径:
                </span>
                <code className="bg-white dark:bg-gray-800 px-3 py-1 rounded text-sm text-gray-800 dark:text-gray-300">
                  {pathname}
                </code>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-24">
                  类型:
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm">
                  静态路由
                </span>
              </div>
            </div>
          </Card>
        </section>

        {/* 下一步 */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            🎉 掌握了路由系统！
          </h3>
          <p className="mb-6 text-purple-50">
            现在你已经理解了 Next.js 的路由系统，让我们继续学习数据获取。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/data-fetching"
              className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
            >
              继续学习数据获取
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
