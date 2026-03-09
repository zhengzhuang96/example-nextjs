import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          页面未找到
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          抱歉，你访问的页面不存在。可能是链接错误或页面已被移除。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition-all"
          >
            返回首页
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            查看博客
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            💡 你可能在寻找：
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link href="/structure" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              🏗️ 项目结构
            </Link>
            <Link href="/routing" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              🚀 路由系统
            </Link>
            <Link href="/data-fetching" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              ⚡ 数据获取
            </Link>
            <Link href="/styling" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              🎨 样式UI
            </Link>
            <Link href="/api-routes" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              🔧 API路由
            </Link>
            <Link href="/deployment" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              🚢 部署上线
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
