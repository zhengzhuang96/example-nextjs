"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import { verifyAdminSession } from "@/lib/admin/auth";

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    siteName: "Next.js 学习模板",
    siteDescription: "从零开始学习 Next.js 开发",
    adminEmail: "admin@example.com",
    allowComments: true,
    requireModeration: true,
    postsPerPage: 10,
  });

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

  const handleSave = async () => {
    setSaving(true);
    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert("设置已保存！");
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
          ⚙️ 系统设置
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          配置你的网站设置和偏好
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 基本信息 */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            🌐 基本信息
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                网站名称
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                网站描述
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                管理员邮箱
              </label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </Card>

        {/* 评论设置 */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            💬 评论设置
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">允许评论</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  是否允许用户在文章下发表评论
                </p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, allowComments: !settings.allowComments })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.allowComments ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                    settings.allowComments ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">需要审核</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  新评论需要管理员审核后才能显示
                </p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, requireModeration: !settings.requireModeration })}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.requireModeration ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                    settings.requireModeration ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                每页显示文章数
              </label>
              <select
                value={settings.postsPerPage}
                onChange={(e) => setSettings({ ...settings, postsPerPage: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="5">5 篇</option>
                <option value="10">10 篇</option>
                <option value="20">20 篇</option>
                <option value="50">50 篇</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      {/* 保存按钮 */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-slate-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "保存中..." : "保存设置"}
        </button>
      </div>

      {/* 重置缓存 */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          🔄 缓存管理
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => alert("缓存已清理")}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            清理所有缓存
          </button>
          <button
            onClick={() => alert("静态页面已重新生成")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            重新生成静态页面
          </button>
        </div>
      </Card>
    </div>
  );
}
