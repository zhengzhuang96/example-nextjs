import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-4">About Our AI Platform</h1>
          <p className="text-xl text-muted-foreground">
            We're on a mission to democratize AI and make it accessible to everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower businesses and individuals with cutting-edge AI tools that are easy to use, affordable, and scalable. We believe AI should be accessible to everyone, not just tech giants.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A world where AI augments human capabilities and helps people achieve more. We're building tools that make AI integration seamless and intuitive for any workflow.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              Founded in 2024, our platform was born from a simple observation: while AI technology was advancing rapidly, the tools to harness it remained complex and inaccessible to most businesses.
            </p>
            <p className="text-muted-foreground mb-4">
              Our team of AI researchers, engineers, and designers came together to bridge this gap. We've built a platform that combines state-of-the-art AI models with an intuitive interface, making powerful AI capabilities available to everyone.
            </p>
            <p className="text-muted-foreground">
              Today, we serve thousands of customers worldwide, from startups to Fortune 500 companies, all leveraging our platform to transform their businesses with AI.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
