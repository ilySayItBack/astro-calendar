import { BirthChart, PlanetPosition, AstroEvent } from "@/lib/astro"

declare module "@/components/astro/birth-chart" {
  interface BirthChartProps {
    chart: BirthChart
    className?: string
  }
  
  export const BirthChart: React.FC<BirthChartProps>
}

declare module "@/components/astro/planet-position" {
  interface PlanetPositionProps {
    position: PlanetPosition
    className?: string
  }
  
  export const PlanetPosition: React.FC<PlanetPositionProps>
}

declare module "@/components/astro/astro-event" {
  interface AstroEventProps {
    event: AstroEvent
    className?: string
  }
  
  export const AstroEvent: React.FC<AstroEventProps>
}

declare module "@/lib/astro" {
  export interface BirthChart {
    sunSign: string
    moonSign: string
    ascendant: string
    planets: PlanetPosition[]
    houses: number[]
    aspects: string[]
  }
  
  export interface PlanetPosition {
    planet: string
    sign: string
    degree: number
    house: number
    isRetrograde: boolean
  }
  
  export interface AstroEvent {
    type: string
    date: Date
    description: string
    significance: string
  }
  
  export function calculateMoonPhase(date: Date): string
  export function calculatePlanetaryTransits(date: Date): PlanetPosition[]
  export function calculateFavorableDays(startDate: Date, endDate: Date): Date[]
  export function getAllAstroEvents(startDate: Date, endDate: Date): AstroEvent[]
} 