import { Zap, Shield, BarChart3, Globe, Puzzle, Users } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Experience blazing-fast AI responses with our optimized infrastructure and edge computing.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with bank-level encryption, SOC 2 compliance, and GDPR readiness.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Gain deep insights with real-time dashboards, custom reports, and usage analytics.",
  },
  {
    icon: Globe,
    title: "Global Availability",
    description: "Deploy worldwide with our distributed network ensuring low latency everywhere.",
  },
  {
    icon: Puzzle,
    title: "Seamless Integrations",
    description: "Connect with your favorite tools through our comprehensive API and pre-built integrations.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together efficiently with shared workspaces, role-based access, and audit logs.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Powerful Features</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to build amazing AI-powered products
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
