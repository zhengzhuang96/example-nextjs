import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { SignOutButton } from '@/components/signout-button'

export default async function DashboardPage() {
  const locale = await getLocale()
  const t = useTranslations('dashboard')
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect(`/${locale}/login`)
  }

  const user = session.user

  // Fetch user profile from database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User'

  return (
    <div className="container py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {t('welcomeBack')}{profile?.full_name ? `, ${profile.full_name}!` : '!'}
          </h1>
          <p className="text-muted-foreground">
            {t('loggedInAs')} <strong>{user.email}</strong>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('yourProfile')}</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">{t('name')}:</span>{' '}
                <span className="font-medium">{profile?.full_name || t('notSet')}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t('email')}:</span>{' '}
                <span className="font-medium">{user.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t('userId')}:</span>{' '}
                <span className="font-medium text-xs">{user.id}</span>
              </div>
              <div>
                <span className="text-muted-foreground">{t('memberSince')}:</span>{' '}
                <span className="font-medium">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString()
                    : new Date(user.created_at).toLocaleDateString()
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t('quickActions')}</h2>
            <div className="space-y-3">
              <a
                href={`/${locale}/chat`}
                className="block text-sm text-primary hover:underline"
              >
                {t('startAiChat')}
              </a>
              <a
                href={`/${locale}/settings`}
                className="block text-sm text-primary hover:underline"
              >
                {t('accountSettings')}
              </a>
              <a
                href={`/${locale}/profile`}
                className="block text-sm text-primary hover:underline"
              >
                {t('editProfile')}
              </a>
              <SignOutButton />
            </div>
          </div>
        </div>

        <div className="mt-8 border rounded-lg p-6 bg-muted/50">
          <h2 className="text-xl font-semibold mb-4">{t('profileData')}</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify({ auth: user, profile }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
