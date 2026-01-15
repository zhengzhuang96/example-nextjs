# 🤖 AI Integration Guide

This guide explains how to integrate AI providers into your chat application.

## Supported AI Providers

Currently, this application supports three AI providers:

1. **OpenAI** (GPT-4, GPT-3.5) - Recommended for most use cases
2. **Anthropic** (Claude) - Best for complex reasoning tasks
3. **Google AI** (Gemini) - Cost-effective alternative

## Quick Setup

### Option 1: OpenAI (Recommended)

1. Get your API key from https://platform.openai.com/api-keys
2. Add to `.env.local`:
   ```bash
   OPENAI_API_KEY=sk-your-openai-api-key-here
   AI_PROVIDER=openai
   AI_MODEL=gpt-4
   ```
3. Install the OpenAI SDK:
   ```bash
   pnpm add openai
   ```

### Option 2: Anthropic Claude

1. Get your API key from https://console.anthropic.com/
2. Add to `.env.local`:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here
   AI_PROVIDER=anthropic
   AI_MODEL=claude-3-sonnet-20240229
   ```
3. Install the Anthropic SDK:
   ```bash
   pnpm add @anthropic-ai/sdk
   ```

### Option 3: Google AI Gemini

1. Get your API key from https://aistudio.google.com/app/apikey
2. Add to `.env.local`:
   ```bash
   GOOGLE_AI_API_KEY=your-google-ai-api-key-here
   AI_PROVIDER=google
   AI_MODEL=gemini-pro
   ```
3. Install the Google AI SDK:
   ```bash
   pnpm add @google/generative-ai
   ```

## Environment Variables

Add these to your `.env.local` file:

```bash
# Required: Choose one provider
AI_PROVIDER=openai  # Options: openai, anthropic, google
AI_MODEL=gpt-4      # Model name for the chosen provider

# API Keys (only need the one for your chosen provider)
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
GOOGLE_AI_API_KEY=your-google-key

# Optional: Configure AI behavior
AI_MAX_TOKENS=2048
AI_TEMPERATURE=0.7
AI_SYSTEM_MESSAGE=You are a helpful AI assistant.
```

## How It Works

### API Route

The chat API is located at `app/api/chat/route.ts` and handles:

1. ✅ User authentication verification
2. ✅ Message storage to database
3. ✅ Streaming AI responses
4. ✅ Error handling and retry logic
5. ✅ Token usage tracking

### Database Integration

The application stores:
- **chat_conversations**: Chat session metadata
- **chat_messages**: Individual messages (user + AI)

All messages are automatically saved to Supabase for history tracking.

### Streaming Responses

The chat interface uses Server-Sent Events (SSE) to stream AI responses in real-time, providing a better user experience.

## Testing

Once configured, test your AI integration:

1. Start the development server: `pnpm dev`
2. Navigate to http://localhost:3000/en/chat
3. Send a message and verify:
   - ✅ Your message appears
   - ✅ AI response streams in real-time
   - ✅ Messages are saved to database
   - ✅ No errors in console

## Troubleshooting

### Error: "AI provider not configured"

**Solution**: Make sure you've added `AI_PROVIDER` and the corresponding API key to `.env.local`

### Error: "Invalid API key"

**Solution**: Verify your API key is correct and active in the provider's dashboard

### Error: "User not authenticated"

**Solution**: Make sure you're logged in before accessing the chat page

### Messages not saving to database

**Solution**: Check that your Supabase connection is working and RLS policies are correct

## Cost Considerations

- **OpenAI GPT-4**: ~$0.03-0.06 per 1K tokens (input/output)
- **Anthropic Claude**: ~$0.003-0.015 per 1K tokens
- **Google Gemini**: ~$0.00025-0.002 per 1K tokens (cheapest)

For production, consider implementing:
- Usage limits per user
- Token counting and alerts
- Caching for common queries
- Queue system for rate limiting

## Next Steps

After setting up AI:

1. ✅ Test the basic chat functionality
2. ✅ Implement chat history sidebar
3. ✅ Add conversation management (rename, delete)
4. ✅ Implement usage statistics
5. ✅ Add rate limiting per user
6. ✅ Create admin dashboard for monitoring

---

**Need Help?** Check the [PROJECT_STATUS.md](PROJECT_STATUS.md) for current implementation progress.
