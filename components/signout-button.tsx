"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useAuth } from "@/components/auth-provider"

export function SignOutButton() {
  const t = useTranslations('auth')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const locale = useLocale()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
      router.push(`/${locale}/login`)
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="block w-full text-left text-sm text-destructive hover:underline disabled:opacity-50"
    >
      {loading ? t('signingOut') : `→ ${t('signOut')}`}
    </button>
  )
}
