# 🗄️ Supabase 数据库设置指南

## 📋 目录

1. [创建 Supabase 项目](#创建-supabase-项目)
2. [配置认证](#配置认证)
3. [数据库架构](#数据库架构)
4. [Row Level Security (RLS)](#row-level-security-rls)
5. [环境变量配置](#环境变量配置)
6. [测试认证](#测试认证)

---

## 🚀 创建 Supabase 项目

### 1. 注册 Supabase 账号

访问 https://supabase.com 并注册账号

### 2. 创建新项目

1. 点击 "New Project"
2. 输入项目信息：
   - **Name**: `ai-product-template`
   - **Database Password**: (选择强密码并保存)
   - **Region**: 选择离你最近的区域
3. 等待项目创建完成（约 2 分钟）

### 3. 获取 API 密钥

在项目设置中：
- 找到 **API** → **Project URL**
- 复制 `anon public` 密钥

---

## 🔐 配置认证

### 启用认证提供商

1. 进入 **Authentication** → **Providers**
2. 启用 **Email** 提供商（默认已启用）
3. （可选）启用 **Google** OAuth：
   - 点击 **Google** 图标
   - 添加你的 Google OAuth 凭据
   - 设置 Redirect URL: `http://localhost:3000/[locale]/auth/callback`

### 配置 Email 设置（可选）

在 **Authentication** → **URL Configuration** 中：
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: 添加 `http://localhost:3000/[locale]/auth/callback`

---

## 🗄️ 数据库架构

### 用户配置文件表（自动创建）

Supabase Auth 会自动创建 `auth.users` 表。

### 扩展用户信息表

创建 `profiles` 表来存储额外的用户信息：

```sql
-- 在 Supabase SQL Editor 中执行
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 启用 RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 创建策略
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 创建自动创建 profile 的触发器
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 聊天历史表（示例）

```sql
CREATE TABLE public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 🔒 Row Level Security (RLS)

Supabase 默认启用 RLS。上面的 SQL 已包含必要的策略。

### 验证 RLS 策略

在 Supabase Dashboard → **Authentication** → **Policies** 中验证：
- `profiles` 表的 SELECT/INSERT/UPDATE 策略
- `chat_messages` 表的 SELECT/INSERT 策略

---

## ⚙️ 环境变量配置

### 1. 创建 `.env.local` 文件

```bash
cp .env.example .env.local
```

### 2. 填写 Supabase 凭据

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. 获取凭证位置

在 Supabase Dashboard:
1. 进入你的项目
2. 点击左侧 **Settings** → **API**
3. 复制以下内容：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🧪 测试认证

### 1. 启动开发服务器

```bash
pnpm dev
```

### 2. 测试注册

1. 访问 `http://localhost:3000/en/signup`
2. 填写表单并注册
3. （可选）测试 Google OAuth 登录

### 3. 测试登录

1. 使用刚注册的账户登录
2. 应该自动跳转到 `/en/dashboard`
3. 检查用户信息是否正确显示

### 4. 测试受保护路由

1. 登出后访问 `http://localhost:3000/en/dashboard`
2. 应该重定向到登录页面

---

## 📊 Supabase Dashboard 功能

### 查看 Users

**Authentication** → **Users** 可以看到所有注册用户

### 查看数据库数据

**Database** → **Table Editor** 可以查看表数据

### 查看认证日志

**Database** → **Logs** → **Auth Logs** 可以查看登录历史

---

## 🔧 常见问题

### 问题：认证重定向失败

**解决**：检查 Redirect URL 是否正确配置
- Supabase Dashboard → Authentication → URL Configuration
- 确保 Site URL 为 `http://localhost:3000`

### 问题：Google OAuth 不工作

**解决**：
1. 在 Google Cloud Console 创建 OAuth 凭据
2. 添加授权重定向 URI：`http://localhost:3000/en/auth/callback`
3. 在 Supabase 中配置 Google Provider

### 问题：RLS 策略阻止查询

**解决**：
```sql
-- 临时禁用 RLS（仅用于开发）
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 查看数据后重新启用
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

---

## 🚀 生产环境配置

### 更新环境变量

```env
# 生产环境
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 更新 Redirect URLs

在 Supabase Dashboard 中：
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/[locale]/auth/callback`

---

## 📚 相关文档

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [OAuth Providers](https://supabase.com/docs/guides/auth/social-login)

---

**创建时间**: 2025-01-14
**最后更新**: 2025-01-14
