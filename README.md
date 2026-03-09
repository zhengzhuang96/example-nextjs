# Next.js 学习模板 🚀

> 从零到精通：完整的 Next.js 15 学习路径和实战项目

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

这是一个完整的 Next.js 学习项目，包含 6 个学习模块、实战博客系统和最佳实践示例。适合 Next.js 初学者和希望系统学习现代 Web 开发的开发者。

## ✨ 特性

- 📚 **系统化学习路径** - 从基础到高级的完整教程
- 💻 **实战项目** - 包含博客系统的完整实现
- 🎨 **现代化 UI** - 使用 Tailwind CSS 构建的美观界面
- 📱 **响应式设计** - 完美适配各种设备
- 🌓 **暗色模式** - 支持系统主题自动切换
- 🔧 **可复用组件** - 生产级别的组件库
- 📖 **详细注释** - 每个概念都有清晰的说明

## 🎯 学习模块

本项目包含 6 个核心学习模块，涵盖 Next.js 开发的所有重要概念：

### 1. 🏗️ 项目结构
了解 Next.js 的文件组织方式和目录结构最佳实践。

- [查看教程](./src/app/structure) | [本地运行](http://localhost:3000/structure)

### 2. 🚀 路由系统
深入学习 App Router、动态路由、嵌套路由等高级功能。

- [查看教程](./src/app/routing) | [本地运行](http://localhost:3000/routing)

### 3. ⚡ 数据获取
掌握服务端渲染、静态生成、增量静态再生成等数据获取策略。

- [查看教程](./src/app/data-fetching) | [本地运行](http://localhost:3000/data-fetching)

### 4. 🎨 样式和 UI
学习 Tailwind CSS 的使用技巧和响应式设计。

- [查看教程](./src/app/styling) | [本地运行](http://localhost:3000/styling)

### 5. 🔧 API 路由
理解 API Routes 和 Server Actions 的使用场景。

- [查看教程](./src/app/api-routes) | [本地运行](http://localhost:3000/api-routes)

### 6. 🚢 部署上线
学习如何将应用部署到 Vercel 等平台。

- [查看教程](./src/app/deployment) | [本地运行](http://localhost:3000/deployment)

## 🛠️ 技术栈

本项目使用最新的 Web 开发技术栈：

- **框架**: [Next.js 16.1.6](https://nextjs.org/) - React 框架
- **语言**: [TypeScript 5.0](https://www.typescriptlang.org/) - 类型安全
- **样式**: [Tailwind CSS 4.0](https://tailwindcss.com/) - 原子化 CSS
- **路由**: App Router - Next.js 最新路由系统
- **字体**: [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) - 自动字体优化

## 🚀 快速开始

### 前置要求

- Node.js 18.17 或更高版本
- npm、yarn、pnpm 或 bun

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/zhengzhuang96/example-nextjs.git
cd example-nextjs
```

2. **安装依赖**
```bash
npm install
# 或
pnpm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或
pnpm dev
# 或
yarn dev
```

4. **打开浏览器**
访问 [http://localhost:3000](http://localhost:3000) 查看项目。

## 📂 项目结构

```
example-nextjs/
├── src/
│   ├── app/                      # App Router 目录
│   │   ├── layout.tsx            # 根布局组件
│   │   ├── page.tsx              # 首页（学习仪表板）
│   │   ├── globals.css           # 全局样式
│   │   ├── structure/            # 项目结构教程
│   │   ├── routing/              # 路由系统教程
│   │   ├── data-fetching/        # 数据获取教程
│   │   ├── styling/              # 样式UI教程
│   │   ├── api-routes/           # API路由教程
│   │   ├── deployment/           # 部署上线教程
│   │   ├── blog/                 # 博客示例
│   │   │   ├── [slug]/          # 动态路由文章页
│   │   │   └── page.tsx         # 博客列表
│   │   └── api/                  # API 路由
│   │       └── hello/            # 示例 API
│   ├── components/               # 可复用组件
│   │   ├── layout/              # 布局组件
│   │   │   └── Navigation.tsx   # 导航栏
│   │   └── ui/                  # UI 组件
│   │       ├── Card.tsx         # 卡片组件
│   │       └── LearningCard.tsx # 学习卡片组件
│   └── lib/                     # 工具函数
│       ├── actions.ts           # Server Actions
│       └── blog-data.ts         # 博客数据
├── public/                       # 静态资源
├── next.config.ts               # Next.js 配置
├── tailwind.config.ts           # Tailwind CSS 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目依赖
```

## 💻 实战示例

### 博客系统

项目包含一个完整的博客系统，展示了以下概念：

- **动态路由** - `/blog/[slug]`
- **数据获取** - 服务端组件数据获取
- **静态生成** - 使用 `generateStaticParams`
- **组件复用** - 可复用的 UI 组件
- **响应式设计** - 移动端适配

访问 [http://localhost:3000/blog](http://localhost:3000/blog) 查看博客示例。

### Server Actions 示例

在 `/api-routes` 页面，你可以体验实际的 Server Actions：

- 联系表单提交
- 邮件订阅
- 实时表单验证
- 错误处理

### API Routes 示例

项目包含一个可工作的 API 端点：

- `/api/hello` - 测试 API 端点
- 支持 GET 和 POST 方法
- 完整的错误处理

## 📚 学习路径

### 初学者路径

1. 从 **[首页](http://localhost:3000)** 开始，查看学习仪表板
2. 按顺序完成 6 个学习模块
3. 每个模块都包含理论知识和代码示例
4. 参考 **[博客示例](http://localhost:3000/blog)** 理解实际应用

### 进阶开发者

1. 直接查看感兴趣的学习模块
2. 研究 **[组件代码](src/components)**
3. 学习 **[Server Actions](src/lib/actions.ts)** 实现
4. 参考项目结构组织自己的代码

## 🎨 自定义和扩展

### 修改主题颜色

项目使用 Tailwind CSS，你可以轻松自定义主题：

```typescript
// 修改渐变色
className="bg-gradient-to-r from-blue-600 to-purple-600"

// 修改组件颜色
className="bg-blue-500 text-white"
```

### 添加新的学习模块

1. 在 `src/app/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 在导航中添加链接

### 扩展博客功能

- 修改 `src/lib/blog-data.ts` 添加文章
- 创建新的动态路由
- 添加评论功能
- 集成数据库

## 🚢 部署

### Vercel 部署（推荐）

1. 推送代码到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 导入你的仓库
4. 自动部署完成

详细步骤请查看 [部署教程](http://localhost:3000/deployment)。

### 其他平台

项目也可以部署到：
- **Netlify** - 支持 Next.js
- **Docker** - 容器化部署
- **自托管** - 使用 Node.js

## 📖 学习资源

### 官方文档

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

### 社区资源

- [Next.js GitHub](https://github.com/vercel/next.js)
- [Next.js 示例](https://github.com/vercel/next.js/tree/canary/examples)
- [Vercel 模板](https://vercel.com/templates)

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

<div align="center">

[⬆ 返回顶部](#next-js-学习模板-)

</div>
