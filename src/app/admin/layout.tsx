"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/admin/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  Home,
  Building2,
  Bell,
  Search
} from "lucide-react";

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
        router.push("/login");
        return;
      }

      const user = await verifyAdminSession(token);
      if (!user) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    router.push("/login");
  };

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "仪表板",
      badge: null
    },
    {
      href: "/admin/posts",
      icon: FileText,
      label: "文章管理",
      badge: "12"
    },
    {
      href: "/admin/comments",
      icon: MessageSquare,
      label: "评论管理",
      badge: "5"
    },
    {
      href: "/admin/users",
      icon: Users,
      label: "用户管理",
      badge: null
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "系统设置",
      badge: null
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* 左侧：Logo 和汉堡菜单 */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <Link href="/admin/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-foreground">管理后台</div>
                <div className="text-xs text-muted-foreground">Enterprise App</div>
              </div>
            </Link>
          </div>

          {/* 中间：搜索栏（桌面端） */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted border-0 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {/* 右侧：通知和用户菜单 */}
          <div className="flex items-center space-x-2">
            {/* 通知按钮 */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>

            {/* 用户菜单 */}
            <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      管
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">系统管理员</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@enterprise.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" target="_blank" className="cursor-pointer">
                    <Globe className="mr-2 h-4 w-4" />
                    <span>查看网站</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>账户设置</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    <span>返回首页</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* 左侧边栏 */}
        <aside
          className={`fixed top-16 left-0 bottom-0 w-64 bg-background border-r z-40 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <ScrollArea className="h-full py-4">
            {/* 主导航 */}
            <div className="px-3 mb-4">
              <div className="text-xs font-semibold text-muted-foreground mb-2 px-3">
                主菜单
              </div>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <Separator className="my-4" />

            {/* 底部链接 */}
            <div className="px-3">
              <div className="text-xs font-semibold text-muted-foreground mb-2 px-3">
                系统
              </div>
              <Link
                href="/"
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>返回首页</span>
              </Link>
            </div>

            {/* 版本信息 */}
            <div className="px-6 mt-6 mb-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="text-xs font-semibold text-foreground mb-1">Enterprise App</div>
                <div className="text-xs text-muted-foreground">版本 1.0.0</div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* 遮罩层（移动端） */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 主内容区域 */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "lg:ml-64" : "ml-0"
          }`}
        >
          {/* 页面标题栏 */}
          <div className="border-b bg-muted/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {menuItems.find(item => item.href === pathname)?.label || "管理后台"}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  欢迎回来，管理员
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  刷新数据
                </Button>
              </div>
            </div>
          </div>

          {/* 内容区域 */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
