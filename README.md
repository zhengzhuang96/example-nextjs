# Next.js 学习模板 🚀

> 从零到精通：完整的 Next.js 16 学习路径和实战项目，集成 Shadcn UI 组件库

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-latest-0f172a?style=flat-square)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

这是一个完整的 Next.js 学习项目，包含 6 个学习模块、实战博客系统、管理后台和现代化的 UI 组件库。适合 Next.js 初学者和希望系统学习现代 Web 开发的开发者。

## ✨ 特性

- 📚 **系统化学习路径** - 从基础到高级的完整教程
- 💻 **实战项目** - 包含博客系统和管理后台的完整实现
- 🎨 **现代化 UI** - 集成 Shadcn UI 组件库，企业级设计
- 📱 **响应式设计** - 完美适配各种设备
- 🌓 **暗色模式** - 支持系统主题自动切换
- 🔧 **可复用组件** - 生产级别的 Shadcn UI 组件库
- 📖 **详细注释** - 每个概念都有清晰的说明
- 🏗️ **三种布局** - 前台、登录、管理后台独立布局

## 🎯 学习模块

本项目包含 6 个核心学习模块，涵盖 Next.js 开发的所有重要概念：

### 1. 🏗️ 项目结构
了解 Next.js 的文件组织方式、路由组和目录结构最佳实践。

- [查看教程](/structure) | [本地运行](http://localhost:3000/structure)

### 2. 🚀 路由系统
深入学习 App Router、动态路由、嵌套路由、路由组等高级功能。

- [查看教程](/routing) | [本地运行](http://localhost:3000/routing)

### 3. ⚡ 数据获取
掌握服务端渲染、静态生成、增量静态再生成等数据获取策略。

- [查看教程](/data-fetching) | [本地运行](http://localhost:3000/data-fetching)

### 4. 🎨 样式和 UI
学习 Tailwind CSS 和 Shadcn UI 的使用技巧和响应式设计。

- [查看教程](/styling) | [本地运行](http://localhost:3000/styling)
- [Shadcn UI 组件展示](/shadcn-demo) | [本地运行](http://localhost:3000/shadcn-demo)

### 5. 🔧 API 路由
理解 API Routes 和 Server Actions 的使用场景和最佳实践。

- [查看教程](/api-routes) | [本地运行](http://localhost:3000/api-routes)

### 6. 🚢 部署上线
学习如何将应用部署到 Vercel 等平台。

- [查看教程](/deployment) | [本地运行](http://localhost:3000/deployment)

## 🛠️ 技术栈

本项目使用最新的 Web 开发技术栈：

- **框架**: [Next.js 16.1.6](https://nextjs.org/) - React 框架
- **语言**: [TypeScript 5.0](https://www.typescriptlang.org/) - 类型安全
- **样式**: [Tailwind CSS 4.0](https://tailwindcss.com/) - 原子化 CSS
- **组件库**: [Shadcn UI](https://ui.shadcn.com/) - 高质量 React 组件
- **图标**: [Lucide React](https://lucide.dev/) - 现代化图标库
- **路由**: App Router - Next.js 最新路由系统
- **字体**: [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) - 自动字体优化

## 🚀 快速开始

### 前置要求

- Node.js 18.17 或更高版本
- pnpm（推荐）或 npm、yarn、bun

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/zhengzhuang96/example-nextjs.git
cd example-nextjs
```

2. **安装依赖**
```bash
pnpm install
# 或
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
pnpm dev
# 或
npm run dev
# 或
yarn dev
```

4. **打开浏览器**
访问 [http://localhost:3000](http://localhost:3000) 查看项目。

## 📂 项目结构

```
example-nextjs/
├── src/
│   ├── app/                          # App Router 目录
│   │   ├── layout.tsx                # 根布局（基础 HTML 结构）
│   │   ├── (website)/               # 前台路由组
│   │   │   ├── layout.tsx            # 网站布局（包含主导航）
│   │   │   ├── page.tsx              # 首页
│   │   │   ├── blog/                 # 博客示例
│   │   │   ├── search/               # 搜索页面
│   │   │   ├── structure/            # 项目结构教程
│   │   │   ├── routing/              # 路由系统教程
│   │   │   ├── data-fetching/        # 数据获取教程
│   │   │   ├── styling/              # 样式UI教程
│   │   │   ├── api-routes/           # API路由教程
│   │   │   ├── deployment/           # 部署上线教程
│   │   │   └── shadcn-demo/          # Shadcn UI 组件展示
│   │   ├── (auth)/                  # 认证路由组
│   │   │   └── login/                # 登录页面
│   │   ├── admin/                   # 管理后台路由组
│   │   │   ├── layout.tsx            # Admin 布局（侧边栏 + 认证）
│   │   │   ├── dashboard/            # 仪表板
│   │   │   ├── posts/                # 文章管理
│   │   │   ├── comments/             # 评论管理
│   │   │   └── settings/             # 系统设置
│   │   ├── globals.css               # 全局样式和 CSS 变量
│   │   └── api/                     # API 路由
│   ├── components/                   # 可复用组件
│   │   ├── layout/                  # 布局组件
│   │   │   └── Navigation.tsx       # 主导航栏
│   │   └── ui/                      # Shadcn UI 组件
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── table.tsx
│   │       └── ...更多组件
│   ├── lib/                         # 工具函数
│   │   ├── admin/                   # Admin 认证
│   │   ├── actions.ts               # Server Actions
│   │   ├── blog-data.ts             # 博客数据
│   │   └── utils.ts                 # 通用工具
│   └── hooks/                       # React Hooks
├── public/                           # 静态资源
├── next.config.ts                    # Next.js 配置
├── tailwind.config.ts                # Tailwind CSS 配置
├── components.json                   # Shadcn UI 配置
├── tsconfig.json                     # TypeScript 配置
└── package.json                       # 项目依赖
```

## 🎨 三种布局系统

项目实现了三种完全独立的布局系统：

### 1. 前台布局 (网站布局)
- **路径**: `src/app/(website)/layout.tsx`
- **特点**: 包含主导航栏
- **应用于**: 所有前台页面（首页、博客、教程等）
- **URL**: `/`, `/blog`, `/search` 等

### 2. 登录布局 (认证布局)
- **路径**: `src/app/(auth)/layout.tsx`
- **特点**: 简洁干净的登录界面
- **应用于**: 登录页面
- **URL**: `/login`

### 3. Admin 布局 (管理布局)
- **路径**: `src/app/admin/layout.tsx`
- **特点**: 侧边栏 + 顶部导航 + 认证保护
- **应用于**: 所有管理后台页面
- **URL**: `/admin/*`

## 💻 实战示例

### 博客系统

项目包含一个完整的博客系统，展示了以下概念：

- **动态路由** - `/blog/[slug]`
- **静态生成** - 使用 `generateStaticParams`
- **服务端组件** - 数据获取和 SEO 优化
- **响应式设计** - 移动端适配
- **组件复用** - Shadcn UI 组件

访问 [/blog](/blog) 查看博客示例。

### 管理后台

完整的管理后台系统，包含：

- **仪表板** - 数据统计和活动监控
- **文章管理** - 创建、编辑、删除文章
- **评论管理** - 审核和管理用户评论
- **系统设置** - 网站配置和偏好设置

访问 [/admin/dashboard](/admin/dashboard) 查看管理后台（需要先登录）。

### Shadcn UI 组件库

集成了完整的 Shadcn UI 组件库：

- **基础组件**: Button, Card, Input, Label, Textarea
- **数据展示**: Table, Badge, Avatar, Separator
- **表单组件**: Select, Switch
- **高级组件**: Dialog, Dropdown Menu, Scroll Area
- **反馈组件**: Toast (Sonner)

访问 [/shadcn-demo](/shadcn-demo) 查看所有组件示例。

## 🔐 管理后台访问

### 登录凭证

```
用户名: admin
密码: admin123
```

### 访问地址

- **登录页面**: [/login](/login)
- **管理后台**: [/admin/dashboard](/admin/dashboard)

## 📚 学习路径

### 初学者路径

1. 从 **[首页](/)** 开始，查看学习仪表板
2. 按顺序完成 6 个学习模块
3. 每个模块都包含理论知识和代码示例
4. 参考 **[博客示例](/blog)** 理解实际应用
5. 查看 **[Shadcn UI 示例](/shadcn-demo)** 学习组件使用

### 进阶开发者

1. 直接查看感兴趣的学习模块
2. 研究 **[组件代码](src/components/ui/)**
3. 学习 **[Server Actions](src/lib/actions.ts)** 实现
4. 探索 **[管理后台](/admin)** 的架构设计
5. 参考项目结构组织自己的代码

## 🎨 Shadcn UI 集成

项目已完全集成 Shadcn UI 组件库，提供：

### 已安装组件

- **Button** - 多种变体的按钮组件
- **Card** - 卡片容器组件
- **Input** - 文本输入组件
- **Label** - 表单标签组件
- **Textarea** - 多行文本输入
- **Select** - 下拉选择组件
- **Switch** - 开关切换组件
- **Table** - 数据表格组件
- **Badge** - 徽章标签组件
- **Dialog** - 对话框组件
- **Dropdown Menu** - 下拉菜单组件
- **Avatar** - 头像组件
- **Separator** - 分隔线组件
- **Scroll Area** - 滚动区域组件
- **Toast** - 消息通知组件

### 添加新组件

```bash
pnpm dlx shadcn@latest add [component-name]
```

示例：
```bash
pnpm dlx shadcn@latest add accordion
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add tooltip
```

## 🚀 部署

### Vercel 部署（推荐）

1. 推送代码到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 导入你的仓库
4. 自动部署完成

详细步骤请查看 [部署教程](/deployment)。

### 其他平台

项目也可以部署到：

- **Netlify** - 完美支持 Next.js
- **Docker** - 容器化部署
- **自托管** - 使用 Node.js

## 📖 学习资源

### 官方文档

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Shadcn UI 文档](https://ui.shadcn.com)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

### 社区资源

- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js 示例](https://github.com/vercel/next.js/tree/canary/examples)
- [Vercel 模板](https://vercel.com/templates)
- [Shadcn UI 示例](https://ui.shadcn.com/examples)

## 🎯 项目亮点

### ✅ 最新技术栈
- Next.js 16.1.6 + React 19
- TypeScript 5.0
- Tailwind CSS 4.0
- Shadcn UI 最新组件

### ✅ 最佳实践
- App Router 路由系统
- 路由组布局分离
- Server Actions
- 静态站点生成 (SSG)
- 响应式设计
- 暗色模式支持

### ✅ 企业级代码
- 类型安全
- 组件化架构
- 错误处理
- 性能优化
- 可访问性

### ✅ 完整功能
- 前台网站
- 管理后台
- 用户认证
- 数据管理
- SEO 优化

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🌟 支持

如果这个项目对你有帮助，请给一个 ⭐️ star！

---

<div align="center">

**开始你的 Next.js 学习之旅吧！** 🚀

[⬆ 返回顶部](#next-js-学习模板-)

</div>
