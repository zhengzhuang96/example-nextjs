"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Sparkles, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useAuth } from "@/components/auth-provider"
import { SignOutButton } from "@/components/signout-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const tCommon = useTranslations('common')
  const { user, session } = useAuth()

  const buildLink = (path: string) => `/${locale}${path}`

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={buildLink('/')} className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <span className="font-bold text-xl">AI Product</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href={buildLink('/features')} className="text-sm font-medium hover:text-primary transition-colors">
              {t('features')}
            </Link>
            <Link href={buildLink('/pricing')} className="text-sm font-medium hover:text-primary transition-colors">
              {t('pricing')}
            </Link>
            <Link href={buildLink('/blog')} className="text-sm font-medium hover:text-primary transition-colors">
              {t('blog')}
            </Link>
            <Link href={buildLink('/about')} className="text-sm font-medium hover:text-primary transition-colors">
              {t('about')}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          <ThemeToggle />

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={buildLink('/dashboard')} className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={buildLink('/profile')} className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={buildLink('/settings')} className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <div className="cursor-pointer w-full">
                    <SignOutButton />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link href={buildLink('/login')}>{tCommon('signIn')}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={buildLink('/signup')}>{tCommon('getStarted')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
