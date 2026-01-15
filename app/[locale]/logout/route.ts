import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const locale = requestUrl.pathname.split('/')[1] || 'en'

  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect(`/${locale}/login`)
}

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const locale = requestUrl.pathname.split('/')[1] || 'en'

  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect(`/${locale}/login`)
}
