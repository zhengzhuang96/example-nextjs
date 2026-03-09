# 贡献指南

感谢你考虑为 Next.js 学习模板项目做出贡献！

## 🤝 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议：

1. 检查 [Issues](https://github.com/zhengzhuang96/example-nextjs/issues) 确保问题还没有被报告
2. 创建一个新的 Issue，详细描述问题或建议
3. 提供重现步骤、截图或代码示例

### 提交代码

1. **Fork 项目**
   ```bash
   # 在 GitHub 上点击 Fork 按钮
   git clone https://github.com/YOUR_USERNAME/example-nextjs.git
   cd example-nextjs
   ```

2. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **进行更改**
   - 遵循现有的代码风格
   - 添加必要的注释
   - 更新相关文档
   - 确保代码通过类型检查

4. **测试更改**
   ```bash
   npm install
   npm run dev
   npm run build
   npm run lint
   ```

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加你的功能描述"
   ```

6. **推送到 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 访问原仓库的 Pull Requests 页面
   - 点击 "New Pull Request"
   - 提供清晰的 PR 描述

## 📝 代码规范

### TypeScript

- 使用 TypeScript 进行类型检查
- 避免使用 `any` 类型
- 为组件和函数添加类型注解

### 代码风格

- 使用 2 空格缩进
- 使用单引号（JSX 中使用双引号）
- 组件使用 PascalCase
- 函数和变量使用 camelCase

### 组件规范

```tsx
// ✅ 好的组件
interface ButtonProps {
  variant: "primary" | "secondary";
  children: ReactNode;
}

export default function Button({ variant, children }: ButtonProps) {
  return <button className={variant}>{children}</button>;
}

// ❌ 避免这样做
export default function Button(props: any) {
  return <button>{props.children}</button>;
}
```

### 提交信息规范

使用语义化的提交信息：

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

## 🎨 设计规范

### 颜色使用

- **主色**: blue-600, purple-600
- **成功色**: green-500
- **警告色**: yellow-500
- **错误色**: red-500
- **信息色**: blue-500

### 组件尺寸

- **按钮**: sm (px-4 py-2), md (px-6 py-3), lg (px-8 py-4)
- **间距**: 4px (1), 8px (2), 16px (4), 24px (6), 32px (8)

### 响应式断点

- **sm**: 640px (小屏幕)
- **md**: 768px (中等屏幕)
- **lg**: 1024px (大屏幕)
- **xl**: 1280px (超大屏幕)

## 📚 项目结构

```
src/
├── app/              # 页面和路由
├── components/       # 可复用组件
│   ├── layout/      # 布局组件
│   └── ui/          # UI 组件
└── lib/             # 工具函数
```

## 🧪 测试

在提交 PR 前，请确保：

- [ ] 代码可以通过 TypeScript 检查
- [ ] 代码符合 ESLint 规范
- [ ] 新功能有相应的文档说明
- [ ] 在不同浏览器中测试过
- [ ] 响应式设计正常工作

## 💡 功能建议

我们欢迎以下类型的贡献：

- 📚 新的学习模块
- 🎨 UI/UX 改进
- 🐛 Bug 修复
- 📖 文档改进
- ⚡ 性能优化
- 🌐 国际化支持
- ♿ 可访问性改进

## 📧 联系方式

如有问题，请通过以下方式联系：

- GitHub Issues: [创建问题](https://github.com/zhengzhuang96/example-nextjs/issues)
- 邮箱: zhengzhuang@yuanduyun.com

## 📄 许可证

通过贡献代码，你同意你的贡献将使用 MIT 许可证进行授权。

---

**再次感谢你的贡献！** 🎉
