import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">AstroCalendar</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Cosmic Calendar
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Generate personalized calendars based on your astrological chart. Plan your days according to
                    celestial movements and cosmic energies.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/create">
                    <Button size="lg" className="gap-1.5">
                      Create Your Calendar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500 p-1">
                  <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
                    <div className="relative h-[300px] w-[300px]">
                      {/* Zodiac symbols positioned in a circle */}
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180
                        const x = 140 * Math.cos(angle) + 150
                        const y = 140 * Math.sin(angle) + 150
                        return (
                          <div
                            key={i}
                            className="absolute h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium"
                            style={{ left: `${x - 16}px`, top: `${y - 16}px` }}
                          >
                            {getZodiacSymbol(i)}
                          </div>
                        )
                      })}
                      {/* Center circle */}
                      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center text-xl font-bold">
                          AC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover how our astrological calendar can help you plan your life in harmony with the cosmos.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 pt-8">
              {features.map((feature) => (
                <div key={feature.title} className="relative overflow-hidden rounded-lg border bg-background p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">{feature.icon}</div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} AstroCalendar. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper function to get zodiac symbols
function getZodiacSymbol(index: number) {
  const symbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
  return symbols[index]
}

// Features data
const features = [
  {
    title: "Personalized Charts",
    description: "Generate accurate birth charts based on your exact time and location of birth.",
    icon: <div className="text-2xl">♈</div>,
  },
  {
    title: "Cosmic Calendar",
    description: "View your personalized calendar with important astrological events and transits.",
    icon: <div className="text-2xl">📅</div>,
  },
  {
    title: "Planetary Transits",
    description: "Track how planets moving through your chart affect different areas of your life.",
    icon: <div className="text-2xl">🪐</div>,
  },
  {
    title: "Favorable Days",
    description: "Identify the most auspicious days for important activities and decisions.",
    icon: <div className="text-2xl">✨</div>,
  },
  {
    title: "Retrograde Alerts",
    description: "Get notified about planetary retrogrades and how they might affect you.",
    icon: <div className="text-2xl">⚠️</div>,
  },
  {
    title: "Moon Phases",
    description: "Plan activities according to the lunar cycle and its influence on your chart.",
    icon: <div className="text-2xl">🌙</div>,
  },
]
