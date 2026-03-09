"use client";

import Card from "@/components/ui/Card";

export default function DashboardPage() {
  const stats = [
    { title: "文章总数", value: "4", icon: "📝", color: "blue", change: "+12%" },
    { title: "总浏览量", value: "1,284", icon: "👁️", color: "green", change: "+23%" },
    { title: "评论数量", value: "89", icon: "💬", color: "purple", change: "+8%" },
    { title: "活跃用户", value: "247", icon: "👥", color: "orange", change: "+15%" },
  ];

  const recentActivities = [
    { id: 1, action: "发布新文章", desc: "Next.js 入门指南", time: "2小时前", type: "success" },
    { id: 2, action: "用户评论", desc: "张三评论了《路由系统》", time: "3小时前", type: "info" },
    { id: 3, action: "系统更新", desc: "更新到 Next.js 16.1.6", time: "5小时前", type: "warning" },
  ];

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          仪表板
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          欢迎回来，管理员！这是你的工作台。
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{stat.icon}</div>
              <span className={`text-xs font-medium ${
                stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 最新文章 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              📚 最新文章
            </h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              查看全部 →
            </a>
          </div>
          <div className="space-y-3">
            {[
              { id: 1, title: "Next.js 入门指南", date: "2026-03-09", views: 342 },
              { id: 2, title: "深入理解 App Router", date: "2026-03-08", views: 289 },
              { id: 3, title: "服务端组件 vs 客户端组件", date: "2026-03-07", views: 256 },
              { id: 4, title: "数据获取策略完全指南", date: "2026-03-06", views: 198 },
            ].map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{post.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{post.views}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 最近活动 */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🔔 最近活动
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  activity.type === "success"
                    ? "bg-green-500"
                    : activity.type === "info"
                    ? "bg-blue-500"
                    : "bg-orange-500"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.desc}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 系统状态 */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🖥️ 系统状态
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">系统状态</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">正常运行</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">数据库</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">连接正常</p>
            </div>
            <div className="text-2xl">🗄️</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">缓存</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">已启用</p>
            </div>
            <div className="text-2xl">⚡</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
