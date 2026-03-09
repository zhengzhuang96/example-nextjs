import Link from "next/link";
import Card from "@/components/ui/Card";

export default function StructurePage() {
  const projectStructure = [
    {
      name: "src/app/",
      description: "App Router 目录，所有页面和路由都在这里",
      type: "folder",
      children: [
        { name: "layout.tsx", description: "根布局组件，定义共享的 UI 结构", type: "file" },
        { name: "page.tsx", description: "首页组件，对应路由 /", type: "file" },
        { name: "globals.css", description: "全局样式文件", type: "file" },
        { name: "favicon.ico", description: "网站图标", type: "file" }
      ]
    },
    {
      name: "src/components/",
      description: "可复用的 React 组件目录",
      type: "folder",
      children: [
        { name: "ui/", description: "基础 UI 组件（按钮、卡片等）", type: "folder" },
        { name: "layout/", description: "布局相关组件（导航、页脚）", type: "folder" }
      ]
    },
    {
      name: "src/lib/",
      description: "工具函数和配置文件",
      type: "folder",
      children: [
        { name: "utils.ts", description: "通用工具函数", type: "file" },
        { name: "constants.ts", description: "常量定义", type: "file" }
      ]
    },
    {
      name: "public/",
      description: "静态资源目录（图片、字体等）",
      type: "folder",
      children: [
        { name: "images/", description: "图片资源", type: "folder" },
        { name: "fonts/", description: "字体文件", type: "folder" }
      ]
    }
  ];

  const keyConcepts = [
    {
      title: "📁 文件系统路由",
      description: "每个文件夹代表一个路由段，page.tsx 文件定义页面内容",
      example: "src/app/dashboard/page.tsx → /dashboard"
    },
    {
      title: "🔄 布局继承",
      description: "子页面自动继承父级 layout.tsx 的布局",
      example: "根布局应用到所有页面"
    },
    {
      title: "🎯 组件组织",
      description: "将可复用组件放在 components 目录，保持代码整洁",
      example: "Button.tsx, Card.tsx, Navigation.tsx"
    },
    {
      title: "⚙️ 配置文件",
      description: "项目配置在根目录，如 next.config.ts, tsconfig.json",
      example: "Next.js, TypeScript, Tailwind 配置"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return "📁";
      case "file":
        return "📄";
      default:
        return "📄";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* 页面标题 */}
        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-4">
            🏗️ 模块 1：项目结构
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            理解 Next.js 项目结构
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            掌握 Next.js 的文件组织方式和最佳实践
          </p>
        </header>

        {/* 项目结构图 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            📂 项目目录结构
          </h2>
          <Card className="p-6 md:p-8 rounded-2xl">
            <div className="font-mono text-sm md:text-base">
              {projectStructure.map((item, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{getFileIcon(item.type)}</span>
                    <div>
                      <span className="font-bold text-gray-800 dark:text-white">
                        {item.name}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 ml-9">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.children && (
                    <div className="ml-12 mt-2 space-y-2">
                      {item.children.map((child, childIndex) => (
                        <div key={childIndex} className="flex items-center">
                          <span className="text-xl mr-2">{getFileIcon(child.type)}</span>
                          <div>
                            <span className="text-gray-700 dark:text-gray-300">
                              {child.name}
                            </span>
                            <span className="text-gray-500 dark:text-gray-500 mx-2">
                              -
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              {child.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* 核心概念 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            💡 核心概念
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyConcepts.map((concept, index) => (
              <Card key={index} className="p-6" hover>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {concept.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {concept.description}
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm text-gray-800 dark:text-gray-300">
                  {concept.example}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 最佳实践 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ✨ 最佳实践
          </h2>
          <Card className="p-6 md:p-8 rounded-2xl">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    保持组件小而专注
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    每个组件只做一件事，便于维护和复用
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    使用 TypeScript
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    为组件和函数添加类型注解，提高代码质量
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    合理组织目录结构
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    按功能或页面组织代码，而不是按文件类型
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 text-xl mr-3">✓</span>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    利用服务端组件
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    默认使用服务端组件，只在需要交互时使用客户端组件
                  </p>
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* 下一步 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            🎉 恭喜完成项目结构学习！
          </h3>
          <p className="mb-6 text-blue-50">
            现在你已经理解了 Next.js 的项目组织方式，让我们继续学习路由系统。
          </p>
          <Link
            href="/routing"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            继续学习路由系统
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
