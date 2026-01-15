"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Sparkles } from "lucide-react"

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  const buildLink = (path: string) => `/${locale}${path}`

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6" />
              <span className="font-bold text-xl">AI Product</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('tagline')}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('product')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={buildLink('/features')} className="text-muted-foreground hover:text-foreground transition-colors">{tNav('features')}</Link></li>
              <li><Link href={buildLink('/pricing')} className="text-muted-foreground hover:text-foreground transition-colors">{tNav('pricing')}</Link></li>
              <li><Link href={buildLink('/docs')} className="text-muted-foreground hover:text-foreground transition-colors">{tNav('docs')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={buildLink('/about')} className="text-muted-foreground hover:text-foreground transition-colors">{tNav('about')}</Link></li>
              <li><Link href={buildLink('/blog')} className="text-muted-foreground hover:text-foreground transition-colors">{tNav('blog')}</Link></li>
              <li><Link href={buildLink('/careers')} className="text-muted-foreground hover:text-foreground transition-colors">{tNav('careers')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href={buildLink('/privacy')} className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href={buildLink('/terms')} className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link href={buildLink('/contact')} className="text-muted-foreground hover:text-foreground transition-colors">{tNav('contact')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AI Product. {t('rights')}.</p>
        </div>
      </div>
    </footer>
  )
}
