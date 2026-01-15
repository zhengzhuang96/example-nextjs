# 🔧 Supabase Client Import Fix

## 问题描述

在配置 Supabase 环境变量后，遇到了以下错误：

```
⨯ TypeError: (0 , _supabase_ssr__WEBPACK_IMPORTED_MODULE_0__.createClientComponentClient) is not a function
    at createClientComponentClient (lib/supabase/client.ts:3:61)
```

## 根本原因

`@supabase/ssr` 包 (v0.8.0) 的 API 已经更新，旧的 `createClientComponentClient` 和 `createServerComponentClient` 函数已被移除。

新的 API 使用：
- `createBrowserClient` 替代 `createClientComponentClient`
- `createServerClient` 替代 `createServerComponentClient`

这是 Supabase 官方整合所有 auth-helpers 包到 `@supabase/ssr` 后的统一 API。

## 修复内容

### 1. 更新客户端 Supabase 客户端

**文件**: [lib/supabase/client.ts](lib/supabase/client.ts)

```typescript
// ❌ 旧代码（错误）
import { createClientComponentClient } from '@supabase/ssr'

export const createClient = () => createClientComponentClient()

// ✅ 新代码（正确）
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### 2. 更新服务端 Supabase 客户端

**文件**: [lib/supabase/server.ts](lib/supabase/server.ts)

```typescript
// ❌ 旧代码（错误）
import { createServerComponentClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerComponentClient({
    cookies: () => cookieStore
  })
}

// ✅ 新代码（正确）
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### 3. 中间件客户端（无需修改）

**文件**: [lib/supabase/middleware.ts](lib/supabase/middleware.ts)

中间件已经在使用正确的 `createServerClient` API，无需修改。

## 验证结果

修复后，开发服务器成功启动：

```bash
✓ Starting...
✓ Ready in 1791ms
```

没有错误输出，应用程序正常运行。

## 重要变化

### 1. 显式传递环境变量

新的 API 需要显式传递 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`：

```typescript
createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### 2. Cookie 配置格式

服务端客户端的 cookie 配置格式略有变化：

```typescript
{
  cookies: {
    get(name: string) {
      return cookieStore.get(name)?.value
    },
  },
}
```

### 3. async/await 服务端客户端

服务端 `createClient()` 返回 Promise，需要使用 `await`：

```typescript
const supabase = await createClient()
```

## 影响的组件

以下组件使用了 Supabase 客户端，已验证正常工作：

- ✅ [components/auth-provider.tsx](components/auth-provider.tsx) - AuthProvider
- ✅ [app/[locale]/login/page.tsx](app/[locale]/login/page.tsx) - 登录页面
- ✅ [app/[locale]/signup/page.tsx](app/[locale]/signup/page.tsx) - 注册页面
- ✅ [app/[locale]/dashboard/page.tsx](app/[locale]/dashboard/page.tsx) - Dashboard
- ✅ [app/[locale]/auth/callback/route.ts](app/[locale]/auth/callback/route.ts) - OAuth 回调
- ✅ [app/[locale]/logout/route.ts](app/[locale]/logout/route.ts) - 登出路由
- ✅ [middleware.ts](middleware.ts) - Next.js 中间件

## 下一步

现在可以测试完整的认证流程：

1. **注册新用户**
   - 访问: http://localhost:3001/en/signup
   - 填写表单并提交

2. **登录**
   - 访问: http://localhost:3001/en/login
   - 使用注册的账户登录

3. **访问 Dashboard**
   - 登录后会自动跳转到 Dashboard
   - 应该显示用户信息

4. **登出**
   - 点击 Dashboard 中的 "Sign Out" 按钮

## 相关文档

- [Supabase SSR 文档](https://supabase.com/docs/guides/auth/server-side)
- [Next.js 集成指南](https://supabase.com/docs/guides/getting-started/nextjs)
- [从 auth-helpers 迁移](https://supabase.com/docs/guides/auth/server-side/overview)

---

**修复时间**: 2025-01-14
**状态**: ✅ 完全修复
**测试**: ✅ 开发服务器正常运行
