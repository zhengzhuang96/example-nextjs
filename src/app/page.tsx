import Card from "@/components/ui/card";
import LearningCard from "@/components/ui/LearningCard";
import Link from "next/link";

export default function Home() {
  const learningModules = [
    {
      id: 1,
      title: "🏗️ 项目结构",
      description: "理解 Next.js 的文件系统和目录组织",
      status: "completed" as const,
      route: "/structure"
    },
    {
      id: 2,
      title: "🚀 路由系统",
      description: "学习 App Router 和页面导航",
      status: "in-progress" as const,
      route: "/routing"
    },
    {
      id: 3,
      title: "⚡ 数据获取",
      description: "掌握服务端和客户端数据获取",
      status: "pending" as const,
      route: "/data-fetching"
    },
    {
      id: 4,
      title: "🎨 样式和UI",
      description: "使用 Tailwind CSS 构建美观界面",
      status: "pending" as const,
      route: "/styling"
    },
    {
      id: 5,
      title: "🔧 API 路由",
      description: "创建后端 API 和服务端功能",
      status: "pending" as const,
      route: "/api-routes"
    },
    {
      id: 6,
      title: "🚢 部署上线",
      description: "将应用部署到生产环境",
      status: "pending" as const,
      route: "/deployment"
    }
  ];

  const completedCount = learningModules.filter(m => m.status === "completed").length;
  const progressPercent = Math.round((completedCount / learningModules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* 头部区域 */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Next.js 学习之旅
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            从零开始，一步一步掌握现代 Web 开发
          </p>
        </header>

        {/* 进度卡片 */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                学习进度
              </h2>
              <span className="text-3xl font-bold text-blue-600">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              已完成 {completedCount} / {learningModules.length} 个模块
            </p>
          </Card>
        </div>

        {/* 学习模块网格 */}
        <div className="max-w-6xl mx-auto">
          {/* 博客演示入口 */}
          <div className="mb-12">
            <Link href="/blog">
              <Card className="p-8 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 border-2 border-orange-200 dark:border-orange-800 hover:shadow-2xl transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform">
                      📝
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-orange-600 transition-colors">
                        博客演示 - 动态路由实战
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        查看我们刚刚创建的动态路由博客系统，包含文章列表和详情页！
                      </p>
                    </div>
                  </div>
                  <div className="text-4xl group-hover:translate-x-2 transition-transform">
                    →
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            学习模块
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningModules.map((module) => (
              <LearningCard key={module.id} {...module} />
            ))}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            💡 提示：点击卡片开始学习，按顺序完成所有模块
          </p>
        </div>
      </div>
    </div>
  );
}
