export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          加载中...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          正在为你准备精彩内容
        </p>
      </div>
    </div>
  );
}
