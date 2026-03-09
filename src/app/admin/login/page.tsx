"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyAdmin, createAdminSession } from "@/lib/admin/auth";
import { Lock, ArrowLeft, Lightbulb } from "lucide-react";

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
        // 在实际应用中，这里应该使用 httpOnly cookie
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            管理员登录
          </h1>
          <p className="text-muted-foreground">
            Next.js 学习模板后台管理系统
          </p>
        </div>

        {/* 登录表单 */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>登录账户</CardTitle>
            <CardDescription>
              请输入您的管理员凭证以继续
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="请输入用户名"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="请输入密码"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>

            {/* 演示账号提示 */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    演示账号
                  </p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>用户名: <code className="bg-background px-2 py-0.5 rounded border">admin</code></p>
                    <p>密码: <code className="bg-background px-2 py-0.5 rounded border">admin123</code></p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 返回链接 */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
