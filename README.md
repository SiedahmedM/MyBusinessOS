# MyBusinessOS - Enterprise Software at Freelancer Prices

A professional business automation consultancy website showcasing custom software solutions for Orange County businesses. Built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Hero Section** with real-time typing animations and particle effects
- **Tech Showcase** with interactive code display and syntax highlighting  
- **ROI Calculator** with three calculation modes (Time Savings, Revenue Growth, Cost Reduction)
- **AI Playground** with iPhone simulator and web app generator
- **Case Studies** featuring real Orange County business success stories
- **Contact Form** with Supabase integration and email notifications

### Technical Features
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth animations
- **Supabase** for database and real-time features
- **OpenAI API** integration for AI-powered features
- **Comprehensive testing** with Jest and React Testing Library
- **Progressive Web App** capabilities
- **SEO optimized** with proper meta tags and schema markup

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase
- **AI**: OpenAI GPT-4
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Configure your `.env.local` file:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL schema in `supabase-schema.sql`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🧪 Testing

```bash
npm test              # Run tests
npm run lint          # Check code quality
npm run type-check    # TypeScript validation
```

## 🚀 Deployment

Deploy to Vercel:
```bash
npx vercel
```

Set these environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## 📞 Support

- Email: hello@mybusinessos.com
- Phone: (714) 555-0123

---

Built for Orange County businesses by MyBusinessOS