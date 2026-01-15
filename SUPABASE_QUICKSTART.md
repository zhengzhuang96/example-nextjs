# 🚀 Supabase 快速设置

## ⚡ 5 分钟快速开始

### 步骤 1: 创建 Supabase 项目 (2 分钟)

1. 访问 https://supabase.com
2. 点击 **"Start your project"**
3. 使用 GitHub 账号登录（推荐）
4. 创建组织（可选）
5. 创建新项目：
   - 项目名: `ai-product`
   - 数据库密码: `YourStrongPassword123!`
   - 区域: `Southeast Asia (Singapore)` 或其他离你最近的
6. 等待创建完成 ⏳

### 步骤 2: 获取 API 密钥 (1 分钟)

项目创建后：

1. 点击左侧菜单 **"Settings"** → **"API"**
2. 复制以下两个值：
   ```
   Project URL: https://xxxxx.supabase.co
   anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 步骤 3: 配置环境变量 (1 分钟)

在项目根目录创建 `.env.local` 文件：

```bash
# 复制 .env.example
cp .env.example .env.local
```

编辑 `.env.local`，添加你的 Supabase 凭据：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 步骤 4: 启动项目 (1 分钟)

```bash
pnpm dev
```

访问 http://localhost:3000/en/signup 测试注册！

---

## ✅ 验证设置

### 测试 1: 注册新用户

1. 访问 `http://localhost:3000/en/signup`
2. 输入姓名、邮箱、密码
3. 点击 "Create Account"
4. ✅ 应该跳转到 Dashboard

### 测试 2: 登录

1. 访问 `http://localhost:3000/en/login`
2. 使用刚注册的账户登录
3. ✅ 应该跳转到 Dashboard 并显示用户信息

### 测试 3: 数据库验证

1. 打开 Supabase Dashboard
2. 进入 **Authentication** → **Users**
3. ✅ 应该能看到刚注册的用户

---

## 🔧 可选配置

### 启用 Google 登录

1. 在 Supabase Dashboard:
   - **Authentication** → **Providers** → **Google**
   - 点击 "Enable"

2. 添加 Google OAuth 应用：
   - 访问 https://console.cloud.google.com
   - 创建新项目或选择现有项目
   - 启用 Google+ API
   - 创建 OAuth 客户端 ID
   - 授权重定向 URI: `http://localhost:3000/en/auth/callback`

3. 在 Supabase 中配置：
   - 粘贴 Client ID 和 Client Secret
   - 保存

### 创建用户配置表

在 Supabase **SQL Editor** 中执行：

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

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

---

## 📱 测试流程

完整测试流程：

```bash
1. 注册账户
   http://localhost:3000/en/signup

2. 自动登录到 Dashboard
   应该显示你的邮箱

3. 登出
   点击 Dashboard 中的 "Sign Out"

4. 重新登录
   http://localhost:3000/en/login

5. 测试受保护路由
   未登录访问 /dashboard 会重定向到 /login
```

---

## 🎯 下一步

设置完成后，你可以：

1. **查看用户数据**: Dashboard → Database → profiles
2. **添加更多表**: 创建聊天历史、设置等表
3. **实现更多功能**: 文件上传、实时订阅等
4. **部署到生产**: 更新 Supabase URL 为生产环境

---

## 🆘 需要帮助？

查看详细文档：[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

或访问：
- [Supabase 文档](https://supabase.com/docs)
- [Supabase GitHub](https://github.com/supabase/supabase)

---

**创建时间**: 2025-01-14
**预计设置时间**: 5 分钟
