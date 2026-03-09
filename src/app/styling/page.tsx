"use client";

import Link from "next/link";
import { useState } from "react";
import Card from "@/components/ui/Card";

export default function StylingPage() {
  const [activeColor, setActiveColor] = useState<string>("blue");
  const [showCode, setShowCode] = useState(false);

  const colorExamples = [
    { name: "蓝色", color: "blue", bg: "bg-blue-500", text: "text-blue-600" },
    { name: "绿色", color: "green", bg: "bg-green-500", text: "text-green-600" },
    { name: "紫色", color: "purple", bg: "bg-purple-500", text: "text-purple-600" },
    { name: "橙色", color: "orange", bg: "bg-orange-500", text: "text-orange-600" },
    { name: "红色", color: "red", bg: "bg-red-500", text: "text-red-600" },
    { name: "青色", color: "cyan", bg: "bg-cyan-500", text: "text-cyan-600" },
  ];

  const spacingExamples = [
    { size: "p-4", description: "内边距 1rem (16px)" },
    { size: "px-6", description: "水平内边距 1.5rem (24px)" },
    { size: "py-8", description: "垂直内边距 2rem (32px)" },
    { size: "m-4", description: "外边距 1rem (16px)" },
    { size: "mx-auto", description: "水平居中" },
    { size: "my-8", description: "垂直外边距 2rem (32px)" },
  ];

  const layoutExamples = [
    {
      name: "Flexbox 居中",
      classes: "flex items-center justify-center",
      preview: "item in center"
    },
    {
      name: "Grid 布局",
      classes: "grid grid-cols-2 gap-4",
      preview: "2 columns"
    },
    {
      name: "Flex 间距",
      classes: "flex justify-between",
      preview: "item   item"
    },
    {
      name: "响应式 Grid",
      classes: "grid grid-cols-1 md:grid-cols-3",
      preview: "responsive"
    }
  ];

  const darkModeTips = [
    {
      title: "使用 dark: 前缀",
      description: "为暗色模式添加特殊样式",
      example: "className='bg-white dark:bg-gray-800'"
    },
    {
      title: "颜色适配",
      description: "使用适合暗色模式的颜色变体",
      example: "text-gray-800 dark:text-gray-100"
    },
    {
      title: "背景渐变",
      description: "创建不同模式下的渐变效果",
      example: "from-blue-50 dark:from-gray-900"
    },
    {
      title: "边框调整",
      description: "调整边框颜色以适应背景",
      example: "border-gray-200 dark:border-gray-700"
    }
  ];

  const responsiveBreakpoints = [
    { breakpoint: "sm", minWidth: "640px", description: "小屏幕" },
    { breakpoint: "md", minWidth: "768px", description: "中等屏幕" },
    { breakpoint: "lg", minWidth: "1024px", description: "大屏幕" },
    { breakpoint: "xl", minWidth: "1280px", description: "超大屏幕" },
    { breakpoint: "2xl", minWidth: "1536px", description: "2倍大屏幕" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* 页面标题 */}
        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium mb-4">
            🎨 模块 4：样式和UI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Tailwind CSS 完全指南
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            掌握现代 CSS 工具类，构建美观的用户界面
          </p>
        </header>

        {/* 颜色系统 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            🎨 颜色系统
          </h2>
          <Card className="p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {colorExamples.map((color) => (
                <button
                  key={color.color}
                  onClick={() => setActiveColor(color.color)}
                  className={`p-4 rounded-lg ${color.bg} text-white font-medium transition-all hover:scale-105 active:scale-95 ${
                    activeColor === color.color ? "ring-4 ring-offset-2 ring-gray-400" : ""
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                选中的颜色类：
              </p>
              <code className="text-lg font-mono text-pink-600 dark:text-pink-400">
                {activeColor === "blue" && "bg-blue-500 text-blue-600"}
                {activeColor === "green" && "bg-green-500 text-green-600"}
                {activeColor === "purple" && "bg-purple-500 text-purple-600"}
                {activeColor === "orange" && "bg-orange-500 text-orange-600"}
                {activeColor === "red" && "bg-red-500 text-red-600"}
                {activeColor === "cyan" && "bg-cyan-500 text-cyan-600"}
              </code>
            </div>
          </Card>
        </section>

        {/* 间距系统 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            📏 间距系统
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spacingExamples.map((example, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="font-mono text-sm text-pink-600 dark:text-pink-400">
                    {example.size}
                  </code>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Tailwind 类
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {example.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* 布局系统 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            📐 布局系统
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layoutExamples.map((example, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                  {example.name}
                </h3>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-3">
                  <code className="text-sm text-pink-600 dark:text-pink-400">
                    {example.classes}
                  </code>
                </div>
                <div className={`${example.classes} p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700`}>
                  <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 px-3 py-1 rounded text-sm">
                    {example.preview}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 响应式设计 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            📱 响应式设计
          </h2>
          <Card className="p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              断点系统
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {responsiveBreakpoints.map((bp) => (
                <div key={bp.breakpoint} className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                    {bp.breakpoint}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    ≥{bp.minWidth}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {bp.description}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              响应式示例
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
              <pre className="text-green-400 dark:text-green-300">
{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 移动端: 1列, 平板: 2列, 桌面: 3列 */}
</div>`}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-gradient-to-br from-pink-400 to-purple-500 text-white p-6 rounded-lg text-center font-semibold"
                >
                  响应式卡片 {item}
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* 暗色模式 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            🌙 暗色模式
          </h2>
          <Card className="p-6 md:p-8">
            <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                💡 <strong>提示：</strong>切换系统主题来查看暗色模式效果！
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                在 macOS: 系统设置 → 外观 → 暗色/浅色自动
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {darkModeTips.map((tip, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {tip.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {tip.description}
                  </p>
                  <code className="text-xs bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-pink-600 dark:text-pink-400">
                    {tip.example}
                  </code>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* 常用组件样式 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            🧩 常用组件样式
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 按钮 */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                按钮样式
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                  渐变按钮
                </button>
                <button className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium border-2 border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all">
                  边框按钮
                </button>
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                  次要按钮
                </button>
              </div>
            </Card>

            {/* 卡片 */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                卡片样式
              </h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="font-medium text-gray-800 dark:text-white">基础卡片</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">简单的卡片样式</div>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-pink-200 dark:border-pink-800">
                  <div className="font-medium text-gray-800 dark:text-white">渐变卡片</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">带渐变背景</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 最佳实践 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ✨ 样式最佳实践
          </h2>
          <Card className="p-6 md:p-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    移动优先设计
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    从移动端样式开始，然后添加响应式前缀（md:, lg:等）
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    使用组件复用
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    创建可复用的组件，避免重复样式代码
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    适配暗色模式
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    始终为每个样式添加 dark: 变体
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    使用语义化颜色
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    使用 gray-800 而不是 black，使用 gray-200 而不是 white
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    过渡和动画
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    使用 transition-* 类添加平滑的交互效果
                  </p>
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 下一步 */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            🎉 样式和UI学习完成！
          </h3>
          <p className="mb-6 text-pink-50">
            现在你已经掌握了 Tailwind CSS 的使用技巧，让我们继续学习 API 路由。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/api-routes"
              className="inline-flex items-center bg-white text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              继续学习 API 路由
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
