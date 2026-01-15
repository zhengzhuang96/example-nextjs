/**
 * Database utility functions for user profiles
 */

import { createClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string | null
  created_at: string
  updated_at: string
}

export interface UserSettings {
  user_id: string
  theme: 'light' | 'dark' | 'system'
  language: 'en' | 'zh'
  email_notifications: boolean
  updated_at: string
}

/**
 * Get user profile (client-side)
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

/**
 * Get user profile (server-side)
 */
export async function getProfileServer(userId: string): Promise<Profile | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

/**
 * Update user profile
 */
export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, 'full_name' | 'avatar_url'>>
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  const { error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Get user settings
 */
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Settings don't exist, return defaults
      return {
        user_id: userId,
        theme: 'system',
        language: 'en',
        email_notifications: true,
        updated_at: new Date().toISOString()
      }
    }
    console.error('Error fetching settings:', error)
    return null
  }

  return data
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  updates: Partial<Omit<UserSettings, 'user_id' | 'updated_at'>>
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  const { error } = await supabase
    .from('user_settings')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating settings:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Create a new chat conversation
 */
export async function createConversation(title: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('chat_conversations')
    .insert({
      title,
      user_id: user.id
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating conversation:', error)
    throw error
  }

  return data
}

/**
 * Get user's conversations
 */
export async function getConversations() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('chat_conversations')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching conversations:', error)
    throw error
  }

  return data
}

/**
 * Add a message to a conversation
 */
export async function addMessage(
  conversationId: string,
  role: 'user' | 'assistant' | 'system',
  content: string
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      conversation_id: conversationId,
      user_id: user.id,
      role,
      content
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding message:', error)
    throw error
  }

  // Update conversation's updated_at timestamp
  await supabase
    .from('chat_conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', conversationId)

  return data
}

/**
 * Get messages for a conversation
 */
export async function getMessages(conversationId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching messages:', error)
    throw error
  }

  return data
}
