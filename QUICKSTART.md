# 🚀 快速启动指南

## 1️⃣ 安装依赖

```bash
pnpm install
```

## 2️⃣ 启动开发服务器

```bash
pnpm dev
```

## 3️⃣ 访问应用

打开浏览器访问：

- 🇺🇸 **英文版**: http://localhost:3000/en
- 🇨🇳 **中文版**: http://localhost:3000/zh

访问根路径 `http://localhost:3000` 会根据浏览器语言自动跳转。

## ✨ 功能演示

### 语言切换
点击导航栏右上角的语言按钮（🌍）切换中英文

### 深色模式
点击导航栏的月亮/太阳图标切换深色/浅色模式

### 页面导航
- 首页：完整的落地页设计
- Demo：AI 聊天演示
- Chat：全屏聊天界面
- Features：功能特性展示
- Pricing：价格方案
- About：关于页面
- Login/Signup：认证页面

## 📝 下一步

1. **查看文档**: 阅读 [README_I18N.md](./README_I18N.md) 了解项目详情
2. **添加翻译**: 参考 [AI_PROJECT.md](./AI_PROJECT.md) 的国际化指南
3. **集成 AI**: 在 `components/chat-interface.tsx` 中集成真实的 AI API
4. **自定义样式**: 修改 `app/globals.css` 调整主题颜色

## 🛠️ 常用命令

```bash
pnpm dev          # 开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 代码检查
```

## 📚 文件说明

| 文件 | 说明 |
|------|------|
| `i18n/messages/en.json` | 英文翻译 |
| `i18n/messages/zh.json` | 中文翻译 |
| `app/[locale]/page.tsx` | 首页（已翻译） |
| `components/navbar.tsx` | 导航栏（已翻译） |
| `components/footer.tsx` | 页脚（已翻译） |
| `components/chat-interface.tsx` | AI 聊天组件 |

## 🌍 添加新翻译

1. 编辑 `i18n/messages/en.json` 添加英文
2. 编辑 `i18n/messages/zh.json` 添加中文
3. 在组件中使用:

```tsx
import { useTranslations } from 'next-intl'

const t = useTranslations('yourNamespace')
<h1>{t('yourKey')}</h1>
```

## 💡 提示

- 项目使用 **pnpm** 作为包管理器
- 默认语言是**英文**
- 自动检测浏览器语言
- 所有链接需要加上语言前缀（`/en/`, `/zh/`）

## 🎉 开始使用

现在您已经准备好开始开发了！

查看 [AI_PROJECT.md](./AI_PROJECT.md) 了解完整的开发指南。
