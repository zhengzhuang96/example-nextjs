# 🎨 项目视觉指南

## 界面预览

### 🏠 首页布局

```
┌─────────────────────────────────────────────────────────────┐
│  🤖 AI Product    [Features] [Pricing] [About]    [🌍] [🌙] [Login] [Get Started] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│                     ⚡ Powered by Advanced AI                 │
│                                                               │
│              Build Smarter with AI-Powered Solutions          │
│                                                               │
│        Transform your workflow with our cutting-edge...      │
│                                                               │
│        [Get Started Free →]  [Watch Demo]                    │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│           Why Choose Our Platform?                           │
│       Everything you need to harness the power of AI         │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  ⚡         │  │  🛡️        │  │  📊        │          │
│  │ Lightning   │  │ Enterprise  │  │ Advanced    │          │
│  │ Fast        │  │ Security    │  │ Analytics   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│           Ready to Get Started?                              │
│       Join thousands of teams already using...              │
│                                                               │
│              [Start Your Free Trial →]                      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  Product    Company    Legal                                 │
│  Features   About      Privacy                               │
│  Pricing    Blog       Terms                                 │
│  Docs       Careers    Contact                               │
│                                                               │
│  © 2025 AI Product. All rights reserved.                    │
└─────────────────────────────────────────────────────────────┘
```

### 🌍 语言切换

点击导航栏右上角的 **🌍** 按钮：

```
┌─────────────────┐
│ 🇺🇸 English      │ ← 当前语言
│ 🇨🇳 中文         │
└─────────────────┘
```

选择后立即切换，URL 也会更新：
- 英文: `http://localhost:3000/en`
- 中文: `http://localhost:3000/zh`

### 🌙 主题切换

点击导航栏的 **🌙/☀️** 图标切换深色/浅色模式

---

## 📱 移动端布局

```
┌─────────────────────────┐
│  🤖 AI    [🌍] [🌙] [▾] │
├─────────────────────────┤
│                         │
│    ⚡ Advanced AI       │
│                         │
│  Build Smarter with...  │
│                         │
│  [Get Started]          │
│  [Watch Demo]           │
│                         │
└─────────────────────────┘
```

---

## 💬 AI 聊天界面 (Demo 页)

```
┌────────────────────────────────────────────────────────────┐
│  🤖 AI Product                                    [🌍] [🌙] │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  🤖 AI Chat Assistant                                     │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │  🤖 Hello! I'm your AI assistant. How can I...      │ │
│  │                                                      │ │
│  │                                        👤 You       │ │
│  │                                                      │ │
│  │  🤖 I understand you're asking about...            │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────┐    │
│  │ Type your message...                     [Send]   │    │
│  └──────────────────────────────────────────────────┘    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🎨 组件样式指南

### 按钮变体

```tsx
<Button>Default</Button>        // 蓝色主按钮
<Button variant="outline">Outline</Button>  // 边框按钮
<Button variant="ghost">Ghost</Button>      // 幽灵按钮
<Button variant="destructive">Delete</Button> // 红色警告按钮
```

### 卡片组件

```tsx
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述文本</CardDescription>
  </CardHeader>
  <CardContent>
    内容区域
  </CardContent>
</Card>
```

### 颜色主题

**浅色模式**:
- Background: 白色 `#FFFFFF`
- Primary: 蓝色 `#3B82F6`
- Text: 深色 `#1F2937`

**深色模式**:
- Background: 深色 `#111827`
- Primary: 亮蓝 `#60A5FA`
- Text: 浅色 `#F9FAFB`

---

## 🔗 URL 路由结构

```
/                           → 自动重定向到 /en 或 /zh
/en                         → 英文首页
/zh                         → 中文首页
/en/features                → 英文功能页
/zh/features                → 中文功能页
/en/pricing                 → 英文价格页
/zh/pricing                 → 中文价格页
/en/demo                    → 英文演示页
/zh/demo                    → 中文演示页
```

---

## ⚙️ 快捷操作

### 开发

```bash
# 启动
pnpm dev

# 构建
pnpm build

# 运行生产版本
pnpm start
```

### 测试多语言

1. 访问 http://localhost:3000
2. 观察自动重定向到 `/en` 或 `/zh`
3. 点击右上角 🌍 切换语言
4. 注意所有文本立即更新

### 测试深色模式

1. 点击右上角 🌙 图标
2. 观察页面变为深色主题
3. 再次点击切换回浅色模式

---

## 📝 常用翻译命名空间

```tsx
const t = useTranslations('namespace')

// 可用的命名空间：
'common'     // 通用文本
'nav'        // 导航菜单
'footer'     // 页脚
'home'       // 首页
'features'   // 功能页
'pricing'    // 价格页
'about'      // 关于页
'chat'       // 聊天
'demo'       // 演示
'login'      // 登录
'signup'     // 注册
```

---

## 🎯 下一步

1. **查看文档**: 阅读 [README_I18N.md](README_I18N.md)
2. **启动项目**: 运行 `pnpm dev`
3. **添加翻译**: 参考 [AI_PROJECT.md](AI_PROJECT.md)
4. **集成 AI**: 修改 `components/chat-interface.tsx`

---

**祝您开发愉快！** 🚀
