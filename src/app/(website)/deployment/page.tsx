import Link from "next/link";
import Card from "@/components/ui/card";

export default function DeploymentPage() {
  const deploymentSteps = [
    {
      step: 1,
      title: "构建应用",
      description: "使用 Next.js 构建命令创建生产版本",
      command: "npm run build",
      icon: "🔨"
    },
    {
      step: 2,
      title: "测试构建",
      description: "在本地测试生产版本",
      command: "npm run start",
      icon: "🧪"
    },
    {
      step: 3,
      title: "部署平台",
      description: "选择部署平台并推送代码",
      command: "vercel deploy",
      icon: "🚀"
    }
  ];

  const platforms = [
    {
      name: "Vercel",
      description: "Next.js 官方平台，零配置部署",
      features: ["自动 HTTPS", "全球 CDN", "零配置", "免费额度"],
      difficulty: "简单",
      icon: "▲",
      color: "black"
    },
    {
      name: "Netlify",
      description: "强大的静态网站部署平台",
      features: ["持续部署", "表单处理", "函数支持", "免费额度"],
      difficulty: "简单",
      icon: "N",
      color: "teal"
    },
    {
      name: "Docker",
      description: "容器化部署，完全控制",
      features: ["环境一致性", "可移植性", "扩展性", "企业级"],
      difficulty: "中等",
      icon: "🐳",
      color: "blue"
    },
    {
      name: "自托管",
      description: "在自己的服务器上部署",
      features: ["完全控制", "数据隐私", "成本可控", "定制化"],
      difficulty: "高级",
      icon: "🏠",
      color: "green"
    }
  ];

  const environmentVariables = [
    { name: "DATABASE_URL", description: "数据库连接字符串" },
    { name: "API_KEY", description: "外部 API 密钥" },
    { name: "NEXT_PUBLIC_API_URL", description: "公开的 API 地址" },
    { name: "NODE_ENV", description: "环境标识（production/development）" }
  ];

  const optimizationTips = [
    {
      title: "图片优化",
      description: "使用 next/Image 组件自动优化图片",
      example: "<Image src='/photo.jpg' width={500} height={300} />"
    },
    {
      title: "字体优化",
      description: "使用 next/font 自动优化字体加载",
      example: "const inter = Inter({ subsets: ['latin'] })"
    },
    {
      title: "代码分割",
      description: "动态导入减少初始加载时间",
      example: "const Component = dynamic(() => import('./Component'))"
    },
    {
      title: "缓存策略",
      description: "合理设置 revalidate 时间",
      example: "export const revalidate = 3600"
    }
  ];

  const checklistItems = [
    "设置环境变量",
    "配置域名",
    "启用 HTTPS",
    "设置 CDN",
    "配置缓存策略",
    "设置错误监控",
    "配置分析工具",
    "测试所有功能",
    "设置自动备份",
    "配置 CI/CD"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
        {/* 页面标题 */}
        <header className="mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm font-medium mb-4">
            🚢 模块 6：部署上线
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Next.js 应用部署完全指南
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            从开发到生产，掌握 Next.js 应用的部署和优化
          </p>
        </header>

        {/* 部署步骤 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            📋 部署流程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deploymentSteps.map((step) => (
              <Card key={step.step} className="p-6 border-t-4 border-teal-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {step.description}
                </p>
                <div className="bg-gray-900 dark:bg-black rounded-lg p-3 font-mono text-sm">
                  <code className="text-green-400">{step.command}</code>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 部署平台 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            🌐 部署平台选择
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform) => (
              <Card key={platform.name} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{platform.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {platform.name}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        platform.difficulty === "简单"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : platform.difficulty === "中等"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}>
                        {platform.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {platform.description}
                </p>
                <ul className="space-y-2">
                  {platform.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-teal-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Vercel 部署详细步骤 */}
        <section className="mb-12">
          <Card className="p-6 md:p-8 bg-gradient-to-r from-black to-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-2">▲</span> Vercel 部署详细步骤
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-teal-400">步骤 1: 准备代码</h4>
                <p className="text-gray-300 text-sm mb-3">确保你的代码已经推送到 GitHub</p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  git add .<br/>
                  git commit -m "Ready for deployment"<br/>
                  git push origin main
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-teal-400">步骤 2: 导入项目</h4>
                <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                  <li>访问 vercel.com 并登录</li>
                  <li>点击 "Add New Project"</li>
                  <li>导入你的 GitHub 仓库</li>
                  <li>配置项目设置（通常使用默认设置）</li>
                  <li>点击 "Deploy"</li>
                </ol>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-teal-400">步骤 3: 配置环境变量</h4>
                <p className="text-gray-300 text-sm mb-3">在 Vercel 控制台中添加环境变量</p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  Settings → Environment Variables → Add
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-teal-400">步骤 4: 自定义域名</h4>
                <p className="text-gray-300 text-sm mb-3">在 Vercel 控制台中配置自定义域名</p>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                  Settings → Domains → Add Domain
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 环境变量 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            🔐 环境变量配置
          </h2>
          <Card className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {environmentVariables.map((envVar) => (
                <div key={envVar.name} className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3">
                  <code className="text-teal-600 dark:text-teal-400 font-mono text-sm">
                    {envVar.name}
                  </code>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    {envVar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                💡 使用方式
              </h4>
              <div className="bg-gray-900 dark:bg-black rounded p-3 font-mono text-sm text-green-400">
                <pre>
{`// 在服务端组件中
const dbUrl = process.env.DATABASE_URL;

// 在客户端组件中（需要 NEXT_PUBLIC_ 前缀）
const apiUrl = process.env.NEXT_PUBLIC_API_URL;`}
                </pre>
              </div>
            </div>
          </Card>
        </section>

        {/* 性能优化 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ⚡ 性能优化技巧
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {optimizationTips.map((tip, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                  {tip.description}
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded p-2 font-mono text-xs overflow-x-auto">
                  <code className="text-teal-600 dark:text-teal-400">
                    {tip.example}
                  </code>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 部署检查清单 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            ✅ 部署前检查清单
          </h2>
          <Card className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checklistItems.map((item, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </Card>
        </section>

        {/* 项目完成 */}
        <section className="mb-12">
          <Card className="p-8 md:p-12 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4">
              恭喜完成所有学习模块！
            </h2>
            <p className="text-xl mb-6 text-teal-50">
              你已经掌握了 Next.js 开发的所有核心技能
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-1">🏗️</div>
                <div className="text-sm font-medium">项目结构</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-sm font-medium">路由系统</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-sm font-medium">数据获取</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-1">🎨</div>
                <div className="text-sm font-medium">样式 UI</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-1">🔧</div>
                <div className="text-sm font-medium">API 路由</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl mb-1">🚢</div>
                <div className="text-sm font-medium">部署上线</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition-colors"
              >
                🏠 返回首页
              </Link>
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-700 transition-colors"
              >
                🚀 部署到 Vercel
              </a>
            </div>
          </Card>
        </section>

        {/* 学习总结 */}
        <section className="mb-12">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              📚 学习总结
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                通过这个完整的学习项目，你已经掌握了：
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✅ Next.js 15 的最新特性和 App Router</li>
                <li>✅ 服务端组件和客户端组件的区别与使用</li>
                <li>✅ 动态路由和数据获取策略</li>
                <li>✅ Tailwind CSS 的使用和响应式设计</li>
                <li>✅ API Routes 和 Server Actions 的开发</li>
                <li>✅ 应用部署和性能优化</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-6">
                现在你已经具备了开发专业 Next.js 应用的能力，可以开始构建自己的项目了！
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
