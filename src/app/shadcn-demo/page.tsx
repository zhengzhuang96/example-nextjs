"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ShadcnDemoPage() {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* 页面标题 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Shadcn UI 组件展示
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          展示项目中集成的 Shadcn UI 组件库
        </p>
      </div>

      {/* Button 组件 */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          按钮组件 (Button)
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">默认按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="destructive">破坏性按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="link">链接按钮</Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button size="sm">小按钮</Button>
          <Button size="default">默认大小</Button>
          <Button size="lg">大按钮</Button>
          <Button size="icon">🔥</Button>
        </div>
      </Card>

      {/* Input 组件 */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          输入组件 (Input)
        </h2>
        <div className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="请输入邮箱地址"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">密码</Label>
            <Input id="password" type="password" placeholder="请输入密码" />
          </div>
        </div>
      </Card>

      {/* Textarea 组件 */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          文本域组件 (Textarea)
        </h2>
        <div className="max-w-md">
          <Label htmlFor="message">消息</Label>
          <Textarea
            id="message"
            placeholder="请输入消息内容..."
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </Card>

      {/* Select 组件 */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          选择组件 (Select)
        </h2>
        <div className="max-w-md">
          <Label htmlFor="role">角色</Label>
          <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger id="role">
              <SelectValue placeholder="请选择角色" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">管理员</SelectItem>
              <SelectItem value="user">普通用户</SelectItem>
              <SelectItem value="guest">访客</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Dialog 组件 */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          对话框组件 (Dialog)
        </h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>打开对话框</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认操作</DialogTitle>
              <DialogDescription>
                这是一个对话框示例，用于确认用户操作或显示重要信息。
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                你确定要执行此操作吗？此操作可能不可逆。
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={() => setDialogOpen(false)}>确认</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      {/* Dropdown Menu 组件 */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          下拉菜单组件 (Dropdown Menu)
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">打开菜单</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>个人资料</DropdownMenuItem>
            <DropdownMenuItem>账户设置</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>

      {/* Avatar 组件 */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          头像组件 (Avatar)
        </h2>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>用户</AvatarFallback>
          </Avatar>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-lg">大头像</AvatarFallback>
          </Avatar>
        </div>
      </Card>

      {/* Badge 组件 */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          徽章组件 (Badge)
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge>默认</Badge>
          <Badge variant="secondary">次要</Badge>
          <Badge variant="destructive">破坏性</Badge>
          <Badge variant="outline">轮廓</Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>新功能</Badge>
          <Badge>测试中</Badge>
          <Badge variant="destructive">已废弃</Badge>
          <Badge variant="secondary">v2.0</Badge>
        </div>
      </Card>

      {/* 使用说明 */}
      <Card className="p-6 mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 如何使用这些组件
        </h3>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <p>
            1. 所有组件都已安装到 <code className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">src/components/ui/</code> 目录
          </p>
          <p>
            2. 导入示例：<code className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">import {{ '{' }} Button {{ '}' }} from "@/components/ui/button"</code>
          </p>
          <p>
            3. 添加更多组件：<code className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">pnpm dlx shadcn@latest add [component-name]</code>
          </p>
          <p>
            4. 访问{' '}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 dark:hover:text-blue-300"
            >
              Shadcn UI 官网
            </a>{' '}
            查看所有可用组件
          </p>
        </div>
      </Card>
    </div>
  );
}
