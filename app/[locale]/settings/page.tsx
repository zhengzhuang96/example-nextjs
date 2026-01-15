"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { createClient } from "@/lib/supabase/client"

export default function SettingsPage() {
  const t = useTranslations('settings')
  const tCommon = useTranslations('common')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [language, setLanguage] = useState<'en' | 'zh'>('en')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const locale = useLocale()
  const { session, loading: authLoading } = useAuth()

  // Redirect if not logged in
  useEffect(() => {
    if (!session && !authLoading) {
      router.push(`/${locale}/login`)
    }
  }, [session, authLoading, router, locale])

  // Load settings
  useEffect(() => {
    if (!session) return

    async function loadSettings() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (error) {
          // If settings don't exist, create defaults
          if (error.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from('user_settings')
              .insert({
                user_id: session.user.id,
                theme: 'system',
                language: locale,
                email_notifications: true
              })

            if (insertError) throw insertError
          } else {
            throw error
          }
        } else if (data) {
          setTheme(data.theme || 'system')
          setLanguage(data.language || 'en')
          setEmailNotifications(data.email_notifications ?? true)
        }
      } catch (error) {
        console.error('Error loading settings:', error)
        setMessage('Error loading settings')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [session?.user.id, locale])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('user_settings')
        .update({
          theme,
          language,
          email_notifications: emailNotifications,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id)

      if (error) throw error
      setMessage("Settings saved successfully!")

      // If language changed, redirect to new locale
      if (language !== locale) {
        setTimeout(() => {
          router.push(`/${language}/settings`)
        }, 1000)
      }
    } catch (error: any) {
      console.error('Error saving settings:', error)
      setMessage("Error saving settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading || authLoading) {
    return (
      <div className="container py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('appearance')}</CardTitle>
            <CardDescription>
              {t('appearanceDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {message && (
                <div className={`text-sm p-3 rounded-md ${
                  message.includes('success')
                    ? 'bg-green-500/15 text-green-700 dark:text-green-400'
                    : 'bg-destructive/15 text-destructive'
                }`}>
                  {message}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium">{t('theme')}</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['light', 'dark', 'system'] as const).map((themeOption) => (
                    <button
                      key={themeOption}
                      type="button"
                      onClick={() => setTheme(themeOption)}
                      className={`p-3 text-sm border rounded-lg capitalize transition-colors ${
                        theme === themeOption
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {themeOption}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">{t('language')}</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['en', 'zh'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      className={`p-3 text-sm border rounded-lg transition-colors ${
                        language === lang
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {lang === 'en' ? '🇺🇸 English' : '🇨🇳 中文'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{t('emailNotifications')}</label>
                  <button
                    type="button"
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailNotifications ? 'bg-primary' : 'bg-input'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('emailNotificationsDesc')}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" disabled={saving}>
                  {saving ? t('saving') : t('saveChanges')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={saving}
                >
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
