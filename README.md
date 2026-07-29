# Next.js 学习仓库

基于 [Next.js 官方 App Router Dashboard 课程](https://nextjs.org/learn/dashboard-app) 的学习项目 —— 一个名为 **Acme** 的财务仪表盘应用。本仓库用于在学习过程中实践 Next.js App Router 的核心概念，并记录每一章的代码实现。

> 课程地址：<https://nextjs.org/learn/dashboard-app>

---

## ✨ 已实践的功能

根据课程章节逐步实现，目前已包含：

- 🎨 **CSS 样式**：使用 Tailwind CSS 进行全局与组件级样式开发
- 🔗 **路由与布局**：基于文件系统的路由、嵌套布局（Dashboard / Invoices / Customers）
- ⚡ **数据获取**：Server Components 中直接查询数据库、请求瀑布流与并行请求
- 🔍 **搜索与分页**：URL 搜索参数 + `use-debounce` 实现防抖搜索、分页
- 📝 **增删改查（CRUD）**：发票的创建 / 编辑 / 删除，使用 Server Actions
- 🔐 **身份认证**：基于 NextAuth.js (Auth.js v5) 的登录鉴权与路由保护
- 💾 **数据库**：Vercel Postgres，通过 `/seed` 路由初始化示例数据
- 🖼️ **字体与图片优化**：`next/font`、`next/image`

---

## 🧰 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | [Next.js](https://nextjs.org/) 16（App Router，开发模式启用 Turbopack） |
| UI 库 | [React](https://react.dev/) 19 |
| 语言 | [TypeScript](https://www.typescriptlang.org/) |
| 样式 | [Tailwind CSS](https://tailwindcss.com/) 3.4 |
| 图标 | [Heroicons](https://heroicons.com/) |
| 认证 | [NextAuth.js / Auth.js](https://authjs.dev/) v5 |
| 数据库 | [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)（`postgres` 驱动） |
| 数据校验 | [Zod](https://zod.dev/) |
| 其他 | `bcrypt`（密码加密）、`use-debounce`、`clsx` |
| 包管理 | [pnpm](https://pnpm.io/) |

---

## 📁 项目结构

```
.
├── app/                        # App Router 根目录
│   ├── layout.tsx              # 根布局
│   ├── page.tsx                # 首页（落地页）
│   ├── seed/route.ts           # 数据库种子数据初始化路由
│   ├── query/route.ts          # 数据库查询调试路由
│   ├── dashboard/              # 仪表盘（受保护的业务页面）
│   │   ├── layout.tsx          # 侧边栏布局
│   │   ├── page.tsx            # 概览页
│   │   ├── invoices/           # 发票管理（CRUD）
│   │   └── customers/          # 客户列表
│   ├── lib/                    # 数据访问层与工具函数
│   │   ├── data.ts             # 数据库查询函数
│   │   ├── placeholder-data.ts # 示例数据
│   │   └── utils.ts            # 通用工具（格式化等）
│   └── ui/                     # UI 组件
│       ├── dashboard/          # 仪表盘组件（卡片 / 图表 / 导航）
│       └── invoices/           # 发票相关组件（表单 / 表格 / 分页）
├── public/                     # 静态资源
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** ≥ 20（开发环境使用 v24）
- **pnpm**（推荐，本仓库使用 `pnpm-lock.yaml`）

### 1. 安装依赖

```bash
pnpm install
```

> 注意：`bcrypt` 为原生模块，安装时会进行本地编译，请确保已安装编译工具链。

### 2. 配置环境变量

复制示例文件并填写：

```bash
cp .env.example .env
```

需要在 [Vercel 控制台](https://vercel.com/docs/storage/vercel-postgres) 创建一个 Postgres 数据库，并填入以下变量：

```bash
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# 生成方式：openssl rand -base64 32
AUTH_SECRET=
AUTH_URL=http://localhost:3000/api/auth
```

### 3. 初始化数据库

启动开发服务器后，在浏览器访问种子路由，写入示例数据：

```bash
pnpm dev
```

然后打开 <http://localhost:3000/seed>。

### 4. 开始使用

访问 <http://localhost:3000>，使用课程提供的测试账号登录：

- 邮箱：`user@nextmail.com`
- 密码：`123456`

---

## 📜 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动开发服务器（启用 Turbopack） |
| `pnpm build` | 生产环境构建 |
| `pnpm start` | 启动生产服务器 |

---

## 📚 学习笔记

对应 Next.js 官方课程的章节：

1. Getting Started
2. CSS Styling
3. Optimizing Fonts and Images
4. Creating Layouts and Pages
5. Navigating Between Pages
6. Setting Up Your Database
7. Fetching Data
8. Static and Dynamic Rendering
9. Streaming
10. Adding Search and Pagination
11. Mutating Data
12. Handling Errors
13. Improving Accessibility
14. Adding Authentication

---

## 📄 License

本仓库为个人学习用途，基于 [Vercel next-learn](https://github.com/vercel/next-learn) 课程模板。
