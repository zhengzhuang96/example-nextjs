# 🗄️ Prisma ORM Integration Guide

本指南介绍如何在本项目中使用 Prisma ORM。

## 📋 两种使用方式

### 方式一：Prisma + Supabase（推荐用于新功能）

使用 Prisma 作为主要 ORM，连接到 Supabase 的 PostgreSQL 数据库。

#### 优点：
- ✅ 类型安全的查询
- ✅ 自动生成 TypeScript 类型
- ✅ 更好的开发体验
- ✅ 迁移管理
- ✅ 查询优化

#### 配置步骤：

1. **添加 DATABASE_URL 到 `.env.local`**：
```bash
# 从 Supabase Dashboard 获取：
# Settings > Database > Connection String > URI
# Format: postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres

DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

2. **生成 Prisma Client**：
```bash
pnpm prisma generate
```

3. **使用 Prisma 查询**：
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 查询用户配置
const profile = await prisma.profile.findUnique({
  where: { id: userId }
})

// 创建聊天消息
const message = await prisma.chatMessage.create({
  data: {
    userId,
    conversationId,
    role: 'USER',
    content: 'Hello!'
  }
})
```

### 方式二：保留 Supabase SDK（继续使用现有方式）

继续使用现有的 `@supabase/ssr` 客户端。

#### 优点：
- ✅ 已经集成并工作
- ✅ 原生支持 Supabase Auth
- ✅ RLS 策略自动应用
- ✅ 实时订阅功能

#### 使用方式：
```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()

// 查询
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

## 🔄 推荐的混合策略

### 使用 Prisma 的场景：
- 新的数据库操作
- 复杂的查询和关联
- 需要类型安全的场景
- 后台任务和脚本

### 使用 Supabase SDK 的场景：
- 认证相关的操作
- 实时订阅（Realtime）
- 简单的 CRUD 操作
- 已经实现的功能

## 📝 Prisma 使用示例

### 1. Profile 操作

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 获取用户配置
async function getProfile(userId: string) {
  return await prisma.profile.findUnique({
    where: { id: userId }
  })
}

// 更新用户配置
async function updateProfile(userId: string, data: {
  fullName?: string
  avatarUrl?: string
}) {
  return await prisma.profile.update({
    where: { id: userId },
    data
  })
}
```

### 2. Chat 操作

```typescript
// 创建会话
const conversation = await prisma.chatConversation.create({
  data: {
    userId,
    title: 'New Chat'
  }
})

// 添加消息
const message = await prisma.chatMessage.create({
  data: {
    userId,
    conversationId: conversation.id,
    role: 'USER',
    content: 'Hello!'
  }
})

// 获取会话的所有消息
const messages = await prisma.chatMessage.findMany({
  where: { conversationId: conversation.id },
  orderBy: { createdAt: 'asc' }
})
```

### 3. Settings 操作

```typescript
// 获取用户设置
const settings = await prisma.userSettings.findUnique({
  where: { userId }
})

// 更新设置
await prisma.userSettings.update({
  where: { userId },
  data: {
    theme: 'DARK',
    language: 'ZH'
  }
})
```

## 🚀 快速开始

### 选项 1：仅使用 Prisma（新项目推荐）

1. 配置 `DATABASE_URL`
2. 运行 `pnpm prisma generate`
3. 在代码中导入并使用 Prisma Client

### 选项 2：Prisma + Supabase SDK 混合使用（当前项目）

1. 保留现有的 Supabase SDK 用于认证和实时功能
2. 使用 Prisma 用于新的数据库操作
3. 两者可以共存，操作同一个数据库

## 📦 数据库模型

Prisma schema 包含以下模型：

- **Profile**: 用户配置信息
- **ChatMessage**: 聊天消息
- **ChatConversation**: 聊天会话
- **UserSettings**: 用户设置

## ⚠️ 注意事项

1. **RLS 策略**: Prisma 不会自动应用 Supabase 的 RLS 策略，需要在查询时手动过滤用户数据

2. **Auth 集成**: 继续使用 Supabase Auth，Prisma 只用于数据操作

3. **迁移**: 使用 `prisma migrate dev` 进行数据库迁移

## 🔗 相关资源

- [Prisma 文档](https://www.prisma.io/docs)
- [Supabase + Prisma 指南](https://supabase.com/docs/guides/platform/prisma)
- [Prisma Schema 参考](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

---

**当前状态**: Prisma 已安装并配置，schema 已创建。下一步是选择使用方式并生成 Client。
