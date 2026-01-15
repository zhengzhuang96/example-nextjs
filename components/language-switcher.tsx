"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"

const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
] as const

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const currentLocale = locales.find(l => l.code === locale)

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      // Remove current locale from pathname
      const pathnameWithoutLocale = pathname.replace(`/${locale}`, '').replace(/^\/$/, '')
      router.push(`/${newLocale}${pathnameWithoutLocale}`)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isPending}>
          <Languages className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{currentLocale?.flag} {currentLocale?.name}</span>
          <span className="sm:hidden">{currentLocale?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => switchLocale(loc.code)}
            disabled={isPending || loc.code === locale}
          >
            <span className="mr-2">{loc.flag}</span>
            {loc.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
