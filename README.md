# Next.js 开发模板学习指南

> 从零开始学习 Next.js 开发，一步一步构建现代化的 Web 应用

## 📚 学习路线

本教程将带你从零开始，逐步掌握 Next.js 开发的核心概念和最佳实践。

### 第一阶段：项目初始化 🚀

#### 1.1 创建 Next.js 项目
```bash
# 使用 create-next-app 创建项目
npx create-next-app@latest my-nextjs-app

# 或者使用 TypeScript
npx create-next-app@latest my-nextjs-app --typescript

# 交互式选项说明：
# - TypeScript: 是否使用 TypeScript (推荐 Yes)
# - ESLint: 是否使用 ESLint (推荐 Yes)
# - Tailwind CSS: 是否使用 Tailwind CSS (推荐 Yes)
# - App Router: 是否使用 App Router (推荐 Yes)
# - Src Directory: 是否使用 src 目录 (推荐 Yes)
# - Import Alias: 配置导入别名 (推荐 @/*)
```

#### 1.2 项目结构说明
```
my-nextjs-app/
├── src/
│   ├── app/              # App Router 目录
│   │   ├── layout.tsx    # 根布局
│   │   ├── page.tsx      # 首页
│   │   ├── globals.css   # 全局样式
│   │   └── api/          # API 路由
│   ├── components/       # 可复用组件
│   ├── lib/              # 工具函数和配置
│   └── types/            # TypeScript 类型定义
├── public/               # 静态资源
├── next.config.js        # Next.js 配置
├── tailwind.config.js    # Tailwind CSS 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖
```

### 第二阶段：核心概念学习 📖

#### 2.1 App Router (应用路由)
- **文件系统路由**: 基于 `app/` 目录自动生成路由
- **嵌套布局**: 使用 `layout.tsx` 创建共享布局
- **服务端组件**: 默认组件在服务端渲染
- **客户端组件**: 使用 `'use client'` 指令

#### 2.2 数据获取
```typescript
// 服务端组件中直接使用 async/await
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function Page() {
  const users = await getUsers();
  return <div>{/* 渲染用户列表 */}</div>;
}
```

#### 2.3 路由参数
```typescript
// 动态路由 app/users/[id]/page.tsx
export default function UserPage({ params }: { params: { id: string } }) {
  return <div>User ID: {params.id}</div>;
}
```

### 第三阶段：实战功能开发 ⚡

#### 3.1 响应式设计
- 使用 Tailwind CSS 构建响应式布局
- 移动优先的设计理念
- 断点系统: `sm:` `md:` `lg:` `xl:` `2xl:`

#### 3.2 表单处理
- 使用 Server Actions 处理表单提交
- 客户端表单验证
- 错误处理和加载状态

#### 3.3 状态管理
- React Server Components 状态管理
- 客户端状态: Context API / Zustand / Jotai
- 服务端状态: SWR / React Query

#### 3.4 API 路由
```typescript
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

### 第四阶段：性能优化 🎯

#### 4.1 图片优化
```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // 首屏图片优先加载
/>
```

#### 4.2 字体优化
```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

#### 4.3 代码分割和懒加载
```tsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### 第五阶段：部署上线 🚢

#### 5.1 构建准备
```bash
# 构建生产版本
npm run build

# 本地预览生产版本
npm run start
```

#### 5.2 部署平台选择
- **Vercel**: Next.js 官方平台，零配置部署
- **Netlify**: 支持 Next.js 的 CDN 部署
- **Docker**: 容器化部署
- **自托管**: 使用 Node.js 服务器

## 🎯 学习目标

通过本教程，你将学会：

✅ 从零创建一个 Next.js 项目
✅ 理解和使用 App Router
✅ 实现服务端和客户端渲染
✅ 构建响应式用户界面
✅ 处理表单和用户交互
✅ 创建 API 路由
✅ 优化应用性能
✅ 部署应用到生产环境

## 📝 学习建议

1. **循序渐进**: 不要急于求成，按阶段逐步学习
2. **动手实践**: 每个概念都要亲自敲代码验证
3. **阅读文档**: 遇到问题时查阅 [Next.js 官方文档](https://nextjs.org/docs)
4. **代码审查**: 定期回顾和重构代码
5. **社区交流**: 加入 Next.js 社区获取帮助和分享经验

## 🔗 相关资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

## 💡 下一步

准备好了吗？让我们从 **第一阶段：项目初始化** 开始吧！

---

**学习进度跟踪**

- [ ] 第一阶段：项目初始化
- [ ] 第二阶段：核心概念学习
- [ ] 第三阶段：实战功能开发
- [ ] 第四阶段：性能优化
- [ ] 第五阶段：部署上线

---

*本教程持续更新中，如有问题欢迎提 Issue 或 PR*
