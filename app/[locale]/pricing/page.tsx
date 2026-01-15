import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

export default function PricingPage() {
  const t = useTranslations('pricing')
  const locale = useLocale()

  const plans = [
    {
      name: t('free.name'),
      price: locale === 'zh' ? '¥0' : '$0',
      description: t('free.desc'),
      features: [
        t('free.feature1'),
        t('free.feature2'),
        t('free.feature3'),
        t('free.feature4'),
      ],
      cta: t('free.cta'),
    },
    {
      name: t('pro.name'),
      price: locale === 'zh' ? '¥199' : '$29',
      description: t('pro.desc'),
      features: [
        t('pro.feature1'),
        t('pro.feature2'),
        t('pro.feature3'),
        t('pro.feature4'),
        t('pro.feature5'),
        t('pro.feature6'),
      ],
      cta: t('pro.cta'),
      popular: true,
    },
    {
      name: t('enterprise.name'),
      price: t('enterprise.price'),
      description: t('enterprise.desc'),
      features: [
        t('enterprise.feature1'),
        t('enterprise.feature2'),
        t('enterprise.feature3'),
        t('enterprise.feature4'),
        t('enterprise.feature5'),
        t('enterprise.feature6'),
      ],
      cta: t('enterprise.cta'),
    },
  ]

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? "border-primary shadow-lg scale-105" : ""}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== t('enterprise.price') && <span className="text-muted-foreground">{t('perMonth')}</span>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={`/${locale}/signup`}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
