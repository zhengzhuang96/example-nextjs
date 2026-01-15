# 📝 Blog Feature Setup Guide

## ✅ 已完成的功能

### 1. 数据库模型 (Prisma Schema)
- **Post 模型**：包含博客文章的所有字段
  - 标题、slug、摘要、内容、封面图
  - 多语言支持 (EN/ZH)
  - 发布状态和发布时间
  - 作者关联

### 2. 页面
- **博客列表页** ([app/[locale]/blog/page.tsx](app/[locale]/blog/page.tsx))
  - 显示已发布的文章列表
  - 支持多语言
  - 卡片式布局，响应式设计
  - 显示封面图、标题、摘要、作者和发布时间

- **博客详情页** ([app/[locale]/blog/[slug]/page.tsx](app/[locale]/blog/[slug]/page.tsx))
  - 显示完整文章内容
  - 支持富文本/HTML 内容
  - 显示作者和发布时间
  - 相关文章推荐
  - SEO 优化（动态 metadata）

### 3. 国际化 (i18n)
- 添加了博客相关的翻译键
- 支持中英文切换
- 导航栏已添加博客链接

## 🚀 如何使用

### 1. 创建博客文章

在数据库中创建文章的几种方式：

#### 方式 A: 使用 Prisma Studio (推荐用于开发)
```bash
# 启动 Prisma Studio
pnpm prisma studio

# 在浏览器中打开 http://localhost:5555
# 手动添加 Post 记录
```

#### 方式 B: 使用 SQL (在 Supabase SQL Editor 中)
```sql
INSERT INTO posts (
  id,
  title,
  slug,
  excerpt,
  content,
  cover_image,
  locale,
  published,
  author_id,
  published_at
) VALUES (
  gen_random_uuid(),
  'Getting Started with AI',
  'getting-started-with-ai',
  'Learn how to use AI to boost your productivity',
  '<p>This is the blog post content...</p>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  'EN',
  true,
  'USER_ID_HERE',  -- 替换为实际的用户 ID
  NOW()
);
```

#### 方式 C: 使用 Prisma Client (在代码中)
```typescript
import { prisma } from '@/lib/prisma'

const post = await prisma.post.create({
  data: {
    title: 'Getting Started with AI',
    slug: 'getting-started-with-ai',
    excerpt: 'Learn how to use AI to boost your productivity',
    content: '<p>This is the blog post content...</p>',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    locale: 'EN',
    published: true,
    authorId: 'USER_ID_HERE',
    publishedAt: new Date()
  }
})
```

### 2. 文章字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | String | ✅ | 文章标题 |
| `slug` | String | ✅ | URL 友好的唯一标识符 (如: "my-first-post") |
| `excerpt` | Text | ❌ | 文章摘要（显示在列表页） |
| `content` | Text | ✅ | 文章内容（支持 HTML） |
| `coverImage` | String | ❌ | 封面图片 URL |
| `locale` | Enum | ✅ | 语言 (EN 或 ZH) |
| `published` | Boolean | ✅ | 是否发布 (true/false) |
| `authorId` | UUID | ✅ | 作者 ID (关联 profiles 表) |
| `publishedAt` | DateTime | ❌ | 发布时间 |

### 3. 创建示例文章

这里有几个示例文章可以用于测试：

#### 英文示例
```typescript
await prisma.post.create({
  data: {
    title: 'Introduction to Artificial Intelligence',
    slug: 'introduction-to-ai',
    excerpt: 'Discover the fundamentals of AI and how it\'s transforming industries worldwide.',
    content: `
      <h2>What is AI?</h2>
      <p>Artificial Intelligence (AI) refers to the simulation of human intelligence in machines...</p>
      <h2>Key Applications</h2>
      <ul>
        <li>Natural Language Processing</li>
        <li>Computer Vision</li>
        <li>Robotics</li>
      </ul>
    `,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    locale: 'EN',
    published: true,
    authorId: 'USER_ID',
    publishedAt: new Date()
  }
})
```

#### 中文示例
```typescript
await prisma.post.create({
  data: {
    title: '人工智能入门指南',
    slug: 'ru-men-zhi-nan',
    excerpt: '探索人工智能的基础知识，了解它如何改变世界。',
    content: `
      <h2>什么是人工智能？</h2>
      <p>人工智能（AI）是指在机器中模拟人类智能的技术...</p>
      <h2>主要应用</h2>
      <ul>
        <li>自然语言处理</li>
        <li>计算机视觉</li>
        <li>机器人技术</li>
      </ul>
    `,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    locale: 'ZH',
    published: true,
    authorId: 'USER_ID',
    publishedAt: new Date()
  }
})
```

## 📱 访问博客

- **博客列表**: `http://localhost:3000/en/blog` 或 `http://localhost:3000/zh/blog`
- **文章详情**: `http://localhost:3000/en/blog/introduction-to-ai`

## 🎨 自定义

### 修改样式
博客页面使用了以下组件：
- `Card` - 文章卡片
- `Badge` - 标签
- `Button` - 按钮
- `prose` - 内容样式 (来自 Typography 插件)

你可以修改这些组件的样式来自定义博客外观。

### 添加新字段
如果需要添加新字段（如标签、分类等）：
1. 更新 [prisma/schema.prisma](prisma/schema.prisma) 中的 Post 模型
2. 运行 `pnpm prisma generate`
3. 更新页面代码以使用新字段

## 🔍 SEO 优化

博客详情页已经包含 SEO 优化：
- 动态生成页面标题
- Open Graph 元数据（用于社交分享）
- 结构化的 URL (slug)

## 📝 注意事项

1. **多语言支持**：确保为同一篇文章创建英文和中文两个版本，使用不同的 slug
2. **图片优化**：建议使用优化的图片 URL，或使用 Next.js Image 组件
3. **内容安全**：如果使用用户生成的内容，确保进行 HTML 清理以防止 XSS 攻击
4. **性能**：对于大量文章，考虑添加分页功能

## 🚀 下一步增强

可以考虑添加以下功能：
- 文章分类/标签系统
- 搜索功能
- 分页
- 文章点赞/评论
- RSS 订阅
- 文章分享按钮

---

**当前状态**: ✅ 博客功能已完全集成，可以开始创建文章了！
