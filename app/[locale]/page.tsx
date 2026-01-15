import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { ArrowRight, Sparkles, Zap, Shield, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const t = useTranslations('home')
  const tCommon = useTranslations('common')
  const locale = useLocale()

  const buildLink = (path: string) => `/${locale}${path}`

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <Sparkles className="mr-2 h-4 w-4" />
            {t('badge')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            {t('title')}{" "}
            <span className="text-primary">{t('titleHighlight')}</span>
            {locale === 'zh' && <span>{t('titleEnd')}</span>}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={buildLink('/signup')}>
                {tCommon('getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={buildLink('/demo')}>{t('watchDemo')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 bg-muted/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('whyChoose')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('whyChooseDesc')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{t('feature1.title')}</CardTitle>
                <CardDescription>
                  {t('feature1.desc')}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{t('feature2.title')}</CardTitle>
                <CardDescription>
                  {t('feature2.desc')}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{t('feature3.title')}</CardTitle>
                <CardDescription>
                  {t('feature3.desc')}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">{t('readyToStart')}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('readyToStartDesc')}
          </p>
          <Button size="lg" asChild>
            <Link href={buildLink('/signup')}>
              {t('startFreeTrial')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
