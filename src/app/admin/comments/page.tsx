"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { verifyAdminSession } from "@/lib/admin/auth";

export default function CommentsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "张三",
      content: "这篇文章写得很好，对我学习 Next.js 很有帮助！",
      post: "Next.js 入门指南",
      date: "2026-03-09 14:30",
      status: "pending"
    },
    {
      id: 2,
      author: "李四",
      content: "希望能有更多实战案例",
      post: "路由系统",
      date: "2026-03-09 10:15",
      status: "approved"
    },
    {
      id: 3,
      author: "王五",
      content: "讲解很清晰，感谢分享",
      post: "数据获取",
      date: "2026-03-08 16:45",
      status: "approved"
    },
  ]);

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    verifyAdminSession(token).then((user) => {
      if (!user) {
        router.push("/admin/login");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  const handleApprove = (id: number) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, status: "approved" } : comment
    ));
  };

  const handleDelete = (id: number) => {
    if (confirm("确定要删除这条评论吗？")) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          💬 评论管理
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          管理和审核用户评论
        </p>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{comments.length}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">总评论数</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {comments.filter(c => c.status === "approved").length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">已审核</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {comments.filter(c => c.status === "pending").length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">待审核</p>
        </Card>
      </div>

      {/* 评论列表 */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  作者
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  评论内容
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  文章
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{comment.author}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{comment.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{comment.post}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      comment.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {comment.status === "approved" ? "已审核" : "待审核"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {comment.status === "pending" && (
                        <button
                          onClick={() => handleApprove(comment.id)}
                          className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          通过
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="px-3 py-1 text-sm text-red-500 text-white rounded hover:bg-red-600"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
