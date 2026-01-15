# 🌍 多语言 AI 产品项目模板

> Next.js 15 + shadcn/ui + Tailwind CSS + TypeScript + next-intl

一个支持**中英文双语**的现代化 AI 产品模板，包含完整的用户界面、AI 聊天功能、深色模式和多语言支持。

## ✨ 特性

- 🌍 **完整的中英文双语支持**
- 🎨 **精美的 UI 设计** - 基于 shadcn/ui 组件库
- 🌙 **深色模式** - 完整的主题切换支持
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🤖 **AI 聊天界面** - 预构建的聊天组件
- ⚡ **Next.js 15** - 最新的 App Router
- 🚀 **TypeScript** - 完整的类型安全
- 🎯 **Tailwind CSS** - 原子化 CSS

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 语言路由

- 🇺🇸 英文: http://localhost:3000/en
- 🇨🇳 中文: http://localhost:3000/zh

访问根路径 `/` 会根据浏览器语言自动跳转。

## 📁 项目结构

```
example-nextjs/
├── app/[locale]/          # 多语言路由
│   ├── layout.tsx        # 布局
│   ├── page.tsx          # 首页（已翻译）
│   ├── demo/             # 演示页
│   ├── chat/             # 聊天页
│   ├── pricing/          # 价格页
│   ├── features/         # 功能页
│   ├── about/            # 关于页
│   ├── login/            # 登录页
│   └── signup/           # 注册页
├── i18n/                  # 国际化配置
│   ├── request.ts        # i18n 配置
│   └── messages/         # 翻译文件
│       ├── en.json       # 英文
│       └── zh.json       # 中文
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── navbar.tsx        # 导航栏（已翻译）
│   ├── footer.tsx        # 页脚（已翻译）
│   ├── theme-toggle.tsx  # 主题切换
│   └── language-switcher.tsx  # 语言切换器
└── lib/                   # 工具函数
```

## 🌍 使用多语言功能

### 在组件中使用翻译

```tsx
"use client"

import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('home')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  )
}
```

### 创建多语言链接

```tsx
import { useLocale } from 'next-intl'
import Link from 'next/link'

export function Navigation() {
  const locale = useLocale()

  return (
    <Link href={`/${locale}/about`}>About</Link>
  )
}
```

### 添加新的翻译

1. 在 `i18n/messages/en.json` 添加英文翻译
2. 在 `i18n/messages/zh.json` 添加中文翻译
3. 在组件中使用 `useTranslations('命名空间')`

## 🎯 已完成的功能

### ✅ 国际化
- [x] 中英文双语支持
- [x] 自动语言检测
- [x] 语言切换器（导航栏）
- [x] URL 路由 `/en/*`, `/zh/*`
- [x] 首页、导航栏、页脚翻译

### ✅ UI 组件
- [x] 导航栏（响应式）
- [x] 页脚
- [x] 深色模式切换
- [x] 语言切换器
- [x] Button, Card, Input 组件

### ✅ 页面
- [x] 首页（已翻译）
- [x] Demo 页
- [x] Chat 页
- [x] Features 页
- [x] Pricing 页
- [x] About 页
- [x] Login 页
- [x] Signup 页

## ⚠️ 待完成

其他页面还需要添加翻译支持：
- [ ] Demo 页翻译
- [ ] Chat 页翻译
- [ ] Features 页翻译
- [ ] Pricing 页翻译
- [ ] About 页翻译
- [ ] Login 页翻译
- [ ] Signup 页翻译

## 📝 翻译示例

### 英文 (i18n/messages/en.json)

```json
{
  "home": {
    "title": "Build Smarter with",
    "titleHighlight": "AI-Powered Solutions"
  }
}
```

### 中文 (i18n/messages/zh.json)

```json
{
  "home": {
    "title": "使用",
    "titleHighlight": "AI 智能解决方案",
    "titleEnd": "构建更智能的应用"
  }
}
```

## 🛠️ 技术栈

- **框架**: Next.js 15.1.3
- **语言**: TypeScript 5.9.3
- **样式**: Tailwind CSS 3.4.19
- **组件**: shadcn/ui + Radix UI
- **国际化**: next-intl 4.7.0
- **图标**: Lucide React
- **主题**: next-themes
- **包管理**: pnpm

## 📚 文档

详细文档请查看 [AI_PROJECT.md](./AI_PROJECT.md)

## 🚀 部署

```bash
# 构建
pnpm build

# 启动生产服务器
pnpm start
```

## 📄 许可证

MIT License - 可自由使用！

## 🤝 贡献

欢迎提交 Pull Request！

---

**状态**: ✅ 可运行 | 🌍 多语言支持
**维护**: Claude Code AI Assistant
**日期**: 2025-01-14
