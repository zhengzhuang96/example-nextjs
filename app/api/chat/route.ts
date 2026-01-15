import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

// AI Provider Interfaces
interface AIProvider {
  stream(messages: Array<{ role: string; content: string }>): AsyncGenerator<string>
}

// OpenAI Provider
class OpenAIProvider implements AIProvider {
  private apiKey: string
  private model: string

  constructor(apiKey: string, model: string = 'gpt-4') {
    this.apiKey = apiKey
    this.model = model
  }

  async *stream(messages: Array<{ role: string; content: string }>): AsyncGenerator<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: true,
          temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
          max_tokens: parseInt(process.env.AI_MAX_TOKENS || '2048'),
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`OpenAI API error: ${response.status} - ${error}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || trimmed === 'data: [DONE]') continue
          if (trimmed.startsWith('data: ')) {
            try {
              const json = JSON.parse(trimmed.slice(6))
              const content = json.choices?.[0]?.delta?.content
              if (content) yield content
            } catch (e) {
              console.error('Error parsing SSE:', e)
            }
          }
        }
      }
    } catch (error) {
      console.error('OpenAI streaming error:', error)
      throw error
    }
  }
}

// Anthropic Claude Provider
class AnthropicProvider implements AIProvider {
  private apiKey: string
  private model: string

  constructor(apiKey: string, model: string = 'claude-3-sonnet-20240229') {
    this.apiKey = apiKey
    this.model = model
  }

  async *stream(messages: Array<{ role: string; content: string }>): AsyncGenerator<string> {
    try {
      // Convert messages format for Anthropic
      const systemMessage = messages.find(m => m.role === 'system')?.content || ''
      const chatMessages = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }))

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          messages: chatMessages,
          system: systemMessage,
          stream: true,
          max_tokens: parseInt(process.env.AI_MAX_TOKENS || '2048'),
          temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Anthropic API error: ${response.status} - ${error}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || !trimmed.startsWith('data: ')) continue

          try {
            const json = JSON.parse(trimmed.slice(6))
            if (json.type === 'content_block_delta') {
              const content = json.delta?.text
              if (content) yield content
            }
          } catch (e) {
            console.error('Error parsing SSE:', e)
          }
        }
      }
    } catch (error) {
      console.error('Anthropic streaming error:', error)
      throw error
    }
  }
}

// Google AI Provider
class GoogleAIProvider implements AIProvider {
  private apiKey: string
  private model: string

  constructor(apiKey: string, model: string = 'gemini-pro') {
    this.apiKey = apiKey
    this.model = model
  }

  async *stream(messages: Array<{ role: string; content: string }>): AsyncGenerator<string> {
    try {
      // Convert messages format for Google AI
      const contents = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:streamGenerateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
              maxOutputTokens: parseInt(process.env.AI_MAX_TOKENS || '2048'),
            },
          }),
        }
      )

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Google AI API error: ${response.status} - ${error}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed) continue

          try {
            const json = JSON.parse(trimmed)
            const content = json.candidates?.[0]?.content?.parts?.[0]?.text
            if (content) yield content
          } catch (e) {
            // Skip non-JSON lines
          }
        }
      }
    } catch (error) {
      console.error('Google AI streaming error:', error)
      throw error
    }
  }
}

// Factory function to create AI provider
function createAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER || 'openai'

  switch (provider) {
    case 'openai':
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) throw new Error('OPENAI_API_KEY not configured')
      return new OpenAIProvider(apiKey, process.env.AI_MODEL || 'gpt-4')

    case 'anthropic':
      const anthropicKey = process.env.ANTHROPIC_API_KEY
      if (!anthropicKey) throw new Error('ANTHROPIC_API_KEY not configured')
      return new AnthropicProvider(anthropicKey, process.env.AI_MODEL || 'claude-3-sonnet-20240229')

    case 'google':
      const googleKey = process.env.GOOGLE_AI_API_KEY
      if (!googleKey) throw new Error('GOOGLE_AI_API_KEY not configured')
      return new GoogleAIProvider(googleKey, process.env.AI_MODEL || 'gemini-pro')

    default:
      throw new Error(`Unsupported AI provider: ${provider}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const body = await request.json()
    const { message, conversationId } = body

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get or create conversation
    let convId = conversationId
    if (!convId) {
      // Create new conversation
      const { data: newConv } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: session.user.id,
          title: message.slice(0, 50) + (message.length > 50 ? '...' : '')
        })
        .select()
        .single()

      convId = newConv.id
    }

    // Save user message to database
    await supabase
      .from('chat_messages')
      .insert({
        conversation_id: convId,
        user_id: session.user.id,
        role: 'user',
        content: message
      })

    // Fetch conversation history for context
    const { data: history } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })
      .limit(50) // Last 50 messages for context

    // Prepare messages for AI
    const systemMessage = process.env.AI_SYSTEM_MESSAGE || 'You are a helpful AI assistant.'
    const aiMessages = [
      { role: 'system', content: systemMessage },
      ...(history || []).map(m => ({ role: m.role, content: m.content }))
    ]

    // Create AI provider
    const provider = createAIProvider()

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = ''

          for await (const chunk of provider.stream(aiMessages)) {
            fullResponse += chunk
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`))
          }

          // Save assistant response to database
          await supabase
            .from('chat_messages')
            .insert({
              conversation_id: convId,
              user_id: session.user.id,
              role: 'assistant',
              content: fullResponse
            })

          // Update conversation timestamp
          await supabase
            .from('chat_conversations')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', convId)

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Failed to generate response' })}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
