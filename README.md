# Astrological Calendar

A Next.js application for tracking astrological events and providing personalized horoscopes.

## Features

- User authentication with Supabase
- Astrological event tracking
- Personalized horoscopes
- Premium subscription features
- Email notifications for important astrological events

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/astro-calendar.git
cd astro-calendar
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

1. Push your code to a GitHub repository

2. Go to [Vercel](https://vercel.com) and create a new project

3. Connect your GitHub repository

4. Add the following environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Deploy!

## Project Structure

- `app/` - Next.js app directory
- `components/` - React components
- `lib/` - Utility functions and services
- `public/` - Static assets

## Technologies Used

- Next.js
- React
- TypeScript
- Supabase
- Tailwind CSS
- date-fns

## License

This project is licensed under the MIT License - see the LICENSE file for details. 