# 🗄️ Supabase 数据库设置指南

## 📋 概述

本指南将帮助你在 Supabase 中创建必要的数据库表，用于存储用户配置、聊天历史和用户设置。

## 🎯 创建的表

1. **profiles** - 用户配置信息
2. **chat_messages** - AI 聊天消息
3. **chat_conversations** - 聊天会话
4. **user_settings** - 用户偏好设置

## ⚡ 快速开始（3 分钟）

### 步骤 1: 打开 SQL Editor

1. 访问 https://supabase.com/dashboard
2. 选择你的项目
3. 点击左侧菜单的 **"SQL Editor"**
4. 点击 **"New query"**

### 步骤 2: 执行脚本

1. 打开项目根目录的 `supabase-schema.sql` 文件
2. 复制全部内容
3. 粘贴到 Supabase SQL Editor 中
4. 点击 **"Run"** 按钮执行

### 步骤 3: 验证结果

执行成功后，你应该看到类似这样的输出：

```
table_name         | column_count
-------------------|--------------
chat_conversations | 5
chat_messages      | 6
profiles           | 6
user_settings      | 5
```

## 📊 表结构详解

### 1. profiles (用户配置)

扩展 auth.users 表，存储额外的用户信息。

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,           -- 用户全名
  avatar_url TEXT,          -- 头像 URL
  email TEXT,               -- 邮箱
  updated_at TIMESTAMP,     -- 更新时间
  created_at TIMESTAMP      -- 创建时间
);
```

**安全策略：**
- ✅ 所有人可以查看用户配置
- ✅ 用户只能修改自己的配置
- ✅ 新用户注册时自动创建 profile

### 2. chat_messages (聊天消息)

存储 AI 聊天的所有消息。

```sql
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  conversation_id UUID REFERENCES chat_conversations(id),
  role TEXT,                -- 'user' | 'assistant' | 'system'
  content TEXT,             -- 消息内容
  created_at TIMESTAMP
);
```

**安全策略：**
- ✅ 用户只能查看自己的消息
- ✅ 用户只能发送自己的消息
- ✅ 用户可以删除自己的消息

### 3. chat_conversations (聊天会话)

组织聊天消息为会话。

```sql
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT,               -- 会话标题
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**安全策略：**
- ✅ 用户只能查看自己的会话
- ✅ 用户可以创建、修改、删除会话

### 4. user_settings (用户设置)

存储用户偏好设置。

```sql
CREATE TABLE public.user_settings (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  theme TEXT,               -- 'light' | 'dark' | 'system'
  language TEXT,            -- 'en' | 'zh'
  email_notifications BOOLEAN,
  updated_at TIMESTAMP
);
```

**安全策略：**
- ✅ 用户只能查看和修改自己的设置
- ✅ 新用户注册时自动创建默认设置

## 🔍 验证数据库

### 在 Supabase Dashboard 查看

1. 点击左侧菜单 **"Table Editor"**
2. 你应该能看到以下表：
   - `profiles`
   - `chat_messages`
   - `chat_conversations`
   - `user_settings`

### 查看数据

注册一个新用户后，检查 `profiles` 表：

```sql
SELECT * FROM public.profiles;
```

你应该能看到刚注册的用户信息。

### 检查触发器

查看自动创建 profile 的触发器：

```sql
SELECT
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

应该看到：
- `on_auth_user_created` - 自动创建 profile
- `on_user_created_create_settings` - 自动创建用户设置

## 🎨 使用示例

### 查询用户配置

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function getProfile(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return data
}
```

### 创建新会话

```typescript
import { createClient } from '@/lib/supabase/client'

export async function createConversation(title: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('chat_conversations')
    .insert({ title, user_id: user.id })
    .select()
    .single()

  return data
}
```

### 发送消息

```typescript
import { createClient } from '@/lib/supabase/client'

export async function sendMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      conversation_id: conversationId,
      user_id: user.id,
      role,
      content
    })
    .select()
    .single()

  return data
}
```

### 更新用户设置

```typescript
import { createClient } from '@/lib/supabase/client'

export async function updateSettings(settings: {
  theme?: 'light' | 'dark' | 'system'
  language?: 'en' | 'zh'
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', user.id)
    .select()
    .single()

  return data
}
```

## 🔧 故障排除

### 问题 1: 用户注册后没有创建 profile

**检查触发器：**
```sql
-- 查看触发器是否存在
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- 手动创建 profile
INSERT INTO public.profiles (id, email)
VALUES ('your-user-id', 'user@example.com');
```

### 问题 2: 无法插入消息

**检查 RLS 策略：**
```sql
-- 查看策略
SELECT * FROM pg_policies WHERE tablename = 'chat_messages';

-- 确保会话存在且属于当前用户
SELECT * FROM chat_conversations WHERE user_id = auth.uid();
```

### 问题 3: 权限错误

**重新创建策略：**
```sql
-- 删除所有策略
DROP POLICY IF EXISTS "Users can view own messages" ON chat_messages;

-- 重新创建
CREATE POLICY "Users can view own messages"
  ON chat_messages FOR SELECT
  USING (auth.uid() = user_id);
```

## 🚀 下一步

数据库设置完成后，你可以：

1. **实现聊天功能**
   - 使用 `chat_conversations` 和 `chat_messages` 表
   - 保存和加载聊天历史

2. **用户设置页面**
   - 让用户更改主题和语言
   - 保存到 `user_settings` 表

3. **用户配置页面**
   - 允许用户编辑姓名和头像
   - 更新 `profiles` 表

4. **实时功能**
   - 启用 Supabase Realtime
   - 实时显示新消息

## 📚 相关文档

- [Supabase Database 文档](https://supabase.com/docs/guides/database)
- [Row Level Security 指南](https://supabase.com/docs/guides/auth/row-level-security)
- [SQL 函数和触发器](https://supabase.com/docs/guides/database/functions)

---

**创建时间**: 2025-01-14
**状态**: ✅ 可用
**包含**: 完整数据库架构 + 安全策略 + 使用示例
