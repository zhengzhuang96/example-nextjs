"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Eye,
  MessageSquare,
  Users,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Database,
  Zap,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    {
      title: "文章总数",
      value: "4",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      change: "+12%",
      isPositive: true
    },
    {
      title: "总浏览量",
      value: "1,284",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      change: "+23%",
      isPositive: true
    },
    {
      title: "评论数量",
      value: "89",
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      change: "+8%",
      isPositive: true
    },
    {
      title: "活跃用户",
      value: "247",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      change: "+15%",
      isPositive: true
    },
  ];

  const recentActivities = [
    { id: 1, action: "发布新文章", desc: "Next.js 入门指南", time: "2小时前", type: "success" },
    { id: 2, action: "用户评论", desc: "张三评论了《路由系统》", time: "3小时前", type: "info" },
    { id: 3, action: "系统更新", desc: "更新到 Next.js 16.1.6", time: "5小时前", type: "warning" },
  ];

  const recentPosts = [
    { id: 1, title: "Next.js 入门指南", date: "2026-03-09", views: 342 },
    { id: 2, title: "深入理解 App Router", date: "2026-03-08", views: 289 },
    { id: 3, title: "服务端组件 vs 客户端组件", date: "2026-03-07", views: 256 },
    { id: 4, title: "数据获取策略完全指南", date: "2026-03-06", views: 198 },
  ];

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          仪表板
        </h1>
        <p className="text-muted-foreground mt-1">
          欢迎回来，管理员！这是你的工作台。
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge variant={stat.isPositive ? "default" : "destructive"} className="gap-1">
                    {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 最新文章 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>最新文章</CardTitle>
                <CardDescription>最近发布的文章列表</CardDescription>
              </div>
              <Link
                href="/admin/posts"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                查看全部 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPosts.map((post, index) => (
                <div key={post.id}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{post.title}</p>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  {index < recentPosts.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
            <CardDescription>系统最新的动态和操作记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`mt-1 rounded-full p-1 ${
                    activity.type === "success"
                      ? "bg-green-100 dark:bg-green-900/20 text-green-600"
                      : activity.type === "info"
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                      : "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                  }`}>
                    <div className="w-2 h-2 rounded-full bg-current" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.desc}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 系统状态 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>系统状态</CardTitle>
          <CardDescription>当前系统运行状况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">系统状态</p>
                  <p className="text-xs text-muted-foreground">正常运行</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">数据库</p>
                  <p className="text-xs text-muted-foreground">连接正常</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">缓存</p>
                  <p className="text-xs text-muted-foreground">已启用</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
