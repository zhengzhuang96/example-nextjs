"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/admin/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const user = await verifyAdminSession(token);
      if (!user) {
        router.push("/admin/login");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (userMenuOpen && !target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: "📊",
      label: "仪表板",
    },
    {
      href: "/admin/posts",
      icon: "📝",
      label: "文章管理",
    },
    {
      href: "/admin/comments",
      icon: "💬",
      label: "评论管理",
    },
    {
      href: "/admin/users",
      icon: "👥",
      label: "用户管理",
    },
    {
      href: "/admin/settings",
      icon: "⚙️",
      label: "系统设置",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* 左侧：Logo 和汉堡菜单 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                管理后台
              </span>
            </Link>
          </div>

          {/* 右侧：面包屑和用户菜单 */}
          <div className="flex items-center space-x-4">
            {/* 面包屑 */}
            <div className="hidden md:flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Link href="/admin/dashboard" className="hover:text-gray-900 dark:hover:text-white">
                首页
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 dark:text-white">
                {menuItems.find(item => item.href === pathname)?.label || "管理后台"}
              </span>
            </div>

            {/* 用户菜单 */}
            <div className="relative user-menu-container">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  管
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      管理员
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      admin@example.com
                    </p>
                  </div>

                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <span className="mr-2">🌐</span>
                    查看网站
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <span className="mr-2">🚪</span>
                    退出登录
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* 左侧边栏 */}
        <aside
          className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* 底部链接 */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <span>🏠</span>
                <span>返回首页</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* 遮罩层（移动端） */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 主内容区域 */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "lg:ml-64" : "ml-0"
          }`}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
