import Link from "next/link";

interface LearningCardProps {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  route: string;
}

export default function LearningCard({
  id,
  title,
  description,
  status,
  route,
}: LearningCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700";
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "✅ 已完成";
      case "in-progress":
        return "🔄 进行中";
      case "pending":
        return "⏳ 待开始";
      default:
        return "⏳ 待开始";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group cursor-pointer">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
        <Link
          href={route}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:gap-2 transition-all"
        >
          开始学习
          <span className="ml-1 group-hover:ml-2 transition-all">→</span>
        </Link>
      </div>
    </div>
  );
}
