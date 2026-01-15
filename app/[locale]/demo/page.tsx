import { ChatInterface } from "@/components/chat-interface"

export default function DemoPage() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Try Our AI Chat</h1>
          <p className="text-xl text-muted-foreground">
            Experience the power of our AI assistant in this interactive demo
          </p>
        </div>
        <ChatInterface />
      </div>
    </div>
  )
}
