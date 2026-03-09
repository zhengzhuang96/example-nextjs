"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Separator
} from "@/components/ui/separator";
import { verifyAdminSession } from "@/lib/admin/auth";
import { Settings as SettingsIcon, Globe, MessageSquare, RotateCcw, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      router.push("/login");
      return;
    }

    verifyAdminSession(token).then((user) => {
      if (!user) {
        router.push("/login");
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
    // 使用 toast 替代 alert
    console.log("设置已保存！");
  };

  const handleClearCache = async () => {
    console.log("缓存已清理");
  };

  const handleRegenerate = async () => {
    console.log("静态页面已重新生成");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <SettingsIcon className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold text-foreground">
            系统设置
          </h1>
        </div>
        <p className="text-muted-foreground">
          配置你的网站设置和偏好
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <CardTitle>基本信息</CardTitle>
            </div>
            <CardDescription>配置网站的基本信息和联系方式</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="siteName">网站名称</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                placeholder="请输入网站名称"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription">网站描述</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
                placeholder="请输入网站描述"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">管理员邮箱</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                placeholder="admin@example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* 评论设置 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <CardTitle>评论设置</CardTitle>
            </div>
            <CardDescription>管理评论相关的功能选项</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="allowComments">允许评论</Label>
                <p className="text-sm text-muted-foreground">
                  是否允许用户在文章下发表评论
                </p>
              </div>
              <Switch
                id="allowComments"
                checked={settings.allowComments}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowComments: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="requireModeration">需要审核</Label>
                <p className="text-sm text-muted-foreground">
                  新评论需要管理员审核后才能显示
                </p>
              </div>
              <Switch
                id="requireModeration"
                checked={settings.requireModeration}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireModeration: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postsPerPage">每页显示文章数</Label>
              <Select
                value={settings.postsPerPage.toString()}
                onValueChange={(value) =>
                  setSettings({ ...settings, postsPerPage: parseInt(value) })
                }
              >
                <SelectTrigger id="postsPerPage">
                  <SelectValue placeholder="选择每页文章数" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 篇</SelectItem>
                  <SelectItem value="10">10 篇</SelectItem>
                  <SelectItem value="20">20 篇</SelectItem>
                  <SelectItem value="50">50 篇</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 保存按钮 */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
        >
          {saving ? "保存中..." : "保存设置"}
        </Button>
      </div>

      {/* 缓存管理 */}
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-muted-foreground" />
            <CardTitle>缓存管理</CardTitle>
          </div>
          <CardDescription>管理网站缓存和静态页面生成</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={handleClearCache}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              清理所有缓存
            </Button>
            <Button
              variant="outline"
              onClick={handleRegenerate}
            >
              <FileCode className="w-4 h-4 mr-2" />
              重新生成静态页面
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
