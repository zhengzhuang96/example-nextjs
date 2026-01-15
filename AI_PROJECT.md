# AI 产品项目文档

> **项目名称**: AI Product Template (多语言版)
> **创建日期**: 2025-01-14
> **技术栈**: Next.js 15 + shadcn/ui + Tailwind CSS + TypeScript + next-intl
> **包管理器**: pnpm
> **支持语言**: 🇺🇸 English, 🇨🇳 中文

## 📋 项目概述

这是一个现代化、生产就绪的 AI 产品模板，专为快速构建 AI 驱动的应用程序而设计。项目包含完整的用户界面、AI 聊天功能、深色模式支持、响应式设计和**完整的中英文双语支持**。

## 🌍 国际化 (i18n) 功能

### 支持的语言
- 🇺🇸 **English** (en) - 默认语言
- 🇨🇳 **中文** (zh) - 简体中文

### 技术实现
- **库**: next-intl 4.7.0
- **路由模式**: `/en/...`, `/zh/...`
- **自动检测**: 根据浏览器语言自动选择
- **语言切换**: 导航栏右上角的语言切换器

### 翻译文件位置
```
i18n/
├── request.ts           # i18n 配置
├── messages/
│   ├── en.json         # 英文翻译
│   └── zh.json         # 中文翻译
```

### URL 结构
- 英文: `http://localhost:3000/en`
- 中文: `http://localhost:3000/zh`
- 自动重定向: 访问 `/` 会根据浏览器语言自动跳转

## 🏗️ 项目架构

### 技术栈详情

```json
{
  "framework": "Next.js 15.1.3 (App Router)",
  "language": "TypeScript 5.9.3",
  "styling": "Tailwind CSS 3.4.19",
  "components": "shadcn/ui + Radix UI",
  "icons": "Lucide React 0.468.0",
  "theme": "next-themes 0.4.6",
  "i18n": "next-intl 4.7.0",
  "packageManager": "pnpm 10.17.1"
}
```

### 核心依赖

- **Next.js**: React 框架，支持 App Router 和服务端组件
- **React**: 19.2.3（最新版本）
- **next-intl**: 国际化解决方案，支持多语言路由和翻译
- **Radix UI**: 无样式的可访问组件库
  - Dialog, Dropdown Menu, Label, Select, Separator, Slot, Switch, Tabs, Toast
- **类名工具**: class-variance-authority, clsx, tailwind-merge
- **Tailwind CSS**: 用于原子化 CSS 和响应式设计

## 📁 目录结构

```
example-nextjs/
├── app/                          # Next.js App Router 目录
│   ├── [locale]/                # 🌍 国际化路由
│   │   ├── layout.tsx           # 布局（包含 Navbar + Footer）
│   │   ├── page.tsx             # 首页（支持多语言）
│   │   ├── demo/                # AI 聊天演示页
│   │   ├── chat/                # 全屏聊天页面
│   │   ├── pricing/             # 价格页面
│   │   ├── features/            # 功能特性页
│   │   ├── about/               # 关于页面
│   │   ├── login/               # 登录页
│   │   └── signup/              # 注册页
│   └── globals.css              # 全局样式和 CSS 变量
├── i18n/                        # 🌍 国际化配置
│   ├── request.ts               # next-intl 配置
│   └── messages/                # 翻译文件
│       ├── en.json              # 英文翻译
│       └── zh.json              # 中文翻译
│   ├── features/                # 功能特性页
│   │   └── page.tsx
│   ├── about/                   # 关于页面
│   │   └── page.tsx
│   ├── login/                   # 登录页
│   │   └── page.tsx
│   └── signup/                  # 注册页
│       └── page.tsx
│
├── components/                   # React 组件
│   ├── ui/                      # shadcn/ui 基础组件
│   │   ├── button.tsx          # 按钮组件（多种变体）
│   │   ├── card.tsx            # 卡片组件
│   │   ├── input.tsx           # 输入框组件
│   │   └── textarea.tsx        # 文本域组件
│   ├── navbar.tsx               # 导航栏（响应式）
│   ├── footer.tsx               # 页脚（包含链接）
│   ├── theme-provider.tsx       # 主题提供者
│   ├── theme-toggle.tsx         # 深色/浅色模式切换按钮
│   └── chat-interface.tsx       # AI 聊天界面组件 ⭐
│
├── lib/                         # 工具库
│   └── utils.ts                # cn() 函数（合并类名）
│
├── public/                      # 静态资源（待添加）
│
├── 配置文件
├── next.config.mjs             # Next.js 配置
├── tailwind.config.ts          # Tailwind 配置（包含主题色）
├── tsconfig.json               # TypeScript 配置
├── postcss.config.mjs          # PostCSS 配置
├── .eslintrc.json              # ESLint 配置
├── .gitignore                  # Git 忽略文件
├── .env.example                # 环境变量示例
├── package.json                # 项目依赖
└── pnpm-lock.yaml              # pnpm 锁文件
```

## 🎨 设计系统

### 颜色主题

项目的颜色系统定义在 `app/globals.css` 中，使用 HSL 格式：

**浅色模式**:
- Primary: 蓝色系 `221.2 83.2% 53.3%`
- Background: 白色 `0 0% 100%`
- Foreground: 深色 `222.2 84% 4.9%`

**深色模式**:
- Background: 深色 `222.2 84% 4.9%`
- Foreground: 浅色 `210 40% 98%`
- Primary: 亮蓝色 `217.2 91.2% 59.8%`

### 组件变体

所有 shadcn/ui 组件都使用 `class-variance-authority` 定义变体：

- **Button**: default, destructive, outline, secondary, ghost, link
- **尺寸**: sm, default, lg, icon

## 🤖 AI 功能实现

### ChatInterface 组件

**位置**: `components/chat-interface.tsx`

**核心功能**:
1. ✅ 消息列表显示（用户/AI 消息区分）
2. ✅ 实时消息滚动
3. ✅ 加载状态动画
4. ✅ 输入框 + 发送按钮
5. ✅ 键盘快捷键（Enter 发送）
6. ⚠️ **待实现**: 真实 AI API 集成

**状态管理**:
```typescript
interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}
```

**待集成位置**:
```typescript
// 在 handleSend 函数中，替换这段代码：
setTimeout(() => {
  // 模拟响应 - 替换为真实 API 调用
  const aiMessage: Message = { ... }
  setMessages((prev) => [...prev, aiMessage])
  setIsLoading(false)
}, 1000)
```

### 建议的 API 集成方式

**选项 1: 服务端 API 路由**
```typescript
// app/api/chat/route.ts
export async function POST(req: Request) {
  const { message } = await req.json()
  // 调用 OpenAI/Anthropic/自定义 API
  return Response.json({ response: "..." })
}
```

**选项 2: 直接客户端调用**
```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ ... })
})
```

## 📄 页面清单

| 页面 | 路由 | 功能 | i18n状态 |
|------|------|------|------|
| 首页 | `/en`, `/zh` | 落地页，包含 Hero、Features、CTA | ✅ 已翻译 |
| Demo | `/en/demo`, `/zh/demo` | AI 聊天演示页面 | ⚠️ 待翻译 |
| Chat | `/en/chat`, `/zh/chat` | 全屏聊天界面 | ⚠️ 待翻译 |
| Features | `/en/features`, `/zh/features` | 6 个核心功能展示 | ⚠️ 待翻译 |
| Pricing | `/en/pricing`, `/zh/pricing` | 3 个价格方案 | ⚠️ 待翻译 |
| About | `/en/about`, `/zh/about` | 关于我们 | ⚠️ 待翻译 |
| Login | `/en/login`, `/zh/login` | 登录表单 | ⚠️ 待翻译 |
| Signup | `/en/signup`, `/zh/signup` | 注册表单 | ⚠️ 待翻译 |

> **注意**: 目前只有首页、导航栏和页脚完全支持多语言。其他页面需要添加翻译。

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件（基于 `.env.example`）：

```env
# AI API 密钥（选择一个）
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 已知问题

1. ⚠️ Next.js 15.1.3 有安全漏洞警告（建议升级到 15.1.4+）
2. ✅ 已修复 next.config.mjs 的模块类型警告

## 🚀 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

## 📦 可添加的 shadcn/ui 组件

项目已包含基础组件，可根据需要添加更多：

```bash
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add table
npx shadcn-ui@latest add tooltip
```

## 🎯 下一步开发计划

### 优先级 P0（核心功能）
- [ ] 集成真实 AI API（OpenAI/Anthropic/Claude）
- [ ] 实现用户认证（NextAuth.js 或 Clerk）
- [ ] 添加数据库（Prisma + PostgreSQL/MySQL）

### 优先级 P1（增强功能）
- [ ] 添加用户设置页面
- [ ] 实现聊天历史记录
- [ ] 添加使用量统计和限流
- [ ] 实现支付集成（Stripe）

### 优先级 P2（优化）
- [ ] 添加单元测试
- [ ] 性能优化（图片优化、代码分割）
- [ ] SEO 优化（metadata、sitemap）
- [ ] PWA 支持

### 优先级 P2（优化）
- [ ] 添加单元测试
- [ ] 性能优化（图片优化、代码分割）
- [ ] SEO 优化（metadata、sitemap）
- [ ] PWA 支持
- [ ] ⚡ **完成其他页面的多语言翻译**

### 优先级 P3（锦上添花）
- [ ] 添加博客系统
- [x] ✅ 实现多语言（i18n）- **已完成！**
- [ ] 添加更多语言支持（日语、韩语等）
- [ ] 添加通知系统
- [ ] 实现文件上传功能

## 🌍 如何使用国际化功能

### 在组件中使用翻译

```tsx
"use client"

import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('common') // 使用 common 命名空间

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('getStarted')}</button>
    </div>
  )
}
```

### 添加新的翻译键

1. 编辑 `i18n/messages/en.json`:
```json
{
  "myNewSection": {
    "title": "New Feature",
    "description": "This is a new feature"
  }
}
```

2. 编辑 `i18n/messages/zh.json`:
```json
{
  "myNewSection": {
    "title": "新功能",
    "description": "这是一个新功能"
  }
}
```

3. 在组件中使用:
```tsx
const t = useTranslations('myNewSection')
<h1>{t('title')}</h1>
<p>{t('description')}</p>
```

### 构建带语言前缀的链接

```tsx
import { useLocale } from 'next-intl'
import Link from 'next/link'

export function MyNav() {
  const locale = useLocale()

  return (
    <Link href={`/${locale}/about`}>About</Link>
  )
}
```

### 添加新语言

1. 在 `i18n/request.ts` 中添加新的语言代码:
```ts
export const locales = ['en', 'zh', 'ja'] as const; // 添加日语
```

2. 创建新的翻译文件 `i18n/messages/ja.json`

3. 在 `components/language-switcher.tsx` 中添加新语言选项:
```tsx
const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }, // 新增
]
```

## 📚 参考资源

- [Next.js 文档](https://nextjs.org/docs)
- [shadcn/ui 文档](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Radix UI 文档](https://www.radix-ui.com/)
- [Lucide 图标](https://lucide.dev/)
- [next-intl 文档](https://next-intl-docs.vercel.app/) 🌍

## 🤝 贡献指南

1. 创建功能分支：`git checkout -b feature/your-feature`
2. 提交更改：`git commit -m 'Add some feature'`
3. 推送分支：`git push origin feature/your-feature`
4. 提交 Pull Request

## 📝 更新日志

### 2025-01-14 (下午) - 国际化更新 🌍
- ✅ 集成 next-intl 4.7.0
- ✅ 配置多语言路由（`/en/*`, `/zh/*`）
- ✅ 创建中英文翻译文件
- ✅ 实现语言切换组件
- ✅ 更新导航栏和页脚支持多语言
- ✅ 更新首页支持多语言
- ✅ 添加自动语言检测
- ✅ 创建 DropdownMenu 组件

### 2025-01-14 (上午)
- ✅ 初始化项目
- ✅ 配置 Next.js 15 + TypeScript + Tailwind CSS
- ✅ 集成 shadcn/ui 组件库
- ✅ 实现深色模式切换
- ✅ 创建 8 个页面（首页、Demo、Chat、Pricing、Features、About、Login、Signup）
- ✅ 实现 AI 聊天界面组件
- ✅ 配置响应式设计
- ✅ 使用 pnpm 安装依赖
- ✅ 验证开发服务器正常运行

---

**项目状态**: ✅ 可运行 + 🌍 多语言支持
**最后更新**: 2025-01-14
**维护者**: Claude Code AI Assistant
**当前语言**: 🇺🇸 English, 🇨🇳 中文

