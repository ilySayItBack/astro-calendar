import { addDays, addHours, format, isSameDay, startOfDay } from "date-fns"

export interface BirthChart {
  name: string
  birthDate: Date
  birthTime: string
  birthPlace: string
  timezone: string
  sunSign: string
  moonSign: string
  ascendant: string
  planets: PlanetPosition[]
}

export interface PlanetPosition {
  planet: string
  sign: string
  degree: number
  house: number
  isRetrograde: boolean
}

export interface AstroEvent {
  date: Date
  type: "moon" | "planet" | "transit"
  name: string
  description: string
}

// Sample data for demonstration
export const sampleBirthChart: BirthChart = {
  name: "John Doe",
  birthDate: new Date("1990-04-15"),
  birthTime: "10:30",
  birthPlace: "New York, NY",
  timezone: "America/New_York",
  sunSign: "Aries",
  moonSign: "Taurus",
  ascendant: "Gemini",
  planets: [
    { planet: "Sun", sign: "Aries", degree: 25, house: 1, isRetrograde: false },
    { planet: "Moon", sign: "Taurus", degree: 15, house: 2, isRetrograde: false },
    { planet: "Mercury", sign: "Aries", degree: 15, house: 1, isRetrograde: false },
    { planet: "Venus", sign: "Taurus", degree: 8, house: 2, isRetrograde: false },
    { planet: "Mars", sign: "Capricorn", degree: 22, house: 10, isRetrograde: false },
    { planet: "Jupiter", sign: "Cancer", degree: 15, house: 4, isRetrograde: false },
    { planet: "Saturn", sign: "Capricorn", degree: 18, house: 10, isRetrograde: false },
    { planet: "Uranus", sign: "Capricorn", degree: 5, house: 9, isRetrograde: false },
    { planet: "Neptune", sign: "Capricorn", degree: 12, house: 9, isRetrograde: false },
    { planet: "Pluto", sign: "Scorpio", degree: 15, house: 8, isRetrograde: false },
  ],
}

export function calculateMoonPhases(year: number, month: number): AstroEvent[] {
  // This is a simplified calculation. In a real app, you would use astronomical calculations
  const events: AstroEvent[] = []
  const baseDate = new Date(year, month, 1)
  
  // New Moon (approximately every 29.5 days)
  const newMoon = new Date(year, month, 5)
  events.push({
    date: newMoon,
    type: "moon",
    name: "New Moon",
    description: "New beginnings, setting intentions",
  })

  // First Quarter (approximately 7.4 days after New Moon)
  const firstQuarter = addDays(newMoon, 7)
  events.push({
    date: firstQuarter,
    type: "moon",
    name: "First Quarter",
    description: "Time for action and decisions",
  })

  // Full Moon (approximately 14.8 days after New Moon)
  const fullMoon = addDays(newMoon, 15)
  events.push({
    date: fullMoon,
    type: "moon",
    name: "Full Moon",
    description: "Culmination, clarity, and release",
  })

  // Last Quarter (approximately 22.1 days after New Moon)
  const lastQuarter = addDays(newMoon, 22)
  events.push({
    date: lastQuarter,
    type: "moon",
    name: "Last Quarter",
    description: "Reflection and letting go",
  })

  return events
}

export function calculatePlanetaryTransits(birthChart: BirthChart, year: number, month: number): AstroEvent[] {
  // This is a simplified calculation. In a real app, you would use astronomical calculations
  const events: AstroEvent[] = []
  const baseDate = new Date(year, month, 1)

  // Sample transits for demonstration
  events.push({
    date: new Date(year, month, 8),
    type: "planet",
    name: "Mercury Retrograde Begins",
    description: "Communication challenges",
  })

  events.push({
    date: new Date(year, month, 15),
    type: "transit",
    name: "Venus trine Jupiter",
    description: "Favorable for love and finances",
  })

  events.push({
    date: new Date(year, month, 22),
    type: "transit",
    name: "Mars square Saturn",
    description: "Frustration and obstacles",
  })

  return events
}

export function calculateFavorableDays(birthChart: BirthChart, year: number, month: number): AstroEvent[] {
  // This is a simplified calculation. In a real app, you would use astronomical calculations
  const events: AstroEvent[] = []
  const baseDate = new Date(year, month, 1)

  // Sample favorable days for demonstration
  events.push({
    date: new Date(year, month, 3),
    type: "planet",
    name: "Venus enters Gemini",
    description: "Social connections flourish",
  })

  events.push({
    date: new Date(year, month, 17),
    type: "planet",
    name: "Sun enters Taurus",
    description: "Focus on stability and resources",
  })

  return events
}

export function getAllAstroEvents(birthChart: BirthChart, year: number, month: number): AstroEvent[] {
  return [
    ...calculateMoonPhases(year, month),
    ...calculatePlanetaryTransits(birthChart, year, month),
    ...calculateFavorableDays(birthChart, year, month),
  ].sort((a, b) => a.date.getTime() - b.date.getTime())
} 