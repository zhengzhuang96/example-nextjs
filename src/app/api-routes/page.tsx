"use client";

import Link from "next/link";
import { useState } from "react";
import Card from "@/components/ui/card";
import { submitContactForm, subscribeToNewsletter } from "@/lib/actions";

export default function APIRoutesPage() {
  const [activeTab, setActiveTab] = useState<string>("routes");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const result = await submitContactForm(contactForm);

    setFormStatus({
      type: result.success ? "success" : "error",
      message: result.message
    });

    if (result.success) {
      setContactForm({ name: "", email: "", message: "" });
    }

    setIsSubmitting(false);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const result = await subscribeToNewsletter(newsletterEmail);

    setFormStatus({
      type: result.success ? "success" : "error",
      message: result.message
    });

    if (result.success) {
      setNewsletterEmail("");
    }

    setIsSubmitting(false);
  };

  const apiFeatures = [
    {
      id: "routes",
      title: "🌐 API Routes",
      description: "创建传统的 REST API 端点",
      icon: "🌐"
    },
    {
      id: "actions",
      title: "⚡ Server Actions",
      description: "直接从客户端调用服务端函数",
      icon: "⚡"
    },
    {
      id: "comparison",
      title: "🔄 对比和选择",
      description: "了解何时使用哪种方式",
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* 页面标题 */}
        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium mb-4">
            🔧 模块 5：API 路由
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Next.js 后端开发完全指南
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            掌握 API Routes 和 Server Actions，构建全栈应用
          </p>
        </header>

        {/* 功能标签切换 */}
        <div className="flex flex-wrap gap-2 mb-12">
          {apiFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === feature.id
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {feature.icon} {feature.title.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* API Routes 内容 */}
        {activeTab === "routes" && (
          <section className="space-y-8">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                🌐 API Routes
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                API Routes 允许你在 Next.js 应用中创建传统的 REST API 端点。
              </p>

              <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
                <pre className="text-green-400">
{`// src/app/api/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from API!",
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    received: body,
    message: "Data received"
  });
}`}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    ✅ 适用场景
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• 需要公开的 REST API</li>
                    <li>• 第三方集成</li>
                    <li>• Webhook 处理</li>
                    <li>• 文件上传</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-orange-50 dark:bg-orange-900/20">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                    📡 支持的 HTTP 方法
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• GET - 获取数据</li>
                    <li>• POST - 创建数据</li>
                    <li>• PUT - 更新数据</li>
                    <li>• DELETE - 删除数据</li>
                    <li>• PATCH - 部分更新</li>
                  </ul>
                </Card>
              </div>
            </Card>

            {/* 实际的 API 测试 */}
            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                🧪 测试 API Route
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                点击按钮测试我们创建的 API 端点：
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/api/hello"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-all"
                >
                  测试 GET /api/hello
                </a>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                💡 这将在新标签页中打开 API 响应
              </p>
            </Card>
          </section>
        )}

        {/* Server Actions 内容 */}
        {activeTab === "actions" && (
          <section className="space-y-8">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                ⚡ Server Actions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Server Actions 允许你直接从客户端组件调用服务端函数，无需创建 API 端点。
              </p>

              <div className="bg-gray-900 dark:bg-black rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
                <pre className="text-green-400">
{`// src/lib/actions.ts
"use server";

export async function submitContactForm(formData) {
  // 验证数据
  if (!formData.email) {
    return { success: false, message: "邮箱必填" };
  }

  // 保存到数据库
  await db.contacts.create({ data: formData });

  return { success: true, message: "提交成功" };
}

// 在客户端组件中使用
"use client";

import { submitContactForm } from "@/lib/actions";

export default function ContactForm() {
  async function handleSubmit(formData) {
    const result = await submitContactForm(formData);
    // 处理结果
  }

  return (
    <form action={handleSubmit}>
      {/* 表单字段 */}
    </form>
  );
}`}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    ✅ 优势
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• 更少的代码</li>
                    <li>• 类型安全</li>
                    <li>• 自动表单处理</li>
                    <li>• 渐进式增强</li>
                    <li>• 内置错误处理</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                    🎯 最佳用例
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• 表单提交</li>
                    <li>• 数据变更</li>
                    <li>• 用户交互</li>
                    <li>• 后台任务</li>
                  </ul>
                </Card>
              </div>
            </Card>

            {/* Server Actions 实际演示 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 联系表单 */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  📬 联系表单
                </h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="张三"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="zhangsan@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      留言 *
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      rows={4}
                      placeholder="请输入您的留言..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "提交中..." : "提交表单"}
                  </button>
                </form>

                {formStatus.message && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    formStatus.type === "success"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                  }`}>
                    {formStatus.message}
                  </div>
                )}
              </Card>

              {/* 订阅表单 */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  📧 订阅通讯
                </h3>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      邮箱地址 *
                    </label>
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "订阅中..." : "立即订阅"}
                  </button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    💡 Server Actions 优势
                  </h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• 无需创建 API 端点</li>
                    <li>• 自动处理表单数据</li>
                    <li>• 类型安全的函数调用</li>
                    <li>• 内置加载和错误状态</li>
                  </ul>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* 对比内容 */}
        {activeTab === "comparison" && (
          <section className="space-y-8">
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                🔄 API Routes vs Server Actions
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-800 dark:text-white font-semibold">
                        特性
                      </th>
                      <th className="text-left py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">
                        API Routes
                      </th>
                      <th className="text-left py-3 px-4 text-purple-600 dark:text-purple-400 font-semibold">
                        Server Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">使用场景</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">公开 API，第三方集成</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">表单提交，数据变更</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">文件结构</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">app/api/.../route.ts</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">任意 .ts 文件</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">HTTP 方法</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">GET, POST, PUT, DELETE</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">仅 POST (Mutations)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">类型安全</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">需要手动定义</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">自动类型推断</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">代码量</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">更多</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">更少</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">学习曲线</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">简单</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">中等</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* 选择指南 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                  🌐 选择 API Routes
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>需要为第三方提供 API</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>处理 Webhook</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>需要支持多种 HTTP 方法</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span>
                    <span>文件上传和处理</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  ⚡ 选择 Server Actions
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>表单提交和处理</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>数据变更操作</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>需要类型安全</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>渐进式增强</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>
        )}

        {/* 下一步 */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            🎉 API 路由学习完成！
          </h3>
          <p className="mb-6 text-indigo-50">
            现在你已经掌握了 Next.js 的后端开发技巧，让我们学习最后一个模块：部署上线。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/deployment"
              className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
            >
              继续学习部署上线
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
