# AI Bridge - Universal API Adapter

An intelligent platform that automatically generates bridges between different APIs using AI reasoning. Built with Next.js 14, Supabase, and GroqAI.

## 🚀 Features

- **AI-Powered Analysis**: Intelligent schema parsing and field mapping using GroqAI
- **Universal Adapter**: Connect any API format - OpenAPI, JSON, or custom schemas
- **Secure & Scalable**: Built with Supabase and Prisma for enterprise-grade reliability
- **Real-time Workflows**: Execute and test API bridges in real-time
- **Beautiful UI**: Modern interface with Framer Motion animations and TailwindCSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **UI Components**: shadcn/ui, Framer Motion
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **AI/ML**: GroqAI LLMs
- **Deployment**: Vercel + Supabase Cloud

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier)
- GroqAI API key

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd bridge-ai
npm install
```

### 2. Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp env.example .env.local
```

Update `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/bridge_ai"

# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed with sample data
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application uses three main models:

- **User**: Authentication and user management
- **ApiSchema**: Stored API schemas (OpenAPI/JSON)
- **Workflow**: AI-generated bridges between APIs

## 🔐 Authentication

- Email/password authentication via Supabase
- Protected routes with middleware
- Automatic redirects based on auth state

## 📱 Usage

1. **Sign Up/Login**: Create an account or sign in
2. **Upload Schemas**: Paste or upload two API schemas
3. **Generate Bridge**: AI analyzes and suggests field mappings
4. **Test Run**: Execute the workflow to verify the connection

## 🎯 Demo APIs

The app includes sample schemas for:
- **Weather API**: Current weather data (temperature, condition, timestamp)
- **Calendar API**: Event management (title, description, time)

## 🚀 Deployment

### Vercel (Frontend)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Supabase (Backend)

1. Create new project
2. Run database migrations
3. Update environment variables

## 🧪 Development

### Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── dashboard/      # Protected dashboard route
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout with AuthProvider
│   └── page.tsx        # Landing page
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard components
│   └── ui/            # shadcn/ui components
├── contexts/           # React contexts
├── lib/                # Utility functions
└── middleware.ts       # Auth middleware
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🔧 Configuration

### TailwindCSS

Customized with shadcn/ui components and design system.

### Prisma

PostgreSQL database with automatic migrations and type generation.

### Supabase

- Row Level Security (RLS) enabled
- Real-time subscriptions
- Edge functions ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For hackathon support or questions:
- Check the documentation
- Review the code comments
- Open an issue for bugs

## 🎉 Hackathon Ready!

This project is designed for rapid development and demonstration:
- ✅ Authentication system
- ✅ Database schema
- ✅ UI components
- ✅ Sample data
- ✅ Deployment ready

Just add your API keys and deploy!
