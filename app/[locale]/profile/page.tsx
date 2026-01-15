"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { createClient } from "@/lib/supabase/client"

export default function ProfilePage() {
  const t = useTranslations('profile')
  const tCommon = useTranslations('common')
  const [fullName, setFullName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
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

  // Load profile data
  useEffect(() => {
    if (!session) return

    async function loadProfile() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (error) throw error
        if (data) {
          setFullName(data.full_name || '')
          setAvatarUrl(data.avatar_url || '')
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        setMessage(t('updateError'))
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [session?.user.id, t])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id)

      if (error) throw error
      setMessage(t('updateSuccess'))
      setTimeout(() => setMessage(""), 3000)
    } catch (error: any) {
      console.error('Error updating profile:', error)
      setMessage(t('updateError'))
    } finally {
      setSaving(false)
    }
  }

  if (loading || authLoading) {
    return (
      <div className="container py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-muted-foreground">{tCommon('loading')}</p>
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
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>
              {t('subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              {message && (
                <div className={`text-sm p-3 rounded-md ${
                  message.includes('success') || message.includes(t('updateSuccess'))
                    ? 'bg-green-500/15 text-green-700 dark:text-green-400'
                    : 'bg-destructive/15 text-destructive'
                }`}>
                  {message}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t('email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  value={session.user.email || ''}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  {t('fullName')}
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={t('fullNamePlaceholder')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="avatarUrl" className="text-sm font-medium">
                  {t('avatarUrl')}
                </label>
                <Input
                  id="avatarUrl"
                  type="url"
                  placeholder={t('avatarUrlPlaceholder')}
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  disabled={saving}
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL for your profile picture
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? t('saving') : t('saveChanges')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={saving}
                >
                  {t('back')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
