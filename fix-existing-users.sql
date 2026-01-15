-- ============================================
-- 为现有用户创建缺失的 profile 和 settings
-- ============================================
-- 这个脚本会为所有已存在但没有 profile/settings 的用户创建记录

-- 1. 为所有没有 profile 的用户创建 profile
INSERT INTO public.profiles (id, full_name, avatar_url, email, created_at, updated_at)
SELECT
  id,
  raw_user_meta_data->>'full_name' as full_name,
  raw_user_meta_data->>'avatar_url' as avatar_url,
  email,
  created_at,
  now() as updated_at
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE profiles.id = auth.users.id
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  avatar_url = EXCLUDED.avatar_url,
  email = EXCLUDED.email,
  updated_at = now();

-- 2. 为所有没有 settings 的用户创建 settings
INSERT INTO public.user_settings (user_id, theme, language, email_notifications, updated_at)
SELECT
  id,
  'system' as theme,
  'en' as language,
  true as email_notifications,
  now() as updated_at
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_settings WHERE user_settings.user_id = auth.users.id
)
ON CONFLICT (user_id) DO UPDATE SET
  updated_at = now();

-- 3. 验证结果
SELECT
  u.id,
  u.email,
  u.created_at as user_created_at,
  p.full_name,
  p.email as profile_email,
  s.theme,
  s.language
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
LEFT JOIN public.user_settings s ON s.user_id = u.id
ORDER BY u.created_at DESC;

-- ============================================
-- 完成后你会看到所有用户的列表
-- ============================================
