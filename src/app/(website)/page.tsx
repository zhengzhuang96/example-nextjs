import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Globe,
  Layout,
  Shield,
  Zap,
  Users,
  TrendingUp,
  BarChart3,
  Clock,
  Star,
  Building2,
  Sparkles,
  Target,
  Rocket,
  Award,
  Puzzle
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Layout,
      title: "现代化架构",
      description: "基于 Next.js 16 + React 19 构建的最新企业级应用架构，提供卓越的性能和开发体验",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: Shield,
      title: "企业级安全",
      description: "完善的权限管理系统，多层安全防护，符合企业级应用的安全标准和合规要求",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      icon: Zap,
      title: "极致性能",
      description: "SSG、SSR、ISR 多种渲染模式，智能缓存策略，提供极致的用户体验和快速响应",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      icon: Code2,
      title: "组件化开发",
      description: "基于 Shadcn UI 的企业级组件库，高度可复用，统一的设计语言，提升开发效率",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      icon: Database,
      title: "数据管理",
      description: "完善的数据管理方案，支持多种数据源，灵活的数据处理策略，确保数据安全",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    },
    {
      icon: Globe,
      title: "全球化部署",
      description: "支持多语言、多区域部署，CDN 加速，为全球用户提供快速访问体验",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
    }
  ];

  const advantages = [
    {
      icon: Rocket,
      title: "快速开发",
      description: "预置企业级组件和最佳实践，大幅缩短开发周期"
    },
    {
      icon: Shield,
      title: "安全可靠",
      description: "内置安全防护机制，通过企业级安全标准认证"
    },
    {
      icon: TrendingUp,
      title: "易于扩展",
      description: "模块化架构设计，支持灵活扩展和定制化开发"
    },
    {
      icon: Award,
      title: "生产就绪",
      description: "经过严格测试，可直接用于生产环境"
    }
  ];

  const stats = [
    { value: "99.9%", label: "系统可用性", icon: TrendingUp, description: "保证服务稳定运行" },
    { value: "<100ms", label: "平均响应时间", icon: Clock, description: "极速响应体验" },
    { value: "10K+", label: "活跃用户", icon: Users, description: "服务全球用户" },
    { value: "4.9/5", label: "用户满意度", icon: Star, description: "获得用户认可" }
  ];

  const modules = [
    {
      title: "项目管理",
      description: "完整的项目生命周期管理，从创建到部署的全流程支持，助力团队高效协作",
      status: "已发布",
      statusColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
      features: ["项目仪表板", "进度追踪", "团队协作", "文件管理", "任务分配"],
      icon: Target
    },
    {
      title: "数据分析",
      description: "强大的数据分析能力，实时监控业务指标，智能报表生成，辅助决策分析",
      status: "beta",
      statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      features: ["实时监控", "自定义报表", "数据可视化", "趋势分析", "预警系统"],
      icon: BarChart3
    },
    {
      title: "内容管理",
      description: "灵活的内容管理系统，支持多种内容类型，快速发布更新，优化内容运营",
      status: "v2.0",
      statusColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      features: ["文章管理", "媒体库", "SEO 优化", "版本控制", "多语言支持"],
      icon: Sparkles
    }
  ];

  const techStack = [
    { name: "Next.js 16", icon: "⚡️", description: "React 全栈框架" },
    { name: "React 19", icon: "⚛️", description: "UI 库" },
    { name: "TypeScript", icon: "📘", description: "类型安全" },
    { name: "Tailwind CSS", icon: "🎨", description: "样式框架" },
    { name: "Shadcn UI", icon: "🧩", description: "组件库" },
    { name: "Lucide", icon: "✨", description: "图标库" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - 增强版 */}
      <section className="relative overflow-hidden border-b">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* 顶部标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">企业级解决方案</span>
              <Badge variant="secondary" className="ml-1">v2.0</Badge>
            </div>

            {/* 主标题 */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              现代化企业应用平台
            </h1>

            {/* 副标题 */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              基于最新技术栈构建，提供卓越的性能和开发体验，助力企业数字化转型
            </p>

            {/* CTA 按钮组 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-base h-12 px-8 shadow-lg" asChild>
                <Link href="/admin/dashboard">
                  <Rocket className="mr-2 h-5 w-5" />
                  立即开始
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base h-12 px-8" asChild>
                <Link href="/shadcn-demo">
                  <Code2 className="mr-2 h-5 w-5" />
                  查看组件
                </Link>
              </Button>
            </div>

            {/* 技术栈展示 */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <span className="text-lg">{tech.icon}</span>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{tech.name}</div>
                    <div className="text-xs text-muted-foreground">{tech.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 优势特点 - 新增 */}
      <section className="py-16 border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{advantage.title}</h3>
                        <p className="text-sm text-muted-foreground">{advantage.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 数据统计 - 增强版 */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 核心特性 - 增强版 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              <Target className="w-3 h-3 mr-1" />
              核心能力
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么选择我们</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              提供企业级应用所需的一切功能，助力业务快速增长
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 功能模块 - 增强版 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              <Puzzle className="w-3 h-3 mr-1" />
              功能模块
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">完整的业务解决方案</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              开箱即用的企业功能模块，满足各种业务场景需求
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge className={module.statusColor} variant="outline">
                        {module.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 学习路径 - 优化版 */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              <Code2 className="w-3 h-3 mr-1" />
              开发者资源
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">快速上手指南</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              系统化的学习资源，帮助你快速掌握现代 Web 开发技术
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "项目结构", href: "/structure", icon: Layout, desc: "了解项目组织方式" },
              { title: "路由系统", href: "/routing", icon: Globe, desc: "掌握 App Router" },
              { title: "数据获取", href: "/data-fetching", icon: Database, desc: "学习数据管理" },
              { title: "样式和 UI", href: "/styling", icon: Zap, desc: "使用 Tailwind CSS" },
              { title: "Shadcn 组件", href: "/shadcn-demo", icon: Sparkles, desc: "探索组件库" },
              { title: "API 路由", href: "/api-routes", icon: Code2, desc: "构建 API 接口" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={index} href={item.href}>
                  <Card className="hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full border-2 hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                      <div className="flex items-center text-sm font-medium text-primary">
                        开始学习
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - 增强版 */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <Card className="bg-transparent text-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                <Building2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                准备开始构建了吗？
              </h2>
              <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
                立即体验企业级应用平台，开启数字化转型之旅，让技术驱动业务增长
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-base h-12 px-8 shadow-lg"
                  asChild
                >
                  <Link href="/admin/dashboard">
                    <Rocket className="mr-2 h-5 w-5" />
                    进入控制台
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  asChild
                >
                  <Link href="/blog">
                    查看文档
                  </Link>
                </Button>
              </div>

              {/* 信任标识 */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-blue-50">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    企业级安全
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    极致性能
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    专业支持
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    生产就绪
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer - 优化版 */}
      <section className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold">Enterprise App</div>
                <div className="text-xs text-muted-foreground">企业级应用平台</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              基于 Next.js 16 + React 19 + TypeScript + Shadcn UI 构建
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground transition-colors">
                博客示例
              </Link>
              <span>•</span>
              <Link href="/admin/dashboard" className="hover:text-foreground transition-colors">
                管理后台
              </Link>
              <span>•</span>
              <Link href="/shadcn-demo" className="hover:text-foreground transition-colors">
                组件展示
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
