# AI Product Template

A modern, production-ready AI product template built with Next.js 15, shadcn/ui, and Tailwind CSS.

## Features

- ⚡ **Next.js 15** - Latest React framework with App Router
- 🎨 **shadcn/ui** - Beautiful, accessible component library
- 🌙 **Dark Mode** - Full dark mode support with next-themes
- 📱 **Responsive Design** - Mobile-first design approach
- 🤖 **AI Chat Interface** - Pre-built chat UI component
- ⚙️ **TypeScript** - Full type safety
- 🎯 **Tailwind CSS** - Utility-first styling

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── demo/              # Demo page
│   ├── chat/              # Chat page
│   ├── pricing/           # Pricing page
│   ├── features/          # Features page
│   ├── about/             # About page
│   ├── login/             # Login page
│   └── signup/            # Signup page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   ├── footer.tsx        # Footer component
│   ├── theme-provider.tsx # Theme provider
│   ├── theme-toggle.tsx   # Dark mode toggle
│   └── chat-interface.tsx # Chat UI component
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
└── public/               # Static assets
```

## Customization

### Colors & Theme

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... other variables */
}
```

### Components

Add more shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

### AI Integration

To integrate with an AI backend:

1. Open `components/chat-interface.tsx`
2. Replace the mock response in `handleSend` with your API call
3. Add your API credentials to `.env.local`

Example:

```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: input }),
})
const data = await response.json()
```

## Pages

- **Home** (`/`) - Landing page with hero section and features
- **Demo** (`/demo`) - Interactive chat demo
- **Chat** (`/chat`) - Full-screen chat interface
- **Features** (`/features`) - Feature showcase
- **Pricing** (`/pricing`) - Pricing plans
- **About** (`/about`) - About page
- **Login** (`/login`) - Login page
- **Signup** (`/signup`) - Signup page

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## License

MIT License - feel free to use this template for your projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
