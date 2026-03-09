"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdmin, createAdminSession } from "@/lib/admin/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await verifyAdmin(formData.username, formData.password);

      if (user) {
        const token = await createAdminSession(user);
        sessionStorage.setItem("adminToken", token);
        router.push("/admin/dashboard");
      } else {
        setError("用户名或密码错误");
      }
    } catch (err) {
      setError("登录失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            管理员登录
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Next.js 学习模板后台管理系统
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                用户名
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="请输入用户名"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                密码
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="请输入密码"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-slate-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "登录中..." : "登录"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
              💡 演示账号
            </p>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p>用户名: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">admin</code></p>
              <p>密码: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">admin123</code></p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
